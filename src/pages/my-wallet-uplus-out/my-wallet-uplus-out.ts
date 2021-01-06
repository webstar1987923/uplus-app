import { Component } from '@angular/core';
import { NavController, NavParams, App, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the MyWalletUplusOutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-wallet-uplus-out',
  templateUrl: 'my-wallet-uplus-out.html',
})
export class MyWalletUplusOutPage {
  serverUrl = "http://unak.vip/uplus/Api/mobile";
  history_data = [];
  page_num = 0;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public app: App,
    public http: Http,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyWalletUplusOutPage');
  }

  ionViewWillEnter() {
    this.page_num = 0;
    let postData = {
      action: 'uplus_history_out',
      uid: localStorage.getItem("uid"),
      nIdx: this.page_num
    };

    let loading = this.loadingCtrl.create();
    loading.present();
    this.http.post(this.serverUrl + "/get_pay_history.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
      loading.dismiss();
        for (let index = 0; index < data.historyData.length; index++) {
          this.history_data.push(data.historyData[index]);          
        }
    }, err => {
      console.log(err);
      loading.dismiss();
    });
  }

  doInfinite(infiniteScroll) {
    this.page_num++;
    this.getHistoryData(this.page_num, infiniteScroll);
  }
  getHistoryData(nIdx, infiniteScroll) {
    let postData = {
      action: 'uplus_history_out',
      uid: localStorage.getItem("uid"),
      nIdx: nIdx
    };

    this.http.post(this.serverUrl + "/get_pay_history.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
      for(let index = 0; index < data.historyData.length; index++) {
        this.history_data.push(data.historyData[index])
      }
      infiniteScroll.complete();
    });
  }
}
