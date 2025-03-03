package com.karan.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.karan.model.Food;
import com.karan.repository.FoodRepository;

@Service
public class FoodService {
    @Autowired
    private FoodRepository frepo;

    // Add Food
    public void addFood(Food f) {
        frepo.save(f);
    }

    // Get Food
    public List<Food> getFood() {
        return frepo.findAll();
    }

    // Get Food by fid
    public Food getFoodByFID(String fid) {
        return frepo.findById(fid).orElse(null);
    }

    // Delete Food
    public void deleteFood(String fid) {
        Food f = frepo.findById(fid).orElse(null);
        if (f != null) {
            frepo.delete(f);
        }
    }

    // Update Food
    public Food updateFood(String fid, Food food) {
        Food f = frepo.findById(fid).orElse(null);
        if (f != null) {
            f.setFname(food.getFname());
            f.setFprice(food.getFprice());
            frepo.save(f);
        }
        return f;
    }
}
