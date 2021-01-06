import { Component } from '@angular/core';
import { NavController, NavParams, App, LoadingController, AlertController } from 'ionic-angular';

import { MyWalletOutpuPage } from '../my-wallet-outpu/my-wallet-outpu';

import { Http, JSONPBackend } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the MyWalletPricePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-my-wallet-price',
  templateUrl: 'my-wallet-price.html',
})
export class MyWalletPricePage {

  serverUrl: any = "http://unak.vip/uplus/Api/mobile";
  historyData: any = [];
  price: any = "";
  n_price: any = "";
  out_price: any = "";
  savedData: any = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public app: App,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
  }

  getSavedData() {
    let tmp_price = localStorage.getItem("priceData");
    if(tmp_price == undefined || tmp_price == "") {
      return false;
    } else {
      this.savedData = true;
      let priceData = JSON.parse(tmp_price);
      this.historyData = priceData.historyData;
      this.price = priceData.other;
      this.n_price = priceData.n_price;
      this.out_price = priceData.out_price;
      let tmp = localStorage.getItem("infoData");
      let userData = JSON.parse(tmp);
      userData.price = this.price;
      userData.n_price = this.n_price;
      localStorage.setItem("infoData", JSON.stringify(userData));

      return true;
    }
  }

  ionViewWillEnter() {
    this.savedData = this.getSavedData();

    let uid = localStorage.getItem("uid");
    let token = localStorage.getItem("token");
    let postData = {
      action: 'price_history',
      uid: uid,
      token: token
    };

    let loading = this.loadingCtrl.create();
    if(!this.savedData) {
      loading.present();
    }

    this.http.post(this.serverUrl + "/get_n_pay_history.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
      if(!this.savedData) {
        loading.dismiss();
      }
      switch (data.error) {
        case 1:
          localStorage.setItem("priceData", JSON.stringify(data));
          this.historyData = data.historyData;
          this.price = data.other;
          this.n_price = data.n_price;
          this.out_price = data.out_price;
          let tmp = localStorage.getItem("infoData");
          let userData = JSON.parse(tmp);
          userData.price = this.price;
          localStorage.setItem("infoData", JSON.stringify(userData));
          break;
        case 2:
          this.alertCtrl.create({
            title: '警告',
            message: 'Another User logged',
            buttons: ["确定"]
          }).present();
          break;
      
        default:
          break;
      }
    }, err => {
      if(!this.savedData) {
        loading.dismiss();
      }
    });
  }

  gotoBack() {
    this.app.getRootNav().pop();
  }

  gotoOutPut() {
    this.app.getRootNav().push(MyWalletOutpuPage, {action: 'price'});
  }

}
