import { Component } from '@angular/core';
import { NavController, NavParams, App, LoadingController, AlertController } from 'ionic-angular';

import { UserInfoModel } from '../../provider/userinfo-model';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { MyWalletUplusOutPage } from '../my-wallet-uplus-out/my-wallet-uplus-out';
/**
 * Generated class for the MyWalletUplusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-my-wallet-uplus',
  templateUrl: 'my-wallet-uplus.html',
})
export class MyWalletUplusPage {

  serverUrl: any = "http://unak.vip/uplus/Api/mobile";
  historyData: any = [];
  uplus: any = "";
  n_uplus: any = "";
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
    let tmp_price = localStorage.getItem("uplusData");
    if(tmp_price == undefined || tmp_price == "") {
      return false;
    } else {
      this.savedData = true;
      let uplusData = JSON.parse(tmp_price);
      this.historyData = uplusData.historyData;
      this.uplus = uplusData.other;
      this.n_uplus = uplusData.n_uplus;
      let tmp = localStorage.getItem("infoData");
      let userData = new UserInfoModel();
      userData = JSON.parse(tmp);
      userData.uplus = this.uplus;
      userData.n_uplus = this.n_uplus;
      localStorage.setItem("infoData", JSON.stringify(userData));

      return true;
    }
  }

  ionViewWillEnter() {
    this.savedData = this.getSavedData();

    let uid = localStorage.getItem("uid");
    let token = localStorage.getItem("token");
    let postData = {
      action: 'uplus_history',
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
          localStorage.setItem('uplusData', JSON.stringify(data));
          this.historyData = data.historyData;
          this.uplus = data.other;
          this.n_uplus = data.n_uplus;
          let tmp = localStorage.getItem("infoData");
          let userData = new UserInfoModel();
          userData = JSON.parse(tmp);
          userData.uplus = this.uplus;
          userData.n_uplus = this.n_uplus;
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
    this.app.getRootNav().push(MyWalletUplusOutPage);
  }

}
