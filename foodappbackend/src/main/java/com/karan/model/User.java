package com.karan.model;

import java.time.LocalDateTime;

import com.karan.enums.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "foodapp_users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private UserRole role; // ADMIN / USER

    @Column(length = 25, nullable = false)
    private String name;
    @Column(length = 30, nullable = false)
    private String email;
    @Column(length = 255, nullable = false)
    private String password;
    @Column(length = 10, nullable = false)
    private String phone;

    private boolean enabled = true; // default true for existing users; new registrations will set false
    // // this will state that user will not be able to login until they verify
    // email with otp
    // only verified users will be able be able to login to site

    // address ---
    @Column(nullable = false)
    private String addressLine1;

    private String addressLine2; // optional - user can fill or leave blank

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String state;

    @Column(nullable = false, length = 6)
    private String pincode; // used string instead of long so that '026435' can be stored as it is in DB not
                            // like '26435'

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
