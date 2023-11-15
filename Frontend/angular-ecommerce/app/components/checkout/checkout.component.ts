import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';
import { State } from 'src/app/common/state';
import { Luv2ShopValidators } from 'src/app/validators/luv2-shop-validators';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Router } from '@angular/router';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { OrderStatus } from 'src/app/enum/OrderStatus.enum';
import { Customer } from 'src/app/common/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { Role } from 'src/app/enum/Role.enum';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;
  customerExist!: Customer;

  states: State[] = [];

  constructor(private formBuilder: FormBuilder,
              private luv2ShopFormService: Luv2ShopFormService,
              private cartService: CartService,
              private checkoutService: CheckoutService,
              private customerService: CustomerService,
              private router: Router) {
               }

  ngOnInit(): void {

    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',
                              [Validators.required,
                               Validators.minLength(2),
                               Luv2ShopValidators.notOnlyWhitespace]),

        lastName:  new FormControl('',
                              [Validators.required,
                               Validators.minLength(2),
                               Luv2ShopValidators.notOnlyWhitespace]),

        email: new FormControl('',
                              [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),

        phoneNumber:  new FormControl('',
                              [Validators.required,
                               Validators.minLength(2),
                               Luv2ShopValidators.notOnlyWhitespace])
      }),
      shippingAddress: this.formBuilder.group({
        addressInfo: new FormControl('', [Validators.required, Validators.minLength(2),
                                     Luv2ShopValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required])
      })
    });

    // populate states

    this.luv2ShopFormService.getStates().subscribe(
      data => {
        console.log("Retrieved states: " + JSON.stringify(data));
        this.states = data;
      }
    );
      const userExistId = Number(localStorage.getItem('userId'));

      if(userExistId){
        this.customerService.getCustomerById(userExistId).subscribe(data => {
          this.customerExist = data;
          this.populateFormWithData();
        }, error => console.log(error));
      }
  }

  private populateFormWithData() {
    this.checkoutFormGroup.get('customer')!.patchValue(
      this.customerExist
    );
  }

  reviewCartDetails() {

    // subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    // subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );

  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }
  get phoneNumber() { return this.checkoutFormGroup.get('customer.phoneNumber'); }

  get shippingAddressInfo() { return this.checkoutFormGroup.get('shippingAddress.addressInfo'); }
  get shippingAddressState() { return this.checkoutFormGroup.get('shippingAddress.state'); }

  onSubmit() {
    console.log("Handling the submit button");

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // set up order
    let order = new Order(this.totalQuantity, this.totalPrice, OrderStatus.WAITFORACCEPT);

    // get cart items
    const cartItems = this.cartService.cartItems;

    // create orderItems from cartItems

    // - short way of doing the same thingy
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem.imageUrl!, tempCartItem.unitPrice!, tempCartItem.quantity, tempCartItem.id!));

    // set up purchase
    let purchase = new Purchase();

    // populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;
    purchase.customer.id = Number(localStorage.getItem('userId'));

    if(!localStorage.getItem('userId')){
      purchase.customer.role = Role.USER;
    }

    // populate purchase - shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    purchase.shippingAddress.state = shippingState.name;

    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    // call REST API via the CheckoutService
    this.checkoutService.placeOrder(purchase).subscribe({
        next: response => {
          alert(`Your order has been received.\nOrder tracking number: ${response.orderTrackingNumber}`);

          // reset cart
          this.resetCart();

        },
        error: err => {
          alert(`There was an error: ${err.message}`);
        }
      }
    );

  }

  resetCart() {
    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    // reset the form
    this.checkoutFormGroup.reset();

    // navigate back to the products page
    this.router.navigateByUrl("/products");
  }
}
