package com.luv2code.springbootecommerce.repository;

import com.luv2code.springbootecommerce.model.entity.Customer;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends BaseRepository<Customer, Long> {

    Optional<Customer> findByEmail(String theEmail);


}
