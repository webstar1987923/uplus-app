package io.ionic.common;

import android.content.Context;
import io.ionic.models.Ads;

/**
 * Created by Topdev on 2/20/18.
 *
 */

public class PrefUtils {

    public static int getBadgeCount(Context ctx) {
        return ctx.getSharedPreferences("calldetector", Context.MODE_PRIVATE).getInt("notification_count", 0);
    }

    public static void setBadgeCount(Context ctx, int badgeCount) {
        ctx.getSharedPreferences("calldetector", Context.MODE_PRIVATE)
                .edit().putInt("notification_count", badgeCount).apply();
    }

    public static int getAdsCount(Context ctx) {

        return ctx.getSharedPreferences("calldetector", Context.MODE_PRIVATE).getInt("ads_count", 0);
    }

    public static void setAdsCount(Context ctx, int adsCount) {
        ctx.getSharedPreferences("calldetector", Context.MODE_PRIVATE)
                .edit().putInt("ads_count", adsCount).apply();
    }

    public static boolean isLoadAds(Context ctx) {
        return ctx.getSharedPreferences("calldetector", Context.MODE_PRIVATE).getBoolean("ready_ads", false);
    }

    public static void setLoadAds(Context ctx, boolean isLoad) {
        ctx.getSharedPreferences("calldetector", Context.MODE_PRIVATE)
                .edit().putBoolean("ready_ads", isLoad).apply();
    }

    public static String getAdsLink(Context ctx) {
        return ctx.getSharedPreferences("calldetector", Context.MODE_PRIVATE).getString("ads_link", "");
    }

    public static void saveAds(Context ctx, Ads newAds) {
        ctx.getSharedPreferences("calldetector", Context.MODE_PRIVATE).edit()
                .putInt("ads_id", newAds.getAdsID()).apply();
        ctx.getSharedPreferences("calldetector", Context.MODE_PRIVATE).edit()
                .putString("ads_link", newAds.getAdsLink()).apply();

        setAdsCount(ctx, 0);
        setLoadAds(ctx, true);
    }

    // TODO: save the id of current user
    public static void saveUserID(String uid, Context ctx) {
        ctx.getSharedPreferences("calldetector", Context.MODE_PRIVATE)
                .edit().putString("uid", uid).apply();
    }

    public static String getUserID(Context ctx) {
        return ctx.getSharedPreferences("calldetector", Context.MODE_PRIVATE).getString("uid", null);
    }

    public static void clearData(Context ctx) {
        ctx.getSharedPreferences("calldetector", Context.MODE_PRIVATE).edit().clear().apply();
    }

}
