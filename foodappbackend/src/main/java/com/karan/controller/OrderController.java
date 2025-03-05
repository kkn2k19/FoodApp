package com.karan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.karan.model.Order;
import com.karan.service.OrderService;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "http://localhost:3000/")
public class OrderController {
    @Autowired
    private OrderService oService;

    // Add Order
    @PostMapping("/add")
    public ResponseEntity<String> addOrder(@RequestBody Order o) {
        String msg = "Order added";
        oService.addOrder(o);
        return new ResponseEntity<String>(msg, HttpStatus.OK);
    }

    // Get Billing / Orders (mixture)
    @SuppressWarnings("rawtypes")// it will supress warnings of List datatype not specified
    @GetMapping("/billing")
    public ResponseEntity<List> billing() {
        List bill = oService.billing();
        return new ResponseEntity<List>(bill, HttpStatus.OK);
    }
}
