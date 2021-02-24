package io.ionic.models;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.ArrayList;

public class ResultAds implements Serializable {

    @SerializedName("highlight")
    ArrayList<Ads> slideList;

    @SerializedName("all")
    ArrayList<Ads> allList;

    public ArrayList<Ads> getSlideList() {
        return slideList;
    }

    public ArrayList<Ads> getAllList() {
        return allList;
    }
}
