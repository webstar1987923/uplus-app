package io.ionic.services;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.PixelFormat;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Build;
import android.os.IBinder;
import android.support.annotation.Nullable;
import android.telephony.TelephonyManager;
import android.util.Log;
import android.view.GestureDetector;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.VideoView;

import com.jiang.calldetector.R;
import com.liulishuo.filedownloader.BaseDownloadTask;
import com.liulishuo.filedownloader.FileDownloadListener;
import com.liulishuo.filedownloader.FileDownloader;

import java.io.File;
import java.util.Calendar;
import java.util.Random;

import io.ionic.common.Constant;
import io.ionic.common.Global;
import io.ionic.common.PrefUtils;
import io.ionic.models.Ads;
import io.ionic.network.ApiService;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import static android.media.AudioManager.RINGER_MODE_NORMAL;

/**
 * Created by Topdev on 11/15/17.
 *
 */

public class AdvertVideoService extends Service {

    private static boolean m_bOpenedVideo = false;
    private static boolean m_bApiCall = false;

    private AudioManager mAudio;
    private boolean isMute = false;

    WindowManager.LayoutParams mParams;
    int mDeltaX = 0, mDeltaY = 0;
    int mDownX = 0, mDownY = 0;
    int mPrevView_X = 0, mPrevView_Y = 0;

    BroadcastReceiver mReceiver = new PhoneStateReceiver();
    VideoView mVideoView;
    View mAdsView;
    WindowManager mWm;

    public enum State {
        STATE_RINGING,
        STATE_OFFHOOK,
        STATE_IDLE
    }

