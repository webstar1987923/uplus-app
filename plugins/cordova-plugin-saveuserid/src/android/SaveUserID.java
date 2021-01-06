package cordova.plugin.saveuserid;

import android.content.Context;
import android.content.SharedPreferences;
import android.preference.PreferenceManager;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * This class echoes a string called from JavaScript.
 */
public class SaveUserID extends CordovaPlugin {

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("saveUID")) {
            this.saveUID(args, callbackContext);
            return true;
        } else if (action.equals("removeUID")) {
            this.removeUID(args, callbackContext);
            return true;
        }
        return false;
    }

    private void saveUID(JSONArray args, CallbackContext callback) {
        if(args != null) {
            try {
                SharedPreferences pref = cordova.getActivity().getSharedPreferences("calldetector", Context.MODE_PRIVATE);
//                SharedPreferences pref = PreferenceManager.getDefaultSharedPreferences(cordova.getActivity());

                SharedPreferences.Editor editor = pref.edit();

                String userID = args.getJSONObject(0).getString("userID");

                editor.putString("uid", userID);

                editor.apply();

                callback.success("Saved Successfully");
            }catch (Exception ex) {
                callback.error("Something went wrong" + ex);
            }
        }
    }

    private void removeUID(JSONArray args, CallbackContext callback) {
        try {
            SharedPreferences pref = cordova.getActivity().getSharedPreferences("calldetector", Context.MODE_PRIVATE);
//            SharedPreferences pref = PreferenceManager.getDefaultSharedPreferences(cordova.getActivity());

            SharedPreferences.Editor editor = pref.edit();

            editor.remove("uid");

            editor.apply();

            callback.success("Remove Successfully");
        }catch (Exception ex) {
            callback.error("Something went wrong" + ex);
        }
    }
}
