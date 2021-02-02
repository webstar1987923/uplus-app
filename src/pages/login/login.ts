import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { AdsListPage } from '../ads-list/ads-list';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SaveUserNameProvider } from '../../providers/save-user-name/save-user-name';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  serverUrl: any = "http://unak.vip/uplus/Api/mobile";
  username: String = "";
  password: String = "";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public saveIDProvider: SaveUserNameProvider
    ) {
  }

  ionViewDidLoad() {
    navigator.geolocation.getCurrentPosition(pos => {
    });
  }

  ionViewWillEnter() {
    const loading = this.loadingCtrl.create();
    loading.present();
    var token = localStorage.getItem("token");
    if(token == undefined || token == "") {
      loading.dismiss();
    } else {
      let postData = {
        token: token,
        uid: localStorage.getItem('uid'),
        action: 'validate'
      };
      this.http.post(this.serverUrl + "/token_validate.php", JSON.stringify(postData))
      .map(res => res.json())
      .subscribe(data => {
        loading.dismiss();
        switch (data.error) {
          case 1:
            localStorage.setItem("uid", data.uid);
            localStorage.setItem("token", data.token);
            localStorage.setItem("province", data.province);
            localStorage.setItem("city", data.city);
            
            this.navCtrl.setRoot(HomePage);               
            this.navCtrl.push(AdsListPage);
            // this.saveIDProvider.saveUID({"userID": data.uid}).then( result => {
            //   this.navCtrl.setRoot(HomePage);
            // })
            // .catch( err => {
            // });
            break;
          case 2:
            this.alertCtrl.create({
              title: "警告",
              message: "Another user is using this account, but are you sure?",
              buttons:[{
                text: '确定',
                handler: () => {
                  localStorage.setItem("uid", "");
                  localStorage.setItem("token", "");                  
                  localStorage.setItem("infoData", "");
                }
              }]
            });           
            break;
          case 3:
            this.alertCtrl.create({
              title: "警告",
              message: "您的账号已禁止使用，请向客服咨询。",
              buttons:["确定"]
            });           
            break;
          default:
            break;
        }
      }, err => {
        loading.dismiss();
        this.alertCtrl.create({
          title: "警告",
          message: "网络失败!",
          buttons:["确定"]
        }).present();           
      });
    }
  }

  login() {
    if(this.username.trim() != "" && this.password.trim() != "") {
      var postParam = {
        'username': this.username,
        'password': this.password,
        'action': 'login'
      };
      const loading = this.loadingCtrl.create();
      loading.present();
      this.http.post(this.serverUrl + "/login.php", JSON.stringify(postParam))
      .map(res => res.json())
      .subscribe(data => {
        loading.dismiss();
        switch (data.error) {
          case 1:
            localStorage.setItem("uid", data.uid);
            localStorage.setItem("token", data.token);
            localStorage.setItem("province", data.province);
            localStorage.setItem("city", data.city);
            
            this.navCtrl.setRoot(HomePage);
            this.navCtrl.push(AdsListPage);
            // this.saveIDProvider.saveUID({"userID": data.uid}).then( result => {
            //   this.navCtrl.setRoot(HomePage);
            // })
            // .catch( err => {
            // });
            break;
          case 2:
            this.alertCtrl.create({
              title: "警告",
              message: "您的账号信息不准确。",
              buttons: ["确定"]
            }).present();
            break;
          case 3:
            this.alertCtrl.create({
              title: "警告",
              message: "Another user is using this account, but are you sure?",
              buttons: [
                {
                  text: '不同意',
                  handler: () => {
                  }
                },
                {
                  text: '同意',
                  handler: () => {
                    this.forceLogin();
                  }
                }
              ]
            }).present();
            break;
          default:
            break;
        }
      }, err => {
        loading.dismiss();
      });
    } else {
      this.alertCtrl.create({
        title: "警告",
        message: "请输入会员帐号和密码。",
        buttons: ["确定"]
      }).present();
    }
  }

  forceLogin() {
    let forceParam = {
      action: 'force',
      username: this.username,
      password: this.password
    };
    const loading = this.loadingCtrl.create();
    loading.present();
    this.http.post(this.serverUrl + "/login.php", JSON.stringify(forceParam))
    .map(res => res.json())
    .subscribe(data => {
      loading.dismiss();
      localStorage.setItem("uid", data.uid);
      localStorage.setItem("token", data.token);
      localStorage.setItem("province", data.province);
      localStorage.setItem("city", data.city);

      this.navCtrl.setRoot(HomePage);
      this.navCtrl.push(AdsListPage);
      // this.saveIDProvider.saveUID({"userID": data.uid}).then( result => {
      //   this.navCtrl.setRoot(HomePage);
      // })
      // .catch( err => {
      // });

    });
  }

  forgotPassword() {
    console.log("forgot password");
    this.navCtrl.push(ForgotPasswordPage);
  }

}
