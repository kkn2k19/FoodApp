package com.karan.mapper;

import com.karan.dto.FoodItemDto;
import com.karan.model.FoodItem;

public class FoodMapper {

    public static FoodItemDto toDto(FoodItem food) {
        return new FoodItemDto(
                food.getId(),
                food.getName(),
                food.getPrice(),
                food.getDescription(),
                food.getCategory(),
                food.getRestaurant() != null ? food.getRestaurant().getName() : null);
    }
}
