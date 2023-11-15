package com.luv2code.springbootecommerce.model.dto;

import com.luv2code.springbootecommerce.model.entity.Customer;
import com.luv2code.springbootecommerce.model.entity.Order;
import com.luv2code.springbootecommerce.model.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Order order;
    private Set<OrderItem> orderItems;

}
