package com.karan.foodappbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@SpringBootApplication(scanBasePackages = "com.karan")
@EnableJpaRepositories(basePackages = "com.karan")
@EntityScan(basePackages = "com.karan")
@EnableMethodSecurity
public class FoodappbackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FoodappbackendApplication.class, args);
	}

}
