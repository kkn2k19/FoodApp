package com.karan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FoodItemDto {
    private Long id;
    private String name;
    private Double price;
    private String description;
    private String category;
    private String restaurantName; // instead of full Restaurant entity
}
