package com.karan.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.karan.model.FoodItem;

@Repository
public interface FoodItemRepository extends JpaRepository<FoodItem, Long> {
    List<FoodItem> findByRestaurantId(Long restaurantId);

    // optional filters (like search by name/category)
    List<FoodItem> findByNameContainingIgnoreCase(String name);
}
