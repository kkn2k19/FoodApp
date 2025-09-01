package com.karan.dto;

import com.karan.enums.VerificationType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResendOtpRequest {
    private String email;
    private VerificationType type;
}
