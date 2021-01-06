import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-ads-item-detail',
  templateUrl: 'ads-item-detail.html',
})
export class AdsItemDetailPage {

  uid: any;
  serverUrl = "http://unak.vip/uplus";
  video_url: any;
  aid: any = "";

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
    let tmpData = this.navParams.get("item");
    this.video_url = this.serverUrl + tmpData.video;
    this.aid = tmpData.aid;
  }

  videoEnded() {
    console.log('-----video ended-------');
    // ads bonus ---
    let postParam = {
      uid: localStorage.getItem("uid"),
      aid: this.aid,
      token: localStorage.getItem("token"),
      action: 'play_video'
    };

    let loading = this.loadingCtrl.create();
    loading.present();

    this.http.post(this.serverUrl + "/Api/ads_n_earn.php", JSON.stringify(postParam))
    .map(res => res.json())
    .subscribe(data => {
      loading.dismiss();
    }, err => {
      loading.dismiss();
    });
  }

}
