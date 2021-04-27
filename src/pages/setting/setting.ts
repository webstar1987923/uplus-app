import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { SettingChangePasswordPage } from '../setting-change-password/setting-change-password';
import { SettingPayOptionPage } from '../setting-pay-option/setting-pay-option';
import { LoginPage } from '../login/login';
import { AboutAppPage } from '../about-app/about-app';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SaveUserNameProvider } from '../../providers/save-user-name/save-user-name';
import { SettingChangePayPasswordPage } from '../setting-change-pay-password/setting-change-pay-password';

/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  serverUrl: any = "http://unak.vip/uplus/Api/mobile";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public http: Http,
    public saveUserIDProvider: SaveUserNameProvider
    ) {
  }

  ionViewDidLoad() {
  }

  logout() {
    this.alertCtrl.create({
      title: "通知",
      message: "确定退出吗？",
      buttons: [
        {
          text: "是",
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
                this.navCtrl.setRoot(LoginPage);
                
                this.saveUserIDProvider.removeUID('remove').then(result => {
                  this.navCtrl.setRoot(LoginPage);
                })
                .catch(err => {
                });

              }
            });
                       
          }
        }, 
        {
          text: "不",
          handler: () => {
          }
        }
      ]
    }).present();
  }

  gotoChangePassword() {
    this.navCtrl.push(SettingChangePasswordPage);
  }

  gotoChangePayPassword() {
    this.navCtrl.push(SettingChangePayPasswordPage);
  }

  gotoChangePaymentMethod() {
    this.navCtrl.push(SettingPayOptionPage);
  }

  gotoAboutApp() 
  {
    this.navCtrl.push(AboutAppPage);
  }

}
