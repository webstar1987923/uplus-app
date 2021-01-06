import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from  '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ShopPayScreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-shop-pay-screen',
  templateUrl: 'shop-pay-screen.html',
})
export class ShopPayScreenPage {

  serverUrl = "http://unak.vip/uplus/Api/mobile";

  c_data: any;
  check_flag: any;
  pay_pass: any;
  amount: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
    ) {
    this.c_data = navParams.get('data');
    this.check_flag = false;
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    console.log(this.c_data);
    var tmp_check = localStorage.getItem('check_flag');
    if(tmp_check == '1') {
      this.check_flag = true;
      this.pay_pass = localStorage.getItem('pay_pass');
    } else {
      this.check_flag = false;
      this.pay_pass = "";
    }
  }

  checkedSavePwd() {
    this.check_flag = !this.check_flag;
  }

  pay() {
    console.log(this.amount);
    console.log(this.pay_pass);

    if (this.pay_pass.trim() == "") {
      this.alertCtrl.create({
        title: "警告",
        message: "请输入支付密码",
        buttons: ["确定"]
      }).present();
    } else if(this.amount > 0) {
      if(this.check_flag) {
        localStorage.setItem('check_flag', '1');
        localStorage.setItem('pay_pass', this.pay_pass);
      } else {
        localStorage.setItem('check_flag', '0');
        localStorage.setItem('pay_pass', '');
      }
  
      let postData = {
        uid: localStorage.getItem("uid"),
        to_user: this.c_data,
        amount: this.amount,
        pay_pass: this.pay_pass
      };
  
      let loading = this.loadingCtrl.create();
      loading.present();
  
      this.http.post(this.serverUrl + "/n_pay_shop.php", JSON.stringify(postData))
      .map(res => res.json())
      .subscribe(data => {
          loading.dismiss();
          if(data.error == '0') {
            this.alertCtrl.create({
              title: "警告",
              message: "支付成功",
              buttons: ["确定"]
            }).present();

            this.navCtrl.pop();
            
          } else if(data.error == '2') {
            localStorage.setItem('check_flag', '0');
            localStorage.setItem('pay_pass', '');
            this.pay_pass = "";
            this.alertCtrl.create({
              title: "警告",
              message: data.message,
              buttons: ["确定"]
            }).present();
          } else {
            this.alertCtrl.create({
              title: "警告",
              message: data.message,
              buttons: ["确定"]
            }).present();
          }
      }, err => {
        loading.dismiss();
      });
    } else {
      this.alertCtrl.create({
        title: "警告",
        message: "请输入0元以上金额",
        buttons: ["确定"]
      }).present();
    }
  }

}