    public enum AdsStopState {
        ALL,
        STOP,
        NOSOUND
    }
    private GestureDetector gestureDetector;
    private View.OnTouchListener mVideoTouchListener = new View.OnTouchListener() {
        private static final int MAX_CLICK_DURATION = 200;
        private long startClickTime;

        @Override
        public boolean onTouch(View view, MotionEvent motionEvent) {
            switch (motionEvent.getAction()) {
                case MotionEvent.ACTION_DOWN:
                    startClickTime = Calendar.getInstance().getTimeInMillis();

                    mDownX = (int) motionEvent.getRawX();
                    mDownY = (int) motionEvent.getRawY();
                    mPrevView_X = mParams.x;
                    mPrevView_Y = mParams.y;
                    break;
                case MotionEvent.ACTION_UP:
                    long clickDuration = Calendar.getInstance().getTimeInMillis() - startClickTime;
                    if(clickDuration < MAX_CLICK_DURATION) {
                        isMute = !isMute;
                        if (isMute) {
                            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M){
                                mAudio.adjustStreamVolume(AudioManager.STREAM_MUSIC, AudioManager.ADJUST_MUTE, 0);
                            } else {
                                mAudio.setStreamMute(AudioManager.STREAM_MUSIC, true);
                            }

                            sendAdsState(AdsStopState.NOSOUND);
                        } else {
                            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M){
                                mAudio.adjustStreamVolume(AudioManager.STREAM_MUSIC, AudioManager.ADJUST_UNMUTE, 0);
                            } else {
                                mAudio.setStreamMute(AudioManager.STREAM_MUSIC, false);
                            }
                        }
                    }
                    break;
                case MotionEvent.ACTION_MOVE:
                    int nX = (int) motionEvent.getRawX();
                    int nY = (int) motionEvent.getRawY();
                    mDeltaX = nX - mDownX;
                    mDeltaY = nY - mDownY;
                    mParams.x = mPrevView_X + mDeltaX;
                    mParams.y = mPrevView_Y + mDeltaY;
                    if (mWm != null && mAdsView != null)
                        mWm.updateViewLayout( mAdsView, mParams);
                    break;
            }
            return gestureDetector.onTouchEvent(motionEvent);
        }
    };

    final class GestureListener extends GestureDetector.SimpleOnGestureListener {

        private static final int SWIPE_THRESHOLD = 300;
        private static final int SWIPE_VELOCITY_THRESHOLD = 100;

        @Override
        public boolean onDown(MotionEvent e) {
            return true;
        }

        @Override
        public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX, float velocityY) {
            boolean result = false;
            try {
                float diffY = e2.getY() - e1.getY();
                float diffX = e2.getX() - e1.getX();
                if (Math.abs(diffX) > Math.abs(diffY)) {
                    if (Math.abs(diffX) > SWIPE_THRESHOLD && Math.abs(velocityX) > SWIPE_VELOCITY_THRESHOLD) {
                        if (diffX > 0) {
                            onSwipeRight();
                        } else {
                            onSwipeLeft();
                        }
                        result = true;
                    }
                }
                else if (Math.abs(diffY) > SWIPE_THRESHOLD && Math.abs(velocityY) > SWIPE_VELOCITY_THRESHOLD) {
                    if (diffY > 0) {
                        onSwipeBottom();
                    } else {
                        onSwipeTop();
                    }
                    result = true;
                }
            } catch (Exception exception) {
                exception.printStackTrace();
            }
            return result;
        }
    }

    void onSwipeRight() {
        closeVideoWindow(this);
    }

    void onSwipeLeft() {
    }

    void onSwipeTop() {
    }

    void onSwipeBottom() {
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {

//        int smallIcon = R.mipmap.icon;
        int smallIcon = R.mipmap.ic_launcher;

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel("uplus", "uplus", importance);
            channel.setDescription("uplus notification");
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }

        Notification notification = null;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
            notification = new Notification.Builder(this)
                    .setSmallIcon(smallIcon)
                    .setAutoCancel(true)
                    .setWhen(0)
                    .setChannelId("uplus")
                    .setTicker("U+").build();
        } else {
            notification = new Notification.Builder(this)
                    .setSmallIcon(smallIcon)
                    .setAutoCancel(true)
                    .setWhen(0)
                    .setTicker("U+").build();
        }
        notification.flags = 16;

        startForeground(50, notification);

        IntentFilter filter = new IntentFilter();
        //filter.addAction("android.intent.action.PHONE_STATE");
        filter.addAction("com.jiang.calldetector.PHONE_STATE");
        Log.e("Exit Service >>>", "Start service");
        registerReceiver(mReceiver, filter);
        mAudio = (AudioManager) getBaseContext().getSystemService(Context.AUDIO_SERVICE);
        gestureDetector = new GestureDetector(getApplicationContext(), new GestureListener());
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.e("Exit Service >>>", "Stop service");
        stopForeground(true);
        unregisterReceiver(mReceiver);
        if(mAdsView != null)
        {
            if (mWm != null) {
                mWm.removeView(mAdsView);
            }
            mAdsView = null;
        }
    }

    private void closeVideoWindow(Context context) {
        if (mAdsView != null) {
            mAdsView.setVisibility(View.GONE);
            mWm.removeView(mAdsView);
            // mAudio.setRingerMode(AudioManager.RINGER_MODE_NORMAL);
            m_bOpenedVideo = false;
            mAdsView = null;
        }
        m_bApiCall = false;

        // download new ads
        if (PrefUtils.getAdsCount(context) == Global.SHOW_ADS_COUNT
                || !PrefUtils.isLoadAds(context)) {
            loadNewAds();
        }
    }

    public void pauseVideo() {
        if (mVideoView != null) {
            mVideoView.pause();
        }
    }

    public void playVideo() {
        if (mVideoView != null) {
            mVideoView.start();
        }
    }

    public void showDiaolg(final Context context) {

        if (m_bOpenedVideo) {
            sendAdsState(AdsStopState.STOP);
            closeVideoWindow(context);
        }

//        Toast.makeText(getApplicationContext(), "Ring Mode: " + mAudio.getRingerMode(), Toast.LENGTH_LONG).show();
//        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M){
//            mAudio.adjustStreamVolume(AudioManager.STREAM_MUSIC, AudioManager.ADJUST_UNMUTE, 0);
//        } else {
//            mAudio.setStreamMute(AudioManager.STREAM_MUSIC, false);
//        }
        isMute = false;

        // setting volume
//        int currentVolume = mAudio.getStreamVolume(AudioManager.STREAM_MUSIC);
//        int maxVolume = mAudio.getStreamMaxVolume(AudioManager.STREAM_MUSIC);
//        if (mAudio.getRingerMode() == RINGER_MODE_NORMAL && currentVolume < maxVolume / 2) {
//            float percent = 0.5f;
//            int seventyVolume = (int) (maxVolume * percent);
//            mAudio.setStreamVolume(AudioManager.STREAM_MUSIC, seventyVolume, AudioManager.FLAG_SHOW_UI);
//        }
        // end setting volume

        mWm = (WindowManager) context.getSystemService(WINDOW_SERVICE);
        mAdsView = LayoutInflater.from(context).inflate(R.layout.ads_layout, null, false);
        mVideoView = mAdsView.findViewById(R.id.ads_video_view);
        Button btnMore = mAdsView.findViewById(R.id.ads_more_btn);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            mParams = new WindowManager.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.WRAP_CONTENT,
                    WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY,
                    WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE
                            | WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL|WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED,
                    PixelFormat.TRANSLUCENT);
        } else {
            mParams = new WindowManager.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.WRAP_CONTENT,
                    WindowManager.LayoutParams.TYPE_SYSTEM_ERROR,
                    WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE
                            | WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL|WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED,
                    PixelFormat.TRANSLUCENT);
        }

        mParams.height = WindowManager.LayoutParams.WRAP_CONTENT;
        mParams.width = WindowManager.LayoutParams.MATCH_PARENT;
        mParams.format = PixelFormat.TRANSLUCENT;
        mParams.x = 0;
        mParams.y = 0;
        mWm.addView(mAdsView, mParams);
        System.out.println("Added Video View");
        if (PrefUtils.isLoadAds(context)) {
            mVideoView.setVideoPath(Global.ADS_PATH);
            PrefUtils.setAdsCount(context, PrefUtils.getAdsCount(context) + 1);
            final String url = PrefUtils.getAdsLink(context);
            if (!url.isEmpty()) {
                btnMore.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                        startActivity(browserIntent);
                    }
                });
            } else {
                btnMore.setVisibility(View.GONE);
            }
        } else {
            btnMore.setVisibility(View.GONE);

            int id = new Random().nextInt(5);
            if (id == 0) {
                id = 1;
            }
            mVideoView.setVideoURI(Uri.parse("android.resource://" + getPackageName() + "/"
                    + Global.getResourceId(context, "a" + id, "raw", getPackageName())));
        }

        mVideoView.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
            @Override
            public void onCompletion(MediaPlayer mediaPlayer) {
                sendAdsState(AdsStopState.ALL);
                closeVideoWindow(context);
            }
        });
        mVideoView.requestFocus();
        mVideoView.start();
        mAdsView.setOnTouchListener(mVideoTouchListener);
        m_bOpenedVideo = true;
    }

    private void loadNewAds() {

        PrefUtils.setLoadAds(getApplicationContext(), false);
        int adsID = getApplicationContext().getSharedPreferences("calldetector", Context.MODE_PRIVATE).getInt("ads_id", -1);
        Retrofit retrofit = new Retrofit.Builder().baseUrl(Constant.BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        ApiService apiService = retrofit.create(ApiService.class);
        Call<Ads> adsCall = apiService.getNewAds("get", "" + (adsID == -1 ? "" : adsID));
        adsCall.enqueue(new Callback<Ads>() {
            @Override
            public void onResponse(Call<Ads> call, Response<Ads> response) {
                if (response.isSuccessful()) {
                    Ads adsRes = response.body();

                    if (adsRes != null && adsRes.getAdsID() > 0) {
                        downloadNewAds(adsRes);
                        Log.e("ADS->Download:", adsRes.getAdsPath());
                    }
                }
            }

            @Override
            public void onFailure(Call<Ads> call, Throwable t) {
                Log.e("ADS->Dw Error:", t.getMessage());
            }
        });
    }

    private void sendAdsState(AdsStopState state) {

        if (m_bApiCall) return;

        String strAction = "all";
        switch (state) {
            case ALL:
                break;
            case STOP:
                strAction = "stop";
                break;
            case NOSOUND:
                strAction = "no_sound";
                break;
        }

        int adsID = getApplicationContext().getSharedPreferences("calldetector", Context.MODE_PRIVATE).getInt("ads_id", -1);
        String uID = PrefUtils.getUserID(getApplicationContext());

        Retrofit retrofit = new Retrofit.Builder().baseUrl(Constant.BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        ApiService apiService = retrofit.create(ApiService.class);

        Call<ResponseBody> adsCall = apiService.sendAdsState(strAction, adsID + "", uID);
        m_bApiCall = true;
        adsCall.enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {}

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {}
        });
    }

    private void downloadNewAds(final Ads newAds) {

        File currentFile = new File(Global.ADS_PATH);
        if (currentFile.exists()) currentFile.delete();

        FileDownloader.getImpl().create(Constant.BASE_URL + newAds.getAdsPath())
                .setPath(Global.ADS_PATH, false)
                .setListener(new FileDownloadListener() {
                    @Override
                    protected void pending(BaseDownloadTask task, int soFarBytes, int totalBytes) {}

                    @Override
                    protected void progress(BaseDownloadTask task, int soFarBytes, int totalBytes) {}

                    @Override
                    protected void completed(BaseDownloadTask task) {
                        PrefUtils.saveAds(getApplicationContext(), newAds);
                        Log.e("ADS->Complete:", Global.ADS_PATH);
                    }

                    @Override
                    protected void paused(BaseDownloadTask task, int soFarBytes, int totalBytes) {}

                    @Override
                    protected void error(BaseDownloadTask task, Throwable e) {
                        Log.e("ADS->error:", e.getMessage());
                    }

                    @Override
                    protected void warn(BaseDownloadTask task) {}
                }).start();
    }

    public class PhoneStateReceiver extends BroadcastReceiver {
        State prev_state;

        PhoneStateReceiver() {}

        public void onReceive(Context context, Intent intent) {
            try {
                String state = intent.getStringExtra(TelephonyManager.EXTRA_STATE);

                if (state.equals(TelephonyManager.EXTRA_STATE_RINGING)) {
                    //String incomingNumber = intent.getStringExtra(TelephonyManager.EXTRA_INCOMING_NUMBER);
                    //Toast.makeText(context,"Ringing State Number is -" + incomingNumber,Toast.LENGTH_SHORT).show();
                    //mAudio.setRingerMode(AudioManager.RINGER_MODE_SILENT);
//                    closeVideoWindow(context);
                    showDiaolg(context);
                    prev_state = State.STATE_RINGING;
                }
                if ((state.equals(TelephonyManager.EXTRA_STATE_OFFHOOK))) {
                    //Toast.makeText(context, "Received State", Toast.LENGTH_SHORT).show();
                    pauseVideo();
                    prev_state = State.STATE_OFFHOOK;
                }
                if (state.equals(TelephonyManager.EXTRA_STATE_IDLE)) {
                    //Toast.makeText(context, "Idle State", Toast.LENGTH_SHORT).show();
                    playVideo();
                    prev_state = State.STATE_IDLE;
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
