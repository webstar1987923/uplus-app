package io.ionic;

import android.app.Application;
import android.content.Context;
import android.content.SharedPreferences;

import com.liulishuo.filedownloader.FileDownloader;
import com.liulishuo.filedownloader.connection.FileDownloadUrlConnection;

import cn.jpush.android.api.JPushInterface;

public class UApplication extends Application {
    private SharedPreferences preferences;
    private static final String PREF_APP = "calldetector";

    @Override
    protected void attachBaseContext(Context base) {
        super.attachBaseContext(base);
    }

    @Override
    public void onCreate() {
        super.onCreate();

        FileDownloader.setupOnApplicationOnCreate(this)
                .connectionCreator(new FileDownloadUrlConnection
                        .Creator(new FileDownloadUrlConnection.Configuration()
                        .connectTimeout(15000) // set connection timeout.
                        .readTimeout(15000) // set read timeout.
                ))
                .commit();

        JPushInterface.setDebugMode(true);
        JPushInterface.init(this);
    }

    private static UApplication get(Context context) {
        return (UApplication) context.getApplicationContext();
    }

    public static UApplication create(Context context) {
        return UApplication.get(context);
    }

    public SharedPreferences getPreferences(Context ctx) {
        if (preferences == null) {
            preferences = ctx.getSharedPreferences(PREF_APP, Context.MODE_PRIVATE);
        }

        return preferences;
    }
}
