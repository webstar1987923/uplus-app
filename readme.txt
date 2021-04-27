at first , install node 10.3 by using nvm
python 2.7

npm install
npm run build
ionic cordova run android

- What happended while executing?
Login failed :   It is because webview blocked api. I dont know exact reason.   In this case, remove plugin folder and reinstall plugin.

- ionic-alipay payment reference
https://blog.csdn.net/cnhome/article/details/90230963
https://www.jianshu.com/p/d4f103d28a1c

- keystore password :  fortune1987923 

- To sign the unsigned APK, run the jarsigner tool which is also included in the JDK:

$ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore uplus-app-key.keystore app-release-unsigned.apk uplus
This signs the apk in place. Finally, we need to run the zip align tool to optimize the APK. The zipalign tool can be found in /path/to/Android/sdk/build-tools/VERSION/zipalign. For example, on OS X with Android Studio installed, zipalign is in ~/Library/Android/sdk/build-tools/VERSION/zipalign:

$ zipalign -v 4 HelloWorld-release-unsigned.apk HelloWorld.apk