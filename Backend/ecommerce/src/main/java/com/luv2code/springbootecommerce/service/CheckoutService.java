package com.luv2code.springbootecommerce.service;

import com.luv2code.springbootecommerce.model.dto.Purchase;
import com.luv2code.springbootecommerce.model.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
