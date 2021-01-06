import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { CallNumber } from '@ionic-native/call-number';
import { ChatPage } from '../chat/chat';

/**
 * Generated class for the MyFriendInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-my-friend-info',
  templateUrl: 'my-friend-info.html',
})
export class MyFriendInfoPage {

  serverUrl = "http://unak.vip/uplus/Api/mobile";
  friendData: any = "";
  photo: any = "";
  realname: any = "";
  nickname: any = "";
  other_cate = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public loadingCtrl: LoadingController,
    public callNumber: CallNumber
    ) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    var friendID = this.navParams.get('cID');
    this.nickname = this.navParams.get('nick');
    
    let postData = {
      uid: friendID,
      action: 'get'
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
        }
      } else {
        this.navCtrl.pop();
      }
    }, err => {
      loading.dismiss();
    });
  }

  callFriend(phoneNumber) {
    this.callNumber.callNumber(phoneNumber, true)
    .then(res => {
    })
    .catch(err => {
    });
  }

  chatWithFriend() {
    let cID = this.friendData.username;
    let cName = (this.nickname) ? this.nickname : this.realname;
    let cPhoto = (this.photo) ? this.serverUrl + "/profile_imgs/" + this.photo: "assets/imgs/other/default.png";

    this.navCtrl.push(ChatPage, {cid: cID, cname: cName, cphoto: cPhoto});
  }

}
