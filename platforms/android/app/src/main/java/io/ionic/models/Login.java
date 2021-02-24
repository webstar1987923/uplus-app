package io.ionic.models;

import com.google.gson.annotations.SerializedName;

public class Login {

    @SerializedName("error")
    int error;

    @SerializedName("uid")
    String uid;

    public int getError() {
        return error;
    }

    public String getUid() {
        return uid;
    }
}
