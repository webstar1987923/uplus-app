package io.ionic.common;

import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.media.MediaMetadataRetriever;
import android.net.Uri;

import com.liulishuo.filedownloader.util.FileDownloadUtils;

import java.io.File;

/**
 * Created by Topdev on 11/18/17.
 *
 */

public class Global {

    public static Intent serviceIntent = null;
    public static final int SHOW_ADS_COUNT = 1;
    public static final String ADS_FILE_NAME = "ads.mp4";

    public static final String ADS_PATH = FileDownloadUtils.getDefaultSaveRootPath()
            + File.separator + "ads" + File.separator + ADS_FILE_NAME;


    public static int getResourceId(Context ctx, String pVariableName, String pResourcename, String pPackageName)
    {
        try {
            return ctx.getResources().getIdentifier(pVariableName, pResourcename, pPackageName);
        } catch (Exception e) {
            return 0;
        }
    }

    public static Bitmap retriveVideoFrameFromVideo(Context context, String videoPath)
            throws Throwable {
        Bitmap bitmap = null;
        MediaMetadataRetriever mediaMetadataRetriever = null;
        try {
            mediaMetadataRetriever = new MediaMetadataRetriever();
            mediaMetadataRetriever.setDataSource(context, Uri.parse(videoPath));

            bitmap = mediaMetadataRetriever.getFrameAtTime(1, MediaMetadataRetriever.OPTION_CLOSEST);
        } catch (Exception e) {
            e.printStackTrace();
            throw new Throwable(
                    "Exception in retriveVideoFrameFromVideo(String videoPath)"
                            + e.getMessage());

        } finally {
            if (mediaMetadataRetriever != null) {
                mediaMetadataRetriever.release();
            }
        }
        return bitmap;
    }

}
