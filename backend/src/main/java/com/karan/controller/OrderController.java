package com.karan.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.karan.dto.OrderDto;
import com.karan.enums.UserRole;
import com.karan.model.Order;
import com.karan.model.User;
import com.karan.repository.UserRepo;
import com.karan.service.OrderService;

// @CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    @Autowired
    private OrderService orderService;
    @Autowired
    private UserRepo userRepo;

    // place order
    @PostMapping("/place")
    @PreAuthorize("hasRole('USER')")
    public String placeOrder(Principal principal) {
        User user = userRepo.findByEmail(principal.getName()).orElseThrow(() -> new RuntimeException("User not found"));
        return orderService.placeOrder(user);
    }

    // Get all orders for logged-in order -- USER or ADMIN --> all user orders
    @GetMapping
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public List<OrderDto> getUserOrders(Principal principal) {
        User user = userRepo.findByEmail(principal.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getRole() == UserRole.ADMIN) {
            return orderService.getAllOrders();
        }

        return orderService.getOrderForUser(user);
    }

    // Get single order by ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public OrderDto getOrderById(@PathVariable Long id, Authentication auth) {
        return orderService.getOrderById(id, auth);
    }

    // update order status (Admin only) → PATCH
    @PatchMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public String updateOrderStatus(@PathVariable Long id, @RequestParam String status) {
        return orderService.updateOrderStatus(id, status);
    }

    // cancel order (User only) → DELETE
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER')")
    public String cancelOrder(@PathVariable Long id, Authentication auth) {
        return orderService.cancelOrder(id, auth);
    }
}

/*
 * Principal --
 * Simple, directly gives you the username (in your case, email).
 * Works fine if you only need the identifier (email/username).
 * 
 * Authentication --
 * Authentication gives more details than Principal.
 * You can also get roles, authorities, credentials, etc.
 * 
 * @AuthenticationPrincipal --
 * Here, CustomUserDetails is your class implementing UserDetails.
 * Direct access to your User entity wrapper, no need to query userRepo again.
 * Cleanest approach if you are using a custom UserDetailsService.
 * 
 * Summary:
 * Principal → Quick and simple, only gives username/email.
 * Authentication → Richer info (username + roles + authorities).
 * 
 * @AuthenticationPrincipal → Best if you want the actual User object (avoids
 * extra DB lookup).
 */