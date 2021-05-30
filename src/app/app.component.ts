import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, AlertController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SaveUserNameProvider } from '../providers/save-user-name/save-user-name';
import { LoginPage } from '../pages/login/login';
import { MyChargePage } from '../pages/my-charge/my-charge';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  // rootPage: any = MyChargePage;
  
  showedFlag: boolean = false;
  serverUrl: any = "http://unak.vip/uplus/Api/mobile";

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public app: App,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public http: Http,
    public saveUserIDProvider: SaveUserNameProvider,
    public splashScreen: SplashScreen) {

    platform.ready().then(() => {
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.   

      statusBar.styleDefault();
      // statusBar.backgroundColorByHexString('#f44336');
      statusBar.backgroundColorByHexString('#488aff');

      splashScreen.hide();

      platform.registerBackButtonAction(() => {
          if(this.nav.length() >= 2) {
            this.nav.pop();
          }

          if(this.nav.length() == 1) {
            if(this.showedFlag == false) {
              this.confirmExitApp();
            }
          }
        }, 0);
      });
  }

  confirmExitApp() {
    this.showedFlag = true;
    let confirmAlert = this.alertCtrl.create({
        title: "通知",
        message: "您确定退出吗？",
        buttons: [
            {
                text: '是',
                handler: () => {

                  const loading = this.loadingCtrl.create();
                  loading.present();
      
                  let postData = {
                    token: localStorage.getItem("token"),
                    uid: localStorage.getItem('uid'),
                    action: 'logout'
                  };
                  this.http.post(this.serverUrl + "/logout.php", JSON.stringify(postData))
                  .map(res => res.json())
                  .subscribe(data => {
                    loading.dismiss();
                    if (data.error == '0') {
                      localStorage.setItem("uid", "");
                      localStorage.setItem("token", "");
                      localStorage.setItem("infoData", "");
                      //this.navCtrl.setRoot(LoginPage);
                      
                      this.saveUserIDProvider.removeUID('remove').then(result => {
                        //this.navCtrl.setRoot(LoginPage);
                      })
                      .catch(err => {
                      });
      
                      this.platform.exitApp();
                    }
                  });

                }
              },
              {
                text: '否',
                role: 'cancel',
                handler: () => {
                  this.showedFlag = false;
                }
            }
        ]
    });
    confirmAlert.present().then(() => {
      // this.showedFlag = true;
    });
  }
}