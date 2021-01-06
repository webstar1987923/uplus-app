import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';

/**
 * Generated class for the ForgotPasswordChangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-forgot-password-change',
  templateUrl: 'forgot-password-change.html',
})
export class ForgotPasswordChangePage {
  serverUrl: any = "http://unak.vip/uplus/Api/mobile";

  username: any = "";
  password: any = "";
  conf_password: any = "";

  constructor(public navCtrl: NavController, 
    public http: Http,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordChangePage');
  }

  ionViewWillEnter() {
    this.username = this.navParams.get('uid');
    if(this.username == null || this.username == "") {
      this.navCtrl.pop();
    }
  }

  changePassword() {
    if(this.password.length < 6) {
      this.alertCtrl.create({
        title: "警告",
        message: "最少输入6位数",
        buttons: ["确定"]
      }).present();
    } else {
      if(this.password != this.conf_password) {
        this.alertCtrl.create({
          title: "警告",
          message: "密码不准确",
          buttons: ["确定"]
        }).present();
      } else {
        let postData = {
          action: 'change_password',
          username: this.username,
          password: this.password
        };

        let loading = this.loadingCtrl.create();
        loading.present();

        this.http.post(this.serverUrl + "/forgot_password.php", JSON.stringify(postData))
        .map(res => res.json())
        .subscribe(data => {
          loading.dismiss();
          if(data.error == 1) {
            this.alertCtrl.create({
              title: "通知",
              message: "变更密码成功",
              buttons: ["确定"]
            }).present(); 
          } else {
            this.alertCtrl.create({
              title: "通知",
              message: "变更失败！",
              buttons: ["确定"]
            }).present(); 
          }
          this.navCtrl.setRoot(LoginPage);
        }, err => {
          loading.dismiss();
          this.alertCtrl.create({
            title: "通知",
            message: "网路失败！",
            buttons: ["确定"]
          }).present(); 

          this.navCtrl.pop();
        });
      }
    }
  }

}
