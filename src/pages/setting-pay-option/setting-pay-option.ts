import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import "rxjs/add/operator/map";

/**
 * Generated class for the SettingPayOptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-setting-pay-option',
  templateUrl: 'setting-pay-option.html',
})
export class SettingPayOptionPage {

  serverURL = "http://unak.vip/uplus/Api/mobile";

  wechat: string = "";
  alipay: string = "";
  bank: string = "";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public http: Http
    ) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    let tmp = localStorage.getItem("infoData");
    let tmpData = JSON.parse(tmp);
    this.wechat = tmpData.weixin;
    this.alipay = tmpData.alipay;
    this.bank = tmpData.bank;
  }

  savePaymentAccount() {
    let postData = {
      uid: localStorage.getItem("uid"),
      token: localStorage.getItem("token"),
      wechat: this.wechat,
      alipay: this.alipay,
      bank: this.bank
    };

    let loading = this.loadingCtrl.create();
    loading.present();

    this.http.post(this.serverURL + "/change_pay_option.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
      loading.dismiss();
      if(data.error = 1) {
        let tmp = localStorage.getItem("infoData");
        let tmpData = JSON.parse(tmp);
        tmpData.wechat = this.wechat;
        tmpData.alipay = this.alipay;
        tmpData.bank = this.bank;
        localStorage.setItem('infoData', JSON.stringify(tmpData));
        this.alertCtrl.create({
          title: "通知",
          message: "保管成功",
          buttons: ["确定"]
        }).present();
      }
    }, err => {
      loading.dismiss();
    });
  }

}
