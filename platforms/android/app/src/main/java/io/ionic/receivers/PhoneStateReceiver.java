package io.ionic.receivers;

import android.app.ActivityManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.telephony.TelephonyManager;

import io.ionic.services.AdvertVideoService;

public class PhoneStateReceiver extends BroadcastReceiver {

    public static Context mContext;

    @Override
    public void onReceive(Context context, Intent intent) {
        mContext = context;

        if (!isServiceRunning(AdvertVideoService.class, context)) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                mContext.startForegroundService(new Intent(context, AdvertVideoService.class));
            } else {
                mContext.startService(new Intent(context, AdvertVideoService.class));
            }
        }

        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        try {
            System.out.println("Receiver start");
            String state = intent.getStringExtra(TelephonyManager.EXTRA_STATE);

            Intent serviceIntent = new Intent();
            serviceIntent.setAction("com.jiang.calldetector.PHONE_STATE");
            serviceIntent.putExtra(TelephonyManager.EXTRA_STATE, state);

            mContext.sendBroadcast(serviceIntent);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private boolean isServiceRunning(Class<?> serviceClass, Context context) {
        ActivityManager manager = (ActivityManager) context.getSystemService(Context.ACTIVITY_SERVICE);
        for (ActivityManager.RunningServiceInfo service : manager.getRunningServices(Integer.MAX_VALUE)) {
            if (serviceClass.getName().equals(service.service.getClassName())) {
                //Log.i ("isServiceRunning?", true+"");
                return true;
            }
        }
        return false;
    }
}