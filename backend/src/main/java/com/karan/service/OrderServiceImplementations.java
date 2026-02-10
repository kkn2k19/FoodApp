package com.karan.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.karan.dto.OrderDto;
import com.karan.dto.OrderItemDto;
import com.karan.model.CartItem;
import com.karan.model.Order;
import com.karan.model.OrderItem;
import com.karan.model.User;
import com.karan.repository.CartItemRepo;
import com.karan.repository.OrderItemRepo;
import com.karan.repository.OrderRepository;
import com.karan.repository.OrderRepository;

@Service
public class OrderServiceImplementations implements OrderService {
    @Autowired
    private CartItemRepo cartRepo;
    @Autowired
    private OrderRepository orderRepo;
    // @Autowired
    // private OrderItemRepo orderItemRepo;

    @Override
    public String placeOrder(User user) {
        List<CartItem> cartItems = cartRepo.findByUser(user);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty, cannot place order");
        }

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PENDING");
        // orderRepo.save(order);

        double totalAmount = 0.0;

        // Convert cart items -> order items
        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setFoodItem(cartItem.getFoodItem());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(cartItem.getFoodItem().getPrice() * cartItem.getQuantity());

            totalAmount += orderItem.getPrice();
            order.getItems().add(orderItem);
            // orderItemRepo.save(orderItem);
        }
        orderRepo.save(order);

        cartRepo.deleteAll(cartItems); // clear cart after placing order

        return "Order placed successfully with ID: " + order.getId();
    }

    @Override
    public List<OrderDto> getOrderForUser(User user) {
        // return orderRepo.findByUser(user).stream()
        // .map(order -> {
        // OrderDto dto = new OrderDto();
        // dto.setOrderId(order.getId());
        // dto.setOrderDate(order.getOrderDate());
        // dto.setStatus(order.getStatus());

        // // Map items
        // List<OrderItemDto> itemDtos = order.getItems().stream()
        // .map(item -> new OrderItemDto(
        // item.getFoodItem().getName(),
        // item.getQuantity(),
        // item.getPrice()))
        // .toList();

        // dto.setItems(itemDtos);

        // // calculating total amount
        // double total = itemDtos.stream()
        // .mapToDouble(OrderItemDto::getPrice)
        // .sum();
        // dto.setTotalAmount(total);

        // return dto;
        // })
        // .collect(Collectors.toList());
        return orderRepo.findByUserWithItems(user)
                .stream()
                .map(this::mapToDto)
                .toList();
    }

    private OrderDto mapToDto(Order order) {
        OrderDto dto = new OrderDto();
        dto.setOrderId(order.getId());
        dto.setOrderDate(order.getOrderDate());
        dto.setStatus(order.getStatus());

        List<OrderItemDto> items = order.getItems()
                .stream()
                .map(item -> new OrderItemDto(
                        item.getFoodItem().getName(),
                        item.getQuantity(),
                        item.getPrice()))
                .toList();

        dto.setItems(items);
        dto.setTotalAmount(
                items.stream().mapToDouble(OrderItemDto::getPrice).sum());

        return dto;
    }

    @Override
    public OrderDto getOrderById(Long id, Authentication auth) {
        Order order = orderRepo.findById(id).orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

        if (!auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))
                && !order.getUser().getEmail().equals(auth.getName())) {
            throw new RuntimeException("Access denied: Not your order.");
        }

        // convert entity -> DTO
        OrderDto dto = new OrderDto();
        dto.setOrderId(order.getId());
        dto.setOrderDate(order.getOrderDate());
        dto.setStatus(order.getStatus());

        List<OrderItemDto> itemDtos = order.getItems().stream()
                .map(item -> new OrderItemDto(
                        item.getFoodItem().getName(),
                        item.getQuantity(),
                        item.getPrice()))
                .toList();

        dto.setItems(itemDtos);
        dto.setTotalAmount(itemDtos.stream().mapToDouble(OrderItemDto::getPrice).sum());

        return dto;
    }

    @Override
    public String updateOrderStatus(Long id, String status) {
        Order order = orderRepo.findById(id).orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

        order.setStatus(status);
        orderRepo.save(order);

        return "Order status updated to: " + status;
    }

    @Override
    public String cancelOrder(Long id, Authentication auth) {
        Order order = orderRepo.findById(id).orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

        String loggedInEmail = auth.getName();
        if (!order.getUser().getEmail().equals(loggedInEmail)) {
            throw new RuntimeException("You cannot cancel someone else’s order!");
        }

        order.setStatus("CANCELLED");
        orderRepo.save(order);

        return "Order with ID " + id + " has been cancelled.";
    }

    @Override
    public List<OrderDto> getAllOrders() {
        // return orderRepo.findAll()
        // .stream()
        // .map(order -> {
        // OrderDto dto = new OrderDto();
        // dto.setOrderId(order.getId());
        // dto.setOrderDate(order.getOrderDate());
        // dto.setStatus(order.getStatus());

        // // Map items
        // List<OrderItemDto> itemDtos = order.getItems().stream()
        // .map(item -> new OrderItemDto(
        // item.getFoodItem().getName(),
        // item.getQuantity(),
        // item.getPrice()))
        // .toList();

        // dto.setItems(itemDtos);

        // // Calculate total amount dynamically
        // double total = itemDtos.stream()
        // .mapToDouble(OrderItemDto::getPrice)
        // .sum();
        // dto.setTotalAmount(total);

        // return dto;
        // })
        // .toList();

        return orderRepo.findAllWithItems()
                .stream().map(this::mapToDto)
                .toList();
    }

}
