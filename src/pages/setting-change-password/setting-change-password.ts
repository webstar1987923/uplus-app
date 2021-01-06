import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the SettingChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-setting-change-password',
  templateUrl: 'setting-change-password.html',
})
export class SettingChangePasswordPage {

  serverURL = "http://unak.vip/uplus/Api/mobile";

  old_pass: string = "";
  new_pass: string = "";
  new_conf_pass: string = "";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public http: Http
    ) {
  }

  ionViewDidLoad() {
  }

  changePassword() {
    if(this.new_conf_pass != this.new_pass || this.new_conf_pass == "" || this.new_pass == "") {
      this.alertCtrl.create({
        title: "警告",
        message: "密码不准确",
        buttons: ["确定"]
      }).present();
    } else {
      if(this.new_pass.length < 6) {
        this.alertCtrl.create({
          title: "警告",
          message: "最少输入6位数",
          buttons: ["确定"]
        }).present();
      } else {
        let postData = {
          old_pass: this.old_pass,
          new_pass: this.new_pass,
          uid: localStorage.getItem("uid"),
          token: localStorage.getItem("token")
        };

        let loading = this.loadingCtrl.create();
        loading.present();

        this.http.post(this.serverURL + "/change_password.php", JSON.stringify(postData))
        .map(res => res.json())
        .subscribe(data => {
          loading.dismiss();
          switch (data.error) {
            case 1:
              this.alertCtrl.create({
                title: "通知",
                message: "变更密码成功",
                buttons: ["确定"]
              }).present(); 
              this.navCtrl.pop();
              break;
            case 2:
              this.alertCtrl.create({
                title: "警告",
                message: "Your account was logged from another device",
                buttons: ["确定"]
              }).present();
              break;
            case 3:
              this.alertCtrl.create({
                title: "警告",
                message: "原密码不正确",
                buttons: ["确定"]
              }).present(); 
              break;
            default:
              break;
          }
        }, err => {
          loading.dismiss();
        });
      }
    }
  }

}
