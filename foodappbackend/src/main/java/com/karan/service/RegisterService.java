package com.karan.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.karan.model.Register;
import com.karan.repository.RegisterRepository;

@Service
public class RegisterService {
    @Autowired
    private RegisterRepository rrepo;

    // Add
    public void addData(Register r) {
        rrepo.save(r);
    }

    // GET
    public List<Register> getData() {
        return rrepo.findAll();
    }

    // CHECK LOGIN
    public Register checkLogin(String uname, String pass) {
        return rrepo.checkLogin(uname, pass);
    }
}
