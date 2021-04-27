import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
import { SaveUserNameProvider } from '../../providers/save-user-name/save-user-name';

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
    public alertCtrl: AlertController,
    public saveUserIDProvider: SaveUserNameProvider
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
      
      if (data.status == true) {
        //play next video automatically
        this.curPos++;
        if (this.curPos >= this.ads_list.length) {
          this.curPos = 0;
        }
        if (this.curPos != this.navParams.get("index")) {
          this.video_url = this.serverUrl + this.ads_list[this.curPos].video;
          this.aid = this.ads_list[this.curPos].aid;
        }
      } else {

        this.alertCtrl.create({
          title: "警告",
          message: "这个帐户已经登录了另一个手机。 不能继续看广告。",
          buttons:[{
            text: '确定',
            handler: () => {
                            
              let postData = {
                token: localStorage.getItem("token"),
                uid: localStorage.getItem('uid'),
                action: 'logout'
              };
              this.http.post(this.serverUrl + "/Api/mobile/logout.php", JSON.stringify(postData))
              .map(res => res.json())
              .subscribe(data => {
                loading.dismiss();
                if (data.error == '0') {
                  localStorage.setItem("uid", "");
                  localStorage.setItem("token", "");
                  localStorage.setItem("infoData", "");
                  this.navCtrl.setRoot(LoginPage);
                  
                  this.saveUserIDProvider.removeUID('remove').then(result => {
                    this.navCtrl.setRoot(LoginPage);
                  })
                  .catch(err => {
                  });
  
                }
              });

            }
          }]
        }).present();;                
      }
    }, err => {
      loading.dismiss();
    });
  }

}
