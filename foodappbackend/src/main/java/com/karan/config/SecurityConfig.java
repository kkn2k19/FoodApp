package com.karan.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.karan.security.JwtAuthFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtAuthFilter jwtAuthFilter;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> {})
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()

                        // Restaurants
                        // .requestMatchers(HttpMethod.GET, "/api/restaurants/**").hasAnyRole("USER",
                        // "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/restaurants/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/restaurants/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/restaurants/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/restaurants/**").hasRole("ADMIN")

                        // Foods
                        // .requestMatchers(HttpMethod.GET, "/api/foods/**").hasAnyRole("USER", "ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/foods/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/foods/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/foods/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/foods/**").hasRole("ADMIN")

                        // Cart (User only)
                        .requestMatchers("/api/cart/**").hasRole("USER")

                        // Orders
                        .requestMatchers(HttpMethod.POST, "/api/orders/place").hasRole("USER") // place order
                        .requestMatchers(HttpMethod.GET, "/api/orders").hasAnyRole("USER", "ADMIN") // list orders
                        .requestMatchers(HttpMethod.GET, "/api/orders/*").hasAnyRole("USER", "ADMIN") // single order
                        .requestMatchers(HttpMethod.DELETE, "/api/orders/*").hasRole("USER") // cancel order
                        .requestMatchers(HttpMethod.PATCH, "/api/orders/*/status").hasRole("ADMIN") // update status

                        // others
                        .anyRequest().authenticated())
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // BCrypt with strength 12
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12);
    }
}