package com.karan.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.karan.model.Restaurant;
import com.karan.repository.RestaurantRepo;

@Service
public class RestaurantService {
    private final RestaurantRepo rrepo;

    public RestaurantService(RestaurantRepo rrepo) {
        this.rrepo = rrepo;
    }

    public String addRestaurant(Restaurant res) {
        rrepo.save(res);
        return "Restaurant added successfully";
    }

    public List<Restaurant> getRestaurants() {
        return rrepo.findAll();
    }

    public Restaurant getRestaurantById(Long id) {
        return rrepo.findById(id).orElseThrow(() -> new RuntimeException("Restaurant not found with id : " + id));
    }

    public String updateRestaurant(Long id, Restaurant updatedRes) {
        Optional<Restaurant> optional = rrepo.findById(id);
        if (optional.isEmpty()) {
            throw new RuntimeException("Restaurant not found");
        }
        Restaurant res = optional.get();
        res.setName(updatedRes.getName());
        res.setEmail(updatedRes.getEmail());
        res.setPhone(updatedRes.getPhone());
        res.setActive(updatedRes.isActive());
        res.setAddressLine1(updatedRes.getAddressLine1());
        res.setCity(updatedRes.getCity());
        res.setState(updatedRes.getState());
        res.setPincode(updatedRes.getPincode());
        rrepo.save(res);
        return "Restaurant details updated";
    }

    public String deleteRestaurant(Long id) {
        if (!rrepo.existsById(id)) {
            throw new RuntimeException("Restaurant not found");
        }
        rrepo.deleteById(id);
        return "Restaurant deleted successfully";
    }
}
