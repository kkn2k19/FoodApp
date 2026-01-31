package com.karan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.karan.model.FoodItem;
import com.karan.model.Restaurant;
import com.karan.service.FoodService;
import com.karan.service.ImageUploadService;

import jakarta.mail.Multipart;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/foods")
public class FoodController {
    @Autowired
    private FoodService fService;

    @Autowired
    private ImageUploadService imageUploadService;

    // Get all foods -- users as well as admins
    @GetMapping
    public ResponseEntity<?> getAllFoods() {
        try {
            return ResponseEntity.ok().body(fService.getFoods());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Get foods by restaurant -- user as well as admins
    @GetMapping("/restaurant/{id}")
    public ResponseEntity<?> getFoodsByRestaurant(@PathVariable Long id) {
        try {
            return ResponseEntity.ok().body(fService.getFoodsByRestaurant(id));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // add foods only by -- admins
    @PostMapping(value = "/restaurant/{id}", consumes = "multipart/form-data")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addFoodToRestaurant(
            @PathVariable Long id,
            @RequestParam String name,
            @RequestParam Double price,
            @RequestParam String description,
            @RequestParam String category,
            @RequestParam MultipartFile image) {

        try {
            String imageUrl = imageUploadService.uploadImage(image);

            FoodItem food = new FoodItem();
            food.setName(name);
            food.setPrice(price);
            food.setDescription(description);
            food.setCategory(category);
            food.setImageUrl(imageUrl);

            return ResponseEntity.ok().body(fService.addFoodToRestaurant(id, food));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        // try {
        // return ResponseEntity.ok().body(fService.addFoodToRestaurant(id, food));
        // } catch (RuntimeException e) {
        // return ResponseEntity.badRequest().body(e.getMessage());
        // }

    }

    // update food -- admins only
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateFood(@PathVariable Long id, @RequestBody FoodItem food) {
        try {
            String msg = fService.updateFood(id, food);
            return ResponseEntity.ok().body(msg);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // delete food -- admins only
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteFood(@PathVariable Long id) {
        try {
            String msg = fService.deleteFood(id);
            return ResponseEntity.ok().body(msg);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
