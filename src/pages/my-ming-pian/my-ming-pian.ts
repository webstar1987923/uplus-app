import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { MyInfoMingPianPage } from '../my-info-ming-pian/my-info-ming-pian';

/**
 * Generated class for the MyMingPianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-my-ming-pian',
  templateUrl: 'my-ming-pian.html',
})
export class MyMingPianPage {

  serverUrl = "http://unak.vip/uplus/Api/mobile";
  friendData: any = "";
  photo: any = "";
  realname: any = "";
  other_cate = [];
  card_style = 1;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public loadingCtrl: LoadingController,
    ) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    let postData = {
      uid: localStorage.getItem('uid'),
      action: 'me'
    };

    let loading = this.loadingCtrl.create();
    loading.present();

    this.http.post(this.serverUrl + "/get_user_mingpian.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
      loading.dismiss();
      if(data.error == 1) {
        this.photo = data.data.photo;
        this.realname = data.data.realname;
        if(data.data.mingpian) {
          this.friendData = data.data.mingpian;
          this.other_cate = this.friendData.other_cate.split("--");
          this.card_style = this.friendData.card_style;
        }
      } else {
        this.navCtrl.push(MyInfoMingPianPage);
      }
    }, err => {
      loading.dismiss();
    });
  }

  changeMingpian() {
    this.navCtrl.push(MyInfoMingPianPage);
  }

  changeStyle() {
    let postData = {
      uid: localStorage.getItem('uid'),
      style: this.card_style,
      action: 'change'
    };

    this.http.post(this.serverUrl + "/change_style.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
    }, err => {
    });
  }

}
