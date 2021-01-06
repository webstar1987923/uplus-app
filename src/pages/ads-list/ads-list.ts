import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AdsItemDetailPage } from '../ads-item-detail/ads-item-detail';

@Component({
  selector: 'page-ads-list',
  templateUrl: 'ads-list.html',
})
export class AdsListPage {

  uid: any;
  serverUrl = "http://unak.vip/uplus/Api";
  ads_list = [];
  total = 0;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
    ) {
  }

  ionViewDidLoad() {
    this.uid = localStorage.getItem('uid');
  }

  ionViewWillEnter() {
    let postData = {
      action: 'get',
      uid: localStorage.getItem("uid"),
    };

    let loading = this.loadingCtrl.create();
    loading.present();

    this.http.post(this.serverUrl + "/adsmanage.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
        loading.dismiss();
        this.ads_list = [];
        for (let index = 0; index < data.highlight.length; index++) {
          this.ads_list.push(data.highlight[index]);  
          this.total = data.total;        
        }
    }, err => {
      loading.dismiss();
    });
  }

  itemDetail(item) {
    this.navCtrl.push(AdsItemDetailPage, {item: item});
  }

}
