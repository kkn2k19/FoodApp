package com.karan.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.karan.model.Restaurant;

public interface RestaurantRepo extends JpaRepository<Restaurant, Long> {

}
