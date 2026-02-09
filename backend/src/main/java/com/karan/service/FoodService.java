package com.karan.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.karan.dto.FoodItemDto;
import com.karan.mapper.FoodMapper;
import com.karan.model.FoodItem;
import com.karan.model.Restaurant;
import com.karan.repository.FoodItemRepository;
import com.karan.repository.RestaurantRepo;

@Service
public class FoodService {
    @Autowired
    private FoodItemRepository frepo;

    @Autowired
    private RestaurantRepo rrepo;

    public String addFoodToRestaurant(Long restaurantId, FoodItem food) {
        Restaurant res = rrepo.findById(restaurantId).orElseThrow(() -> new RuntimeException("Restaurant not found"));
        food.setRestaurant(res);
        frepo.save(food);
        return "Food Added to Restaurant successfully";
    }

    public List<FoodItemDto> getFoods() {
        return frepo.findAll()
                .stream()
                .map(FoodMapper::toDto)
                .collect(Collectors.toList());
    }

    public List<FoodItemDto> getFoodsByRestaurant(Long restaurantId) {
        return frepo.findByRestaurantId(restaurantId)
                .stream()
                .map(FoodMapper::toDto)
                .collect(Collectors.toList());
    }

    public String updateFood(Long foodId, FoodItem updatedFood) {
        Optional<FoodItem> optional = frepo.findById(foodId);
        if (optional.isEmpty()) {
            throw new RuntimeException("Food not found");
        }
        FoodItem food = optional.get();
        food.setName(updatedFood.getName());
        food.setPrice(updatedFood.getPrice());
        food.setDescription(updatedFood.getDescription());
        food.setCategory(updatedFood.getCategory());
        frepo.save(food);
        return "Food updated";
    }

    public String deleteFood(Long foodId) {
        if (!frepo.existsById(foodId)) {
            throw new RuntimeException("Food not found");
        }
        frepo.deleteById(foodId);
        return "Food deleted successfully";
    }

    public Object getFoodById(Long id) {
        FoodItem food = frepo.findById(id).orElseThrow(() -> new RuntimeException("Food not found"));
        return FoodMapper.toDto(food);
    }
}
