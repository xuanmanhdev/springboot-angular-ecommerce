package com.luv2code.springbootecommerce.resource;

import com.luv2code.springbootecommerce.model.dto.BaseResponseDto;
import com.luv2code.springbootecommerce.model.entity.Customer;
import com.luv2code.springbootecommerce.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/customer")
public class CustomerResource extends BaseResource{

    private final CustomerService customerService;

    public CustomerResource(CustomerService customerService) {
        this.customerService = customerService;
    }

//    public ResponseEntity<BaseResponseDto> findCustomer(
//            @RequestParam(required = false, defaultValue = AppConstant.DEFAULT_PAGE_STR) Integer page,
//            @RequestParam(required = false, defaultValue = AppConstant.DEFAULT_PAGE_SIZE_STR) Integer size,
//            @RequestParam(required = false, name = "sort", defaultValue = AppConstant.DEFAULT_SORT_FIELD) List<String> sorts,
//            @RequestParam(required = false) Map<String, String> searchParams) {
//
//        return success(result, "OK");
//    }
//    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponseDto> showCustomerDetail(@PathVariable Long id) {
        Optional<Customer> customerOpt = customerService.findOneOpt(id);

        return success(customerOpt, "OK");
    }

}
