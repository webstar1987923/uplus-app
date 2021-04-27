import { Injectable } from '@angular/core';
import { Plugin, Cordova, CordovaProperty, CordovaInstance, IonicNativePlugin } from '@ionic-native/core';

@Plugin({
  pluginName: "SaveUserID",
  plugin: "cordova-plugin-saveuserid",
  pluginRef: "SaveUserID",
  repo: "https://github.com/webstar1987923/SaveUserID.git",
  platforms: ['Android', 'iOS']
})

@Injectable()
export class SaveUserNameProvider {

  @Cordova()
  saveUID(arg1: any): Promise<string> {
    return;
  }

  @Cordova()
  removeUID(arg1: any): Promise<string> {
    return;
  }

}
