package com.luv2code.springbootecommerce.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomerDisplayDto {

    private Long customerId;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private String address;


}
