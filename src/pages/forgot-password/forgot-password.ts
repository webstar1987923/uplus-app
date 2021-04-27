import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ForgotPasswordChangePage } from '../forgot-password-change/forgot-password-change';
import { LoginPage } from '../login/login';

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
  
  sms_btn_caption: any = "获取验证码";
  sms_timer_hasStarted : Boolean = false;
  sms_secondsRemaining : number = 25;

  mobile: any = "";
  sms: string = "";

  constructor(public navCtrl: NavController, 
    public http: Http,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }


  sendSMS() {
    if (this.sms_timer_hasStarted) 
      return;
    
    //call sms service
    var postParam = {        
      'mobile': this.mobile        
    };
      
    this.http.post(this.serverUrl + "/send_sms.php", JSON.stringify(postParam))
    .map(res => res.json())
    .subscribe(data => {
      
    }, err => {
      
    });

    this.sms_timer_hasStarted = true;    
    this.timerTick();
  }

  timerTick() {
    setTimeout(() => {        
        this.sms_secondsRemaining--;
        this.sms_btn_caption = this.sms_secondsRemaining;
        if (this.sms_secondsRemaining > 0) {
            this.timerTick();
        }
        else {
            this.sms_timer_hasStarted = false;
            this.sms_secondsRemaining = 25;
            this.sms_btn_caption = "获取验证码";
        }
    }, 1000);
  }

  valid() {

    if (this.sms_secondsRemaining == 25) {
      this.alertCtrl.create({
        title: "警告",
        message: "超过了短信代码的有效时间",
        buttons: ["确定"]
      }).present();
      return;
    }      
    
    if(this.mobile == "" || this.sms == "") {
      this.alertCtrl.create({
        title: "通知",
        message: "请输入手机号码和验证码。",
        buttons: ["确定"]
      }).present();
    } else {
      let postData = {        
        mobile: this.mobile,
        sms: this.sms,
        action: 'valid_user'
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
            message: "您的会员编号是"+data.data+"。",
            buttons: [
              {
                text: '忘记密码',
                handler: () => {
                  this.navCtrl.push(ForgotPasswordChangePage, {uid: data.data});
                }
              },
              {
                text: '确定',
                handler: () => {
                  this.navCtrl.push(LoginPage);
                }
              }
            ]
          }).present();
          
        } else if ( data.error == 2) {
          this.alertCtrl.create({
            title: "警告",
            message: "您输入的验证码不一致。" + data.data,
            buttons:["确定"]
          }).present();
        } else {
          this.alertCtrl.create({
            title: "警告",
            message: "您的手机号码不存在。",
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
