package com.karan.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Food {
    @Id
    @Column(length = 10)
    private String fid;
    @Column(length = 25, nullable = false)
    private String fname;
    private Double fprice;

    public Food() {
        super();
    }

    public Food(String fid, String fname, Double fprice) {
        super();
        this.fid = fid;
        this.fname = fname;
        this.fprice = fprice;
    }

    public String getFid() {
        return fid;
    }

    public void setFid(String fid) {
        this.fid = fid;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public Double getFprice() {
        return fprice;
    }

    public void setFprice(Double fprice) {
        this.fprice = fprice;
    }

    @Override
    public String toString() {
        return "Food [fid=" + fid + ", fname=" + fname + ", fprice=" + fprice + "]";
    }

}
