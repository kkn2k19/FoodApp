package com.karan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.karan.model.CartItem;
import com.karan.model.User;
import com.karan.repository.UserRepo;
import com.karan.service.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @Autowired
    private UserRepo userRepo;

    // add item to cart (logged-in user only)
    // --not use userId in path since someone else can use and add items for other users
    @PostMapping("/add/{foodId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> addToCart(
            @PathVariable Long foodId,
            @RequestParam(defaultValue = "1") int quantity,
            Authentication authentication) {
        try {
            String email = authentication.getName();
            User loggedInUser = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
            String msg = cartService.addToCart(loggedInUser.getId(), foodId, quantity);
            return ResponseEntity.ok().body(msg);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // view cart
    // @GetMapping("/{userId}")
    // @PreAuthorize("hasRole('USER')")

    // public ResponseEntity<?> getCart(@PathVariable Long userId) {
    // try {
    // List<CartItem> cart = cartService.getCart(userId);
    // return ResponseEntity.ok().body(cart);
    // } catch (RuntimeException e) {
    // return ResponseEntity.badRequest().body(e.getMessage());
    // }
    // }

    // update cart item quantity
    @PutMapping("/update/{cartItemId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateCartItem(
        @PathVariable Long cartItemId, 
        @RequestParam int quantity) {
        try {
            String msg = cartService.updateCartItem(cartItemId, quantity);
            return ResponseEntity.ok().body(msg);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // remove a single item from cart 
    @DeleteMapping("/remove/{cartItemId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> removeCartItem(@PathVariable Long cartItemId) {
        try {
            String msg = cartService.removeCartItem(cartItemId);
            return ResponseEntity.ok().body(msg);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // clear the entire cart ((for logged-in user only))
    @DeleteMapping("/clear")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> clearCart(Authentication authentication) {
        try {
            String email = authentication.getName();
            User loggedInUser = userRepo.findByEmail(email).orElseThrow(()->new RuntimeException("User not found"));

            String msg = cartService.clearCart(loggedInUser.getId());
            return ResponseEntity.ok().body(msg);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // View cart (View logged-in user's cart)
    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> getCart(Authentication authentication) {
        String email = authentication.getName();
        User loggedInUser = userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

        List<CartItem> cart = cartService.getCart(loggedInUser.getId());

        if (cart.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Your cart is empty.");
        }

        return ResponseEntity.ok(cart);
    }

}



/*
 * 
 * 
 */