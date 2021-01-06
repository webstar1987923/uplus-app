import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Item, Loading } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the UplusSellBoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-uplus-history-board',
  templateUrl: 'uplus-history-board.html',
})
export class UplusHistoryBoardPage {
  @ViewChild(Slides) slides: Slides;

  serverUrl: string = "http://unak.vip/uplus/Api/mobile";

  list: any = [];
  page_num: any = 0;
  available: any = 0;

  constructor(public navCtrl: NavController, 
    public http: Http,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UplusSellBoardPage');
  }

  ionViewWillEnter() {
    this.page_num = 0;
    let postData = {
      nIdx: this.page_num,
      uid: localStorage.getItem('uid')
    };

    let loading = this.loadingCtrl.create();
    loading.present();

    this.http.post(this.serverUrl + "/get_market_history.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
        loading.dismiss();
        for (let index = 0; index < data.data.length; index++) {
          this.list.push(data.data[index]);          
        }
        this.list = data.data;
        this.available = data.price;
    }, err => {
      loading.dismiss();
    });
  }

  doInfinite(infiniteScroll) {
    this.page_num++;
    this.getMarketList(this.page_num, infiniteScroll);
  }

  getMarketList(nIdx, infiniteScroll) {
    let postData = {
      uid: localStorage.getItem("uid"),
      nIdx: nIdx
    };

      this.http.post(this.serverUrl + "/get_market_history.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
        for (let index = 0; index < data.data.length; index++) {
          this.list.push(data.data[index]);          
        }
        infiniteScroll.complete();
      });
  }

  rejectRequest(id) {
    let postParam = {
      action: 'del',
      id: id
    }
   
    this.http.post(this.serverUrl + "/covert_request_action.php", JSON.stringify(postParam))
    .map(res => res.json())
    .subscribe(data => {
      this.ionViewWillEnter();
    }, err => {
    });
  }

  acceptRequest(id) {
    let postParam = {
      action: 'accept',
      id: id
    }
   console.log(postParam);
    this.http.post(this.serverUrl + "/covert_request_action.php", JSON.stringify(postParam))
    .map(res => res.json())
    .subscribe(data => {
      this.ionViewWillEnter();
    }, err => {
    });
  }
}
