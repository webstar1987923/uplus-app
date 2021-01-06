import { Component } from '@angular/core';
import { NavController, NavParams, App, LoadingController, AlertController } from 'ionic-angular';

import { UserInfoModel } from '../../provider/userinfo-model';
import { MyWalletOutpuPage } from '../my-wallet-outpu/my-wallet-outpu';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the MyWalletShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-my-wallet-shop',
  templateUrl: 'my-wallet-shop.html',
})
export class MyWalletShopPage {

  serverUrl: any = "http://unak.vip/uplus/Api/mobile";
  historyData: any = [];
  price_shop: any = "";
  out_price_shop: any = "";
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
    let tmp_price = localStorage.getItem("shopPriceData");
    if(tmp_price == undefined || tmp_price == "") {
      return false;
    } else {
      this.savedData = true;
      let shopPriceData = JSON.parse(tmp_price);
      this.historyData = shopPriceData.historyData;
      this.price_shop = shopPriceData.other;
      this.out_price_shop = shopPriceData.out_price;
      let tmp = localStorage.getItem("infoData");
      let userData = new UserInfoModel();
      userData = JSON.parse(tmp);
      userData.price_shop = this.price_shop;
      localStorage.setItem("infoData", JSON.stringify(userData));

      return true;
    }
  }

  ionViewWillEnter() {
    this.savedData = this.getSavedData();

    let uid = localStorage.getItem("uid");
    let token = localStorage.getItem("token");
    let postData = {
      action: 'shop_history',
      uid: uid,
      token: token
    };
    let loading = this.loadingCtrl.create();
    if(!this.savedData) {
      loading.present();
    }
    this.http.post(this.serverUrl + "/get_pay_history.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
      if(!this.savedData) {
        loading.dismiss();
      }
      switch (data.error) {
        case 1:
          localStorage.setItem("shopPriceData", JSON.stringify(data));
          this.historyData = data.historyData;
          this.price_shop = data.other;
          this.out_price_shop = data.out_price;
          let tmp = localStorage.getItem("infoData");
          let userData = new UserInfoModel();
          userData = JSON.parse(tmp);
          userData.price_shop = this.price_shop;
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
    this.app.getRootNav().push(MyWalletOutpuPage, {action: 'price_shop'});
  }
}
