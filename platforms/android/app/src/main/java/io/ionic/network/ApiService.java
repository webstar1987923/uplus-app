package io.ionic.network;

import io.ionic.models.Ads;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.POST;

/**
 * Created by Topdev on 2/20/18.
 *
 */

public interface ApiService {


    /*
     * TODO: ADS APIs
     */
    // TODO: getting new ads
    @FormUrlEncoded
    @POST("Api/current_ads_get.php")
    Call<Ads> getNewAds(@Field("action") String action,
                        @Field("aid") String adsID);

    // TODO: sending status of ads
    @FormUrlEncoded
    @POST("Api/ads_earn.php")
    Call<ResponseBody> sendAdsState(@Field("action") String action,
                                    @Field("aid") String adsID,
                                    @Field("uid") String uid);
}
