package io.ionic.models;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class User implements Serializable{

    @SerializedName("uid")
    String uid;

    @SerializedName("username")
    String username;

    @SerializedName("level")
    String level;

    @SerializedName("price")
    String price;

    @SerializedName("regtime")
    String regtime;

    @SerializedName("address")
    String address;

    @SerializedName("area")
    String area;

    public String getUid() { return uid; }
    public void setUid(String uid) { this.uid = uid; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getLevel() { return this.level; }
    public void setLevel(String level) { this.level = level; }

    public String getPrice() { return this.price; }
    public void setPrice(String price) { this.price = price; }

    public String getRegtime() { return this.regtime; }
    public void setRegtime(String regtime) { this.regtime = regtime; }

    public String getAddress() { return address; }

    public void setAddress(String address) { this.address = address; }

    public String getArea() { return area; }

    public void setArea(String area) { this.area = area; }
}
