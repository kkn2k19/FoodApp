package com.karan.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.karan.dto.CartItemDto;
import com.karan.model.CartItem;
import com.karan.model.FoodItem;
import com.karan.model.User;
import com.karan.repository.CartItemRepo;
import com.karan.repository.FoodItemRepository;
import com.karan.repository.UserRepo;

@Service
public class CartService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private FoodItemRepository foodRepo;

    @Autowired
    private CartItemRepo cartRepo;

    // add Food to cart
    public String addToCart(Long userId, Long foodItemId, int quantity) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        FoodItem food = foodRepo.findById(foodItemId).orElseThrow(() -> new RuntimeException("Food Item not found"));

        // check if this user already has this food in cart
        CartItem existing = cartRepo.findByUserAndFoodItem(user, food).orElse(null);

        if (existing != null) {
            existing.setQuantity(existing.getQuantity() + quantity); // update quantity
            cartRepo.save(existing);
            return "Quantity updated in cart";
        }

        CartItem cartItem = new CartItem();
        cartItem.setUser(user);
        cartItem.setFoodItem(food);
        cartItem.setQuantity(quantity);
        cartRepo.save(cartItem);

        return "Item added to cart";
    }

    // // view user cart
    // public List<CartItem> getCart(Long userId) {
    //     User user = userRepo.findById(userId).orElseThrow((() -> new RuntimeException("User not found")));
    //     return cartRepo.findByUser(user);
    //     // return cartRepo.findByUserId(user);
    // }

    // update quantity of a cart Item
    public String updateCartItem(Long cartItemId, int quantity) {
        CartItem item = cartRepo.findById(cartItemId).orElseThrow(() -> new RuntimeException("Cart item not found"));
        item.setQuantity(quantity);
        cartRepo.save(item);
        return "Cart item updated";
    }

    // remove an item
    public String removeCartItem(Long cartItemId) {
        if (!cartRepo.existsById(cartItemId)) {
            throw new RuntimeException("cart item not found");
        }
        cartRepo.deleteById(cartItemId);
        return "Item removed from cart";
    }

    // clear entire cart
    public String clearCart(Long UserId) {
        User user = userRepo.findById(UserId).orElseThrow(() -> new RuntimeException("User not found"));
        List<CartItem> items = cartRepo.findByUser(user);
        cartRepo.deleteAll(items);
        return "Cart cleared";
    }

    // view user cart 
    public List<CartItemDto> getCart(User user){
        return cartRepo.findByUser(user).stream()
        .map(cartItem -> {
            CartItemDto dto = new CartItemDto();
            dto.setId(cartItem.getId());
            dto.setFoodName(cartItem.getFoodItem().getName());
            dto.setRestaurantName(cartItem.getFoodItem().getRestaurant().getName());
            dto.setQuantity(cartItem.getQuantity());
            return dto;
        })
        .collect(Collectors.toList());
    }
}
