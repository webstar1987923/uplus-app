package io.ionic.models;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

/**
 * Created by Topdev on 2/20/18.
 *
 */

public class Ads implements Serializable {

    @SerializedName("thumb")
    String adsThumb;

    @SerializedName("video")
    String adsPath;

    @SerializedName("link")
    String adsLink;

    @SerializedName("aid")
    int adsID;

    public String getAdsThumb() {
        return adsThumb;
    }

    public void setAdsThumb(String adsThumb) {
        this.adsThumb = adsThumb;
    }

    public int getAdsID() { return adsID; }

    public void setAdsID(int adsID) {
        this.adsID = adsID;
    }

    public String getAdsPath() { return adsPath; }

    public void setAdsPath(String adsPath) {
        this.adsPath = adsPath;
    }

    public String getAdsLink() { return adsLink; }

    public void setAdsLink(String adsLink) {
        this.adsLink = adsLink;
    }
}
