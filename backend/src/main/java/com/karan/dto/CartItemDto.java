package com.karan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDto {
    private Long id; // cartItemId
    private Long foodId; //
    private String foodName;
    private String restaurantName;
    private double price; //
    private int quantity;
}
