import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public app: App,
    public alertCtrl: AlertController,
    public splashScreen: SplashScreen) {
    platform.ready().then(() => {
      
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.   

      statusBar.styleDefault();
      // statusBar.backgroundColorByHexString('#f44336');
      statusBar.backgroundColorByHexString('#f44336');

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
                  this.platform.exitApp();
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