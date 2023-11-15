import {Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/common/customer';
import { Role } from 'src/app/enum/Role.enum';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit {

  id!: number | undefined;
  customer!: any;
  roles = Object.values(Role);
  customerForm!: FormGroup;
  formData!: Customer;
  isUpdate: boolean = false;

  constructor(private customerService: CustomerService,
            private route: ActivatedRoute,
            private router: Router,
            private formBuilder: FormBuilder
    ) {
     }

  ngOnInit(): void {
    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      role:['', Validators.required]
    });

    this.route.paramMap.subscribe(paramMap => {
      this.id = paramMap.get('id') ? Number(paramMap.get('id')) : undefined;
    });

    if(this.id){
      this.isUpdate = true;
       this.customerService.getCustomerById(this.id).subscribe(data => {
        this.customer = data;
        this.populateFormWithData();
    }, error => console.log(error));
    }
  }

  private populateFormWithData() {
    this.customerForm.patchValue(
        this.customer
    );
  }

    onSubmit() {


      if(this.customerForm.valid){
         this.formData = this.customerForm.value;

         if(this.id){
          this.formData.id = this.id;
         }

        console.log('Form data submitted:', this.formData);
      } else {
        this.customerForm.markAllAsTouched();
      }

          if(this.id){
            this.customerService.updateCustomer(this.id, this.formData).subscribe(
              (response) => {
                console.log('Customer updated successfully', response);
                // Handle success response from the API
              },
              (error) => {
                console.error('Error updated customer', error);
                // Handle error response from the API
              }
            );
          }else{
            this.customerService.createCustomer(this.formData).subscribe(
              (response) => {
                console.log('Customer created successfully', response);
                // Handle success response from the API
              },
              (error) => {
                console.error('Error creating customer', error);
                // Handle error response from the API
              }
            );
          }

        this.goToCustomerList();
      }


    goToCustomerList(){
      this.router.navigate(['/customer-list']);
    }
  }
