import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { UserInfoModel } from '../../provider/userinfo-model';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the TransferCoinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-transfer-coin',
  templateUrl: 'transfer-coin.html',
})
export class TransferCoinPage {

  serverUrl: string = "http://unak.vip/uplus/Api/mobile";
  userInfo: UserInfoModel;  
  
  historyData: any = "";   
  coin: string = "";
  receiver: string = "";
  e_coin: string = "";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    
    let tmp = JSON.parse(localStorage.getItem("infoData"));    
    this.e_coin = tmp.e_coin;
        
    /*let postParam = {
      uid: localStorage.getItem("uid"),
      token: localStorage.getItem("token"),
      action: ""
    };
 
    let loading = this.loadingCtrl.create();
    loading.present();

    this.http.post(this.serverUrl + "/out_pay_history.php", JSON.stringify(postParam))
    .map(res => res.json())
    .subscribe(data => {
      console.log(data);
      loading.dismiss();
      switch (data.error) {
        case 1:
          this.historyData = data.historyData;
          let tmp = localStorage.getItem("infoData");
          let userData = JSON.parse(tmp);
          if(this.price == "price") {
            userData.price = data.real;
            userData.n_price = data.n_price;
          } else {
            userData.price_shop = data.real;
          }
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
      loading.dismiss();
    });*/
  }

  sendCoin() {
    
    let tmp = JSON.parse(localStorage.getItem("infoData"));        
    
    if (this.receiver == localStorage.getItem("uid")) {
      return;
    }

    if (parseInt(this.coin) > parseInt(this.e_coin)) {
      this.alertCtrl.create({
        title: '警告',
        message: '不能转让'+this.e_coin+'以上的广告豆',
        buttons: ["确定"]
      }).present();
      return;
    }

    let postParam = {      
      token: localStorage.getItem("token"),
      sender: localStorage.getItem("uid"),
      receiver: this.receiver,
      amount : this.coin
    };

    let loading = this.loadingCtrl.create();
    loading.present();
    this.http.post(this.serverUrl + "/transfer_coin.php", JSON.stringify(postParam))
    .map(res => res.json())
    .subscribe(data => {
      loading.dismiss();
      console.log(data);
      switch (data.error) {
        case 1:
          this.alertCtrl.create({
            title: '失败',
            message: '用户不存在！',
            buttons: ["确定"]
          }).present();
          break;
        case 2:
          this.alertCtrl.create({
            title: '失败',
            message: 'token无效',
            buttons: ["确定"]
          }).present();
          break;
        case 0:
          this.e_coin = data.e_coin;

          let tmp1 = JSON.parse(localStorage.getItem("infoData"));    
          tmp1.e_coin = this.e_coin;
          localStorage.setItem("infoData", JSON.stringify(tmp1));

          this.alertCtrl.create({
            title: '成功',
            message: '转让了',
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
