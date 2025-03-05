package com.karan.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.karan.model.Order;
import com.karan.repository.OrderRepository;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orepo;

    // Add ORDER
    public void addOrder(Order o) {
        orepo.save(o);
    }

    // Get ORDERS / Billings (mixture so no datatype)
    @SuppressWarnings("rawtypes") // it will supress warnings of List datatype not specified
    public List billing() {
        return orepo.billing();
    }
}
