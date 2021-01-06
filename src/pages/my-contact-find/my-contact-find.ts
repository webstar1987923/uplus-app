import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Shake } from '@ionic-native/shake';


@Component({
  selector: 'page-my-contact-find',
  templateUrl: 'my-contact-find.html',
})
export class MyContactFindPage {

  shakeFlag: boolean = false;
  serverUrl = "http://unak.vip/uplus/Api/mobile";

  persons: any = "";
  // lat: any = "";
  // lng: any = "";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private shake: Shake,
    public alertCtrl: AlertController,
    public http: Http,
    public loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    // navigator.geolocation.getCurrentPosition(pos => {
    //   this.lat = pos.coords.latitude;
    //   this.lng = pos.coords.longitude;
    // });

    const watch = this.shake.startWatch(20).subscribe(() => {
      this.shakeFlag = true;
      document.getElementById("shake-bottom-img").classList.add('animation-sliding');
      let loading = this.loadingCtrl.create();
      loading.present();

      let postData = {
        action: 'shake',
        uid: localStorage.getItem('uid'),
        // lat: this.lat,
        // lng: this.lng
      };

      this.http.post(this.serverUrl + "/shake.php", JSON.stringify(postData))
      .map(res => res.json())
      .subscribe(data => {
        loading.dismiss();
        document.getElementById("shake-bottom-img").classList.remove('animation-sliding');
        if(data.error == 1) {
          this.persons = data.data;
        } else {
          this.alertCtrl.create({
            title: "警告",
            message: "网络失败!",
            buttons: ["确定"]
          }).present();
        }
      }, err => {
        loading.dismiss();
        document.getElementById("shake-bottom-img").classList.remove('animation-sliding');
      });
    });
    // watch.unsubscribe();
  }

  ionViewWillLeave() {
    let postData = {
      action: 'delete',
      uid: localStorage.getItem('uid')
    };

    this.http.post(this.serverUrl + "/shake.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
    }, err => {
    });
  }

  sendAddRequest(personID) {
    let postData = {
      action: 'request',
      from: localStorage.getItem('uid'),
      to: personID
    };

    this.http.post(this.serverUrl + "/shake.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
      this.alertCtrl.create({
        title: "通知",
        message: "发送成功",
        buttons: ["确定"]
      }).present();
    }, err => {
      this.alertCtrl.create({
        title: "警告",
        message: "网络失败!",
        buttons: ["确定"]
      }).present();
    });
  }
}
