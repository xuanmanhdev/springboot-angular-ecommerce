package com.luv2code.springbootecommerce.service.impl;

import com.luv2code.springbootecommerce.model.entity.Customer;
import com.luv2code.springbootecommerce.repository.CustomerRepository;
import com.luv2code.springbootecommerce.service.CustomerService;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl extends BaseServiceImpl<Customer, Long, CustomerRepository> implements CustomerService {
}
