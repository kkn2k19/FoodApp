package com.karan.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.karan.dto.ChangePasswordRequest;
import com.karan.dto.EmailVerifyRequest;
import com.karan.dto.ForgotPassRequest;
import com.karan.dto.JWTResponse;
import com.karan.dto.LoginRequest;
import com.karan.dto.RegisterRequest;
import com.karan.dto.ResendOtpRequest;
import com.karan.dto.ResetPassRequest;
import com.karan.dto.UpdateProfileRequest;
import com.karan.dto.UserProfileDto;
import com.karan.enums.VerificationType;
import com.karan.model.User;
import com.karan.repository.UserRepo;
import com.karan.service.EmailService;
import com.karan.service.UserAuthService;

import lombok.RequiredArgsConstructor;

// @CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class UserController {

    private final EmailService emailService;
    private final UserAuthService userAuthService;
    private final UserRepo uRepo;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            String msg = userAuthService.register(request);
            return ResponseEntity.ok().body(msg);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            JWTResponse response = userAuthService.login(request);
            return ResponseEntity.ok().body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/verify-email")
    public ResponseEntity<?> verifyEmail(@RequestBody EmailVerifyRequest request) {
        try {
            String msg = userAuthService.verifyEmail(request);
            return ResponseEntity.ok().body(msg);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // @PostMapping("/verify-reset-otp")
    // public ResponseEntity<?> verifyResetOtp(@RequestBody EmailVerifyRequest
    // request) {
    // try {
    // String msg = userAuthService.verifyResetPass(request);
    // return ResponseEntity.ok().body(msg);
    // } catch (RuntimeException e) {
    // return ResponseEntity.badRequest().body(e.getMessage());
    // }
    // }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody ForgotPassRequest request) {
        try {
            String msg = userAuthService.forgotPassword(request);
            return ResponseEntity.ok().body(msg);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPassRequest request) {
        try {
            String msg = userAuthService.resetPassword(request);
            return ResponseEntity.ok().body(msg);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<?> resendOtp(@RequestBody ResendOtpRequest request) {
        try {
            String msg = "OTP resent successfully.";
            emailService.resendOtp(request.getEmail(), request.getType());
            return ResponseEntity.ok().body(msg);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // check email verified or not
    @PostMapping("/check-email-status")
    public ResponseEntity<?> checkEmailStatus(@RequestBody EmailVerifyRequest request) {
        try {
            String status = userAuthService.checkEmailStatus(request.getEmail());
            return ResponseEntity.ok().body(status);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // email present or not in db
    @PostMapping("/check-email-present")
    public ResponseEntity<?> checkEmailPresent(@RequestBody EmailVerifyRequest request) {
        try {
            boolean isPresent = userAuthService.isEmailPresent(request.getEmail());
            return ResponseEntity.ok().body(isPresent);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public UserProfileDto getMyProfile(Authentication auth) {
        User user = uRepo.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserProfileDto(
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole().name(),
                user.getCity(),
                user.getState(),
                user.getPincode());
    }

    @PutMapping("/update-profile")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<?> updateProfile(
            @RequestBody UpdateProfileRequest request,
            Authentication auth) {
        userAuthService.updateProfile(auth.getName(), request);
        return ResponseEntity.ok("Profile updated successfully");
    }

    @PostMapping("/change-password")
    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    public ResponseEntity<?> changePassword(
            @RequestBody ChangePasswordRequest request,
            Authentication auth) {
        userAuthService.changePassword(auth.getName(), request);
        return ResponseEntity.ok("Password changed successfully");
    }
}