import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the MyAdsItemViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-my-ads-item-view',
  templateUrl: 'my-ads-item-view.html',
})
export class MyAdsItemViewPage {

  @ViewChild('videoPlayer') mVideoPlayer: any;

  serverUrl = "http://unak.vip/uplus/Api/mobile";
  adsID: any = "";
  adsData: any = "";
  video_url: any = "";
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    ) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    this.adsID = this.navParams.get('adsID');

    let postData = {
      action: 'item',
      id: this.adsID
    };

    let loading = this.loadingCtrl.create();
    loading.present();

    this.http.post(this.serverUrl + "/get_my_ads_item.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
      loading.dismiss();
      if(data.error == 1) {
        this.adsData = data.data;
        this.video_url = 'http://unak.vip/uplus/Resource/images/ads/videos/' + this.adsData.video;
      } else {
        this.alertCtrl.create({
          title: "通知",
          message: "不资料存在",
          buttons: [
            {
              text: "确定",
              handler: () => {
                this.navCtrl.pop();
              }
            }
          ]
        }).present();
      }
    }, err => {
      loading.dismiss();
    });
  }

}
