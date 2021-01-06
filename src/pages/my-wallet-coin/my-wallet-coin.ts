import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, App } from 'ionic-angular';
import { QrCodeScannerPage } from '../qr-code-scanner/qr-code-scanner';
import { Slides } from 'ionic-angular';
import { UplusSellBoardPage } from '../uplus-sell-board/uplus-sell-board';
import { MyWalletCoinOutPage } from '../my-wallet-coin-out/my-wallet-coin-out';

/**
 * Generated class for the MyWalletCoinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-my-wallet-coin',
  templateUrl: 'my-wallet-coin.html',
})
export class MyWalletCoinPage {
  @ViewChild(Slides) slides: Slides;
  
  serverUrl: any = "http://unak.vip/uplus/Api/mobile";

  slides_bg: any = [];
  e_coin: any = "";
  photo: any = "";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public app: App
    ) {
  }

  ionViewDidLoad() {
    this.slides_bg = [];
    for (let index = 1; index < 6; index++) {
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

  ionViewWillEnter() {
    let tmp = JSON.parse(localStorage.getItem('infoData'));
    this.e_coin = tmp.e_coin;
    this.photo = tmp.photo;
    if(this.e_coin == null || this.e_coin == "") {
      this.e_coin = "";
    }
  }

  alertWarning() {
    this.alertCtrl.create({
      title: '通知',
      message: '注：钱途加密货币为公司无偿赠送的奖励形式，等国家的相关政策完善，达到符合要求的交易条件时正式上线交易。',
      buttons: ['确定']
    }).present();
  }

  gotoBack() {
    this.app.getRootNav().pop();
  }

  scanCode() {
    this.navCtrl.push(QrCodeScannerPage);
  }

  gotoSellBoard() {
    // this.navCtrl.push(UplusSellBoardPage);
    this.app.getRootNav().push(UplusSellBoardPage);
    // this.alertCtrl.create({
    //   title: '通知',
    //   message: '即将开放敬请期待。',
    //   buttons: ['确定']
    // }).present();
  }

  gotoHistory() {
    this.app.getRootNav().push(MyWalletCoinOutPage);
  }

}
