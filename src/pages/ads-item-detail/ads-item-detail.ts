import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-ads-item-detail',
  templateUrl: 'ads-item-detail.html',
})
export class AdsItemDetailPage {
  @ViewChild('videoPlayer') vplayer: ElementRef;

  uid: any;
  serverUrl = "http://unak.vip/uplus";
  video_url: any;
  aid: any = "";
  curPos = 0;
  ads_list: any;

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
    this.ads_list = this.navParams.get("items");
    this.curPos = this.navParams.get("index");
        
    this.video_url = this.serverUrl + this.ads_list[this.curPos].video;
    this.aid = this.ads_list[this.curPos].aid;
    
    this.vplayer.nativeElement.addEventListener("canplay", () => {
      this.vplayer.nativeElement.play();
    }, true);
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

      //play next video automatically
      this.curPos++;
      if (this.curPos >= this.ads_list.length) {
        this.curPos = 0;
      }
      if (this.curPos != this.navParams.get("index")) {
        this.video_url = this.serverUrl + this.ads_list[this.curPos].video;
        this.aid = this.ads_list[this.curPos].aid;
      }
    }, err => {
      loading.dismiss();
    });
  }

}
