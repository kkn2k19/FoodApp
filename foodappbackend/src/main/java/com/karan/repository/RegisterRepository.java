package com.karan.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.karan.model.Register;

@Repository
public interface RegisterRepository extends JpaRepository<Register, String> {
    // our defined methods for login checkings
    @Query("from Register where uname=:uname and pass=:pass")
    public Register checkLogin(String uname, String pass);
}
