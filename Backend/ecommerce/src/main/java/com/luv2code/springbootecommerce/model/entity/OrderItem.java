package com.luv2code.springbootecommerce.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
public class OrderItem extends BaseEntity{

    private String imageUrl;

    private BigDecimal unitPrice;

    private Integer quantity;

//    private Long productId;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
}
