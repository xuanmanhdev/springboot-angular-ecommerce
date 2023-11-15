package com.luv2code.springbootecommerce.repository;

import com.luv2code.springbootecommerce.model.entity.ProductCategory;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductCategoryRepository extends BaseRepository<ProductCategory, Long> {
}
