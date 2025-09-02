package com.karan.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantDto {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private boolean active;
    private String addressLine1;
    private String city;
    private String state;
    private String pincode;
}
