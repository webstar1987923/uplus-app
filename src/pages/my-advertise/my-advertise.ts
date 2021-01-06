import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { MyAdsAddPage } from '../my-ads-add/my-ads-add';
import { Http } from  '@angular/http';
import 'rxjs/add/operator/map';
import { MyAdsItemViewPage } from '../my-ads-item-view/my-ads-item-view';

/**
 * Generated class for the MyAdvertisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-my-advertise',
  templateUrl: 'my-advertise.html',
})
export class MyAdvertisePage {
  serverUrl = "http://unak.vip/uplus/Api/mobile";
  my_ads_list = [];
  page_num = 0;
  total = 0;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
    ) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    this.page_num = 0;
    let postData = {
      action: 'get',
      uid: localStorage.getItem("uid"),
      nIdx: this.page_num
    };

    let loading = this.loadingCtrl.create();
    loading.present();

    this.http.post(this.serverUrl + "/get_my_ads_list.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
        loading.dismiss();
        this.my_ads_list = [];
        for (let index = 0; index < data.data.length; index++) {
          this.my_ads_list.push(data.data[index]);  
          this.total = data.total;        
        }
    }, err => {
      loading.dismiss();
    });
  }

  doInfinite(infiniteScroll) {
    this.page_num++;
    this.getAdsList(this.page_num, infiniteScroll);
  }

  getAdsList(nIdx, infiniteScroll) {
    let postData = {
      action: 'get',
      uid: localStorage.getItem("uid"),
      nIdx: this.page_num
    };

    this.http.post(this.serverUrl + "/get_my_ads_list.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
        for (let index = 0; index < data.data.length; index++) {
          this.my_ads_list.push(data.data[index]);  
          this.total = data.total;        
        }   
        infiniteScroll.complete();
    });
  }

  addNewAds() {
    this.navCtrl.push(MyAdsAddPage);
  }

  showCurrentAds(adsID) {
    this.navCtrl.push(MyAdsItemViewPage, {adsID: adsID});
  }

  delAds(adsID) {
    this.alertCtrl.create({
      title: "通知",
      message: "确定删除吗?",
      buttons: [
        {
          text: "是",
          handler: () => {
            let postData = {
              action: 'del',
              uid: localStorage.getItem("uid"),
              id: adsID
            };
        
            let loading = this.loadingCtrl.create();
            loading.present();
        
            this.http.post(this.serverUrl + "/get_my_ads_list.php", JSON.stringify(postData))
            .map(res => res.json())
            .subscribe(data => {
              loading.dismiss();
              this.my_ads_list = [];
              for (let index = 0; index < data.data.length; index++) {
                this.my_ads_list.push(data.data[index]);  
                this.total = data.total;        
              }   
            }, err => {
              loading.dismiss();
            });
          }
        }, 
        {
          text: "不",
          handler: () => {
          }
        }
      ]
    }).present();

  }
}
