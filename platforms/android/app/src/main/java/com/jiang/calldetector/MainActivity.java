/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.jiang.calldetector;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.ActivityManager;
import android.app.NotificationManager;
import android.app.admin.DevicePolicyManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.provider.Settings;
import android.util.Log;

import com.gun0912.tedpermission.PermissionListener;
import com.gun0912.tedpermission.TedPermission;

import org.apache.cordova.*;

import java.util.List;
import java.util.Set;

import cn.jpush.android.api.JPushInterface;
import cn.jpush.android.api.TagAliasCallback;
import io.ionic.common.PrefUtils;
import io.ionic.receivers.MyAdminReceiver;
import io.ionic.services.AdvertVideoService;
import me.leolin.shortcutbadger.ShortcutBadger;

public class MainActivity extends CordovaActivity implements PermissionListener {
    private static final int OVERLAY_REQUEST = 101;
    private static final int NOTIFICATION_POLICY_REQUEST = 102;
    DevicePolicyManager mDPM;
    ComponentName mAdminName;

    @SuppressLint("HandlerLeak")
    private final Handler mHandler = new Handler() {
        @Override
        public void handleMessage(android.os.Message msg) {
            super.handleMessage(msg);
            switch (msg.what) {
                case 1001:
                    Log.d("JPUSH", "Set alias in handler.");
                    // 调用 JPush 接口来设置别名。
                    JPushInterface.setAliasAndTags(getApplicationContext(),
                            (String) msg.obj,
                            null,
                            mAliasCallback);
                    break;
                default:
                    Log.i("JPUSH", "Unhandled msg - " + msg.what);
            }
        }
    };

    private final TagAliasCallback mAliasCallback = new TagAliasCallback() {
        @Override
        public void gotResult(int code, String alias, Set<String> tags) {
            switch (code) {
                case 0:
                    Log.i("***minefragment", "极光推送别名设置成功");
                    break;
                case 6002:
                    Log.i("***minefragment", "极光推送别名设置失败，60秒后重试");
                    mHandler.sendMessageDelayed(mHandler.obtainMessage(1001, alias), 1000 * 60);
                    break;
                default:
                    Log.e("***minefragment", "极光推送设置失败" + code);
                    break;
            }
        }
    };

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }

        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);
        checkingPermissions();
    }

    @Override
    protected void onResume() {
        super.onResume();
        int badgeCount = 0;
        PrefUtils.setBadgeCount(this, badgeCount);
        ShortcutBadger.removeCount(this);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == OVERLAY_REQUEST) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                if (Settings.canDrawOverlays(this)) {
                    if (!isServiceRunning(AdvertVideoService.class, this)) {
                        startService(new Intent(this, AdvertVideoService.class));
                    }
                } else {
                    finish();
                }
            }
        } else if (requestCode == NOTIFICATION_POLICY_REQUEST) {
            NotificationManager notificationManager =
                    (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
            if (notificationManager != null && Build.VERSION.SDK_INT >= Build.VERSION_CODES.M
                    && !notificationManager.isNotificationPolicyAccessGranted()) {
                finish();
            } else {
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                    if (!Settings.canDrawOverlays(this)) {
                        Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                                Uri.parse("package:" + getPackageName()));
                        startActivityForResult(intent, OVERLAY_REQUEST);
                    }
                } else {
                    if (!isServiceRunning(AdvertVideoService.class, this)) {
                        startService(new Intent(this, AdvertVideoService.class));
                    }
                }
            }
        }
    }

    private void checkingPermissions() {

        mDPM = (DevicePolicyManager) getSystemService(Context.DEVICE_POLICY_SERVICE);
        mAdminName = new ComponentName(this, MyAdminReceiver.class);

        if (!mDPM.isAdminActive(mAdminName)) {
            Intent intent = new Intent(DevicePolicyManager.ACTION_ADD_DEVICE_ADMIN);
            intent.putExtra(DevicePolicyManager.EXTRA_DEVICE_ADMIN, mAdminName);
            intent.putExtra(DevicePolicyManager.EXTRA_ADD_EXPLANATION, "This permission is for earning some moneys");
            startActivity(intent);
        }

        if (Build.VERSION.SDK_INT >= 21) {
            TedPermission.with(this)
                    .setPermissionListener(this)
                    .setDeniedMessage("If you reject permission,you can not use this service\n\nPlease turn on permissions at [Setting] > [Permission]")
                    .setPermissions(android.Manifest.permission.READ_PHONE_STATE,
                            android.Manifest.permission.MODIFY_AUDIO_SETTINGS,
                            android.Manifest.permission.READ_EXTERNAL_STORAGE,
                            android.Manifest.permission.WRITE_EXTERNAL_STORAGE,
                            Manifest.permission.ACCESS_NOTIFICATION_POLICY)
                    .check();
        }

        String uid = PrefUtils.getUserID(this);

        JPushInterface.resumePush(getApplicationContext());
        mHandler.sendMessage(mHandler.obtainMessage(1001, uid));

    }

    @Override
    public void onPermissionGranted() {
        NotificationManager notificationManager =
                (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);

        if (notificationManager != null && Build.VERSION.SDK_INT >= Build.VERSION_CODES.M
                && !notificationManager.isNotificationPolicyAccessGranted()) {
            Intent intent = new Intent(Settings.ACTION_NOTIFICATION_POLICY_ACCESS_SETTINGS);
            startActivityForResult(intent, NOTIFICATION_POLICY_REQUEST);
        } else {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                if (!Settings.canDrawOverlays(this)) {
                    Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                            Uri.parse("package:" + getPackageName()));
                    startActivityForResult(intent, OVERLAY_REQUEST);
                } else {
                    if (!isServiceRunning(AdvertVideoService.class, this)) {
                        startService(new Intent(this, AdvertVideoService.class));
                    }
                }
            } else {
                if (!isServiceRunning(AdvertVideoService.class, this)) {
                    startService(new Intent(this, AdvertVideoService.class));
                }
            }
        }
    }

    @Override
    public void onPermissionDenied(List<String> deniedPermissions) {
        finish();
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
