package com.karan.service;

import java.util.List;

import org.springframework.security.core.Authentication;

import com.karan.dto.OrderDto;
import com.karan.model.Order;
import com.karan.model.User;

public interface OrderService {
    String placeOrder(User user);

    List<OrderDto> getOrderForUser(User user);

    OrderDto getOrderById(Long id, Authentication auth);

    String updateOrderStatus(Long id, String status);

    String cancelOrder(Long id, Authentication auth);

    List<OrderDto> getAllOrders();
}