package com.karan.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.karan.model.CartItem;
import com.karan.model.User;
import com.karan.model.FoodItem;

@Repository
public interface CartItemRepo extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser(User user); // it will give all items added in cart for this user / will fetch entire cart for this user

    Optional<CartItem> findByUserAndFoodItem(User user, FoodItem foodItem);   // to check whether this user already have this foodItem in the cart so can update the quantity or else it will get duplicated in the list.

    // List<CartItem> findByUserId(User user);
}
