package com.karan.foodappbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.karan")
@EnableJpaRepositories(basePackages = "com.karan")
@EntityScan(basePackages = "com.karan")
public class FoodappBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FoodappBackendApplication.class, args);
	}

}
