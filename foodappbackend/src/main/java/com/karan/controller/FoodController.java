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

    // POST MAPPING
    @PostMapping("/add")
    public ResponseEntity<String> addFood(@RequestBody Food f) {
        String msg = "Food added Successfully";
        fService.addFood(f);
        return new ResponseEntity<String>(msg, HttpStatus.CREATED);
    }

    // GET MAPPING (for all)
    @GetMapping("/fetch")
    public ResponseEntity<List<Food>> getFood() {
        List<Food> flist = fService.getFood();
        return new ResponseEntity<List<Food>>(flist, HttpStatus.OK);
    }

    // GET MAPPING (for only one through fid)
    @GetMapping("/fetch/{fid}")
    public ResponseEntity<Food> getFoodByFid(@PathVariable String fid) {
        Food f = fService.getFoodByFID(fid);
        return new ResponseEntity<Food>(f, HttpStatus.OK);
    }

    // DELETE MAPPING
    @DeleteMapping("/delete/{fid}")
    public ResponseEntity<String> deleteFood(@PathVariable String fid) {
        fService.deleteFood(fid);
        String msg = "Food Deleted Successfully";
        return new ResponseEntity<String>(msg, HttpStatus.OK);
    }

    // PUT MAPPING
    @PutMapping("/update/{fid}")
    public ResponseEntity<String> updateFood(@PathVariable String fid, @RequestBody Food food) {
        Food f = fService.updateFood(fid, food);
        String msg = "";
        if (f != null) {
            msg = "Food Updated";
        } else {
            msg = "Food not Updated";
        }
        return new ResponseEntity<String>(msg, HttpStatus.OK);
    }
}
