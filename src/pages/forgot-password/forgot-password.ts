import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ForgotPasswordChangePage } from '../forgot-password-change/forgot-password-change';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  serverUrl: any = "http://unak.vip/uplus/Api/mobile";

  realname: any = "";
  mobile: any = "";

  constructor(public navCtrl: NavController, 
    public http: Http,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  valid() {
    if(this.realname == "" || this.mobile == "") {
      this.alertCtrl.create({
        title: "通知",
        message: "请输入会员姓名和密码。",
        buttons: ["确定"]
      }).present();
    } else {
      let postData = {
        realname: this.realname,
        mobile: this.mobile,
        action: 'valid_user'
      };
  
      let loading = this.loadingCtrl.create();
      loading.present();
  
      this.http.post(this.serverUrl + "/forgot_password.php", JSON.stringify(postData))
      .map(res => res.json())
      .subscribe(data => {
        loading.dismiss();
        if(data.error == 1) {
          this.navCtrl.push(ForgotPasswordChangePage, {uid: data.data});
        } else {
          this.alertCtrl.create({
            title: "警告",
            message: "您的账号信息不准确",
            buttons:["确定"]
          }).present();
        }
      }, err => {
        loading.dismiss();
        this.alertCtrl.create({
          title: "通知",
          message: "网路失败！",
          buttons:["确定"]
        }).present();
      });
    }
  }

}
