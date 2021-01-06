import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserInfoModel } from '../../provider/userinfo-model';

/**
 * Generated class for the MyWalletChargePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-wallet-charge',
  templateUrl: 'my-wallet-charge.html',
})
export class MyWalletChargePage {

  serverUrl: any = "http://unak.vip/uplus/Api/mobile";
  historyData: any = [];
  n_price_shop: any = "";
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
    console.log('ionViewDidLoad MyWalletChargePage');
  }
  
  getSavedData() {
    let tmp_price = localStorage.getItem("chargePriceData");
    if(tmp_price == undefined || tmp_price == "") {
      return false;
    } else {
      this.savedData = true;
      let shopPriceData = JSON.parse(tmp_price);
      this.historyData = shopPriceData.historyData;
      this.n_price_shop = shopPriceData.other;
      let tmp = localStorage.getItem("infoData");
      let userData = new UserInfoModel();
      userData = JSON.parse(tmp);
      userData.n_price_shop = this.n_price_shop;
      localStorage.setItem("infoData", JSON.stringify(userData));

      return true;
    }
  }

  ionViewWillEnter() {
    this.savedData = this.getSavedData();

    let uid = localStorage.getItem("uid");
    let token = localStorage.getItem("token");
    let postData = {
      action: 'charge_history',
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
      console.log(data);
      if(!this.savedData) {
        loading.dismiss();
      }
      switch (data.error) {
        case 1:
          localStorage.setItem("chargePriceData", JSON.stringify(data));
          this.historyData = data.historyData;
          this.n_price_shop = data.other;
          let tmp = localStorage.getItem("infoData");
          let userData = new UserInfoModel();
          userData = JSON.parse(tmp);
          userData.price_shop = this.n_price_shop;
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
      console.log(err);
      if(!this.savedData) {
        loading.dismiss();
      }
    });
  }

  gotoBack() {
    this.app.getRootNav().pop();
  }

}
