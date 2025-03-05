package com.karan.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.karan.model.Register;
import com.karan.service.RegisterService;

@RestController
@RequestMapping("/register")
@CrossOrigin(origins = "http://localhost:3000/")
public class RegisterController {
    @Autowired
    private RegisterService rService;

    // Add new user to the database (POST Method)
    @PostMapping("/add")
    public ResponseEntity<String> addRegister(@RequestBody Register r) {
        String msg = "Successfully Registered";
        rService.addData(r);
        return new ResponseEntity<String>(msg, HttpStatus.CREATED);
    }

    // Fetch all registered users from the database (GET Method)
    @GetMapping("/fetch")
    public ResponseEntity<List<Register>> getRegister() {
        List<Register> rlist = rService.getData();
        return new ResponseEntity<List<Register>>(rlist, HttpStatus.OK);
    }

    // Check user's login credentials (GET method)
    @GetMapping("/login/{uname}/{pass}")
    public ResponseEntity<String> checkLogin(@PathVariable String uname, @PathVariable String pass) {
        String msg = "";
        Register r = rService.checkLogin(uname, pass);
        if (r != null) {
            msg = "Login Successfull";
        } else {
            msg = "Invalid Credentials";
        }
        return new ResponseEntity<String>(msg, HttpStatus.OK);
    }
}
