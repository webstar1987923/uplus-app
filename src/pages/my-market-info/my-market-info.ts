import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import "rxjs/add/operator/map";
import { UplusHistoryBoardPage } from '../uplus-history-board/uplus-history-board';

/**
 * Generated class for the SettingPayOptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-my-market-info',
  templateUrl: 'my-market-info.html',
})
export class MyMarketInfoPage {

  serverURL = "http://unak.vip/uplus/Api/mobile";

  title: string = "";
  message: string = "";
  price: string = "";

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
    let postData = {
      uid: localStorage.getItem("uid"),
      action: 'get'
    };

    let loading = this.loadingCtrl.create();
    loading.present();

    this.http.post(this.serverURL + "/change_market_info.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
      loading.dismiss();
      if(data.error == 1) {
        this.title = data.data.title;
        this.message = data.data.message;
        this.price = data.data.available;
      }
    }, err => {
      loading.dismiss();
    });;
  }

  saveMarketAccount() {
    let postData = {
      uid: localStorage.getItem("uid"),
      token: localStorage.getItem("token"),
      title: this.title,
      message: this.message,
      action: 'save_info'
    };

    let loading = this.loadingCtrl.create();
    loading.present();

    this.http.post(this.serverURL + "/change_market_info.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
      loading.dismiss();
      if(data.error = 1) {
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

  gotoHistory() {
    this.navCtrl.push(UplusHistoryBoardPage);
  }

}
