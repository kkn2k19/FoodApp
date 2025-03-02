package com.karan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.karan.model.Food;
import com.karan.service.FoodService;

@RestController
@RequestMapping("/food")
public class FoodController {
    @Autowired
    private FoodService fService;

    @PostMapping("/add")
    public ResponseEntity<String> addData(@RequestBody Food f) {
        String msg = "Food Added Successfully";
        fService.addFood(f);
        return new ResponseEntity<String>(msg, HttpStatus.CREATED);
    }

    @GetMapping("/fetch")
    public ResponseEntity<List<Food>> getData() {
        List<Food> foodList = fService.getFood();
        return new ResponseEntity<List<Food>>(foodList, HttpStatus.OK);
    }

    @GetMapping("/fetch/{fid}")
    public ResponseEntity<Food> getDataById(@PathVariable String fid) {
        Food f = fService.getFoodByFID(fid);
        return new ResponseEntity<Food>(f, HttpStatus.OK);
    }

    @PutMapping("/update/{fid}")
    public ResponseEntity<String> updateData(@PathVariable String fid, @RequestBody Food food) {
        Food f = fService.updateFood(fid, food);
        String msg = "";
        if (f != null) {
            msg = "Food Updated Successfully";
        } else {
            msg = "Food not found/Updated";
        }
        return new ResponseEntity<String>(msg, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{fid}")
    public ResponseEntity<String> deleteData(@PathVariable String fid) {
        fService.deleteFood(fid);
        String msg = "Food Deleted Successfully";
        return new ResponseEntity<String>(msg, HttpStatus.OK);
    }
}
