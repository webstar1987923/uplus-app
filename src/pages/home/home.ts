import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Tabs, AlertController } from 'ionic-angular';
import { AdsPage } from '../ads/ads';
import { MyPage } from '../my/my';
import { ShopPage } from '../shop/shop';
import { MyContactListPage } from '../my-contact-list/my-contact-list';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild('myTabs') tabRef: Tabs;
  serverUrl = "http://unak.vip/uplus/Api/mobile";

  tab1 = AdsPage;
  tab2 = ShopPage;
  tab3 = MyContactListPage;
  tab4 = MyPage;

  curVersion = "2.0";

  timeInterval: any;

  constructor(public navCtrl: NavController, 
    public http: Http,
    public alertCtrl: AlertController,
    public navParams: NavParams
    ) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    // this.getNewVersion();
    // let _this = this;
    // this.timeInterval = setInterval(function() {
    //   _this.getNewVersion();
    // }, 30000);
  }

  ionViewWillLeave() {
    // clearInterval(this.timeInterval);
  }

  getNewVersion() {
    let storedVersion = localStorage.getItem('new_version');
    let savedLastPay = localStorage.getItem('payLast');
    if(storedVersion == "" || storedVersion == undefined || storedVersion == this.curVersion) {
      console.log('getting...');
      let postData = {
        version: this.curVersion,
        uid: localStorage.getItem('uid'),
        savedLastPay: savedLastPay
      };
  
      this.http.post(this.serverUrl + "/get_new_version.php", JSON.stringify(postData))
      .map(res => res.json())
      .subscribe(data => {
        if(data.data == '0' || data.data == '1') {
          localStorage.setItem('new_version', "");
        } else {
          localStorage.setItem('new_version', data.data);
        }

        if(data.last != "" && data.last != null) {
          this.alertCtrl.create({
            message: "亲亲！您目前是免费会员，公司发放的推广奖金和看广告的分享金虽然不少不过可以更多的哟！只要成为正式入网会员(100元，终身一次性费用)您的奖金就会翻倍，推广奖金每人每次最高100元，看广告每月所得最高300元哦！共享钱途 共享未来！",
            buttons: ["确定"]
          }).present();

          localStorage.setItem('payLast', data.last);
        }
      }, err => {
  
      });
    }
  }

}
