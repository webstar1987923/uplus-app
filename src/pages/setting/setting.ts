import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { SettingChangePasswordPage } from '../setting-change-password/setting-change-password';
import { SettingPayOptionPage } from '../setting-pay-option/setting-pay-option';
import { LoginPage } from '../login/login';
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

}
