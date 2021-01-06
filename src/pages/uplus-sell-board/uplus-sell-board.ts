import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Item, Loading } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserInfoModel } from '../../provider/userinfo-model';
import { UplusMyBoardPage } from '../uplus-my-board/uplus-my-board';

/**
 * Generated class for the UplusSellBoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-uplus-sell-board',
  templateUrl: 'uplus-sell-board.html',
})
export class UplusSellBoardPage {
  @ViewChild(Slides) slides: Slides;

  serverUrl: string = "http://unak.vip/uplus/Api/mobile";
  userInfo: UserInfoModel;

  market_list: any = [];
  page_num: any = 0;
  n_uplus: any;
  slides_bg: any = [];

  constructor(public navCtrl: NavController, 
    public http: Http,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
      this.slides_bg = [];
      for (let index = 1; index < 7; index++) {
        this.slides_bg.push({
          id: index
        });      
      }
  
      setTimeout(()=>{
        if(this.slides_bg && this.slides_bg.length > 0){
          this.slides.freeMode = true;
          this.slides.autoplay = 2000;
          this.slides.speed = 500;
          this.slides.loop = true;
          this.slides.startAutoplay()
        }
      },1000);
  }

  slideChanged(){
    this.slides.startAutoplay();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UplusSellBoardPage');
  }

  ionViewWillEnter() {
    let tmp = localStorage.getItem('infoData');
    this.userInfo = new UserInfoModel();
    this.userInfo = JSON.parse(tmp);

    this.n_uplus = this.userInfo.n_uplus;

    this.page_num = 0;
    let postData = {
      action: 'get',
      nIdx: this.page_num,
      uid: localStorage.getItem('uid')
    };

    let loading = this.loadingCtrl.create();
    loading.present();

    this.http.post(this.serverUrl + "/get_market_list.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
        loading.dismiss();
        for (let index = 0; index < data.data.length; index++) {
          this.market_list.push(data.data[index]);          
        }
        this.market_list = data.data;
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
      action: 'get',
      uid: localStorage.getItem("uid"),
      nIdx: nIdx
    };

      this.http.post(this.serverUrl + "/get_market_list.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
        for (let index = 0; index < data.data.length; index++) {
          this.market_list.push(data.data[index]);          
        }
        infiniteScroll.complete();
      });
  }

  showCurrentMarket(market) {
    this.navCtrl.push(UplusMyBoardPage, {market: market});
  }
}
