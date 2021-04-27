import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { UserInfoModel } from '../../provider/userinfo-model';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the MyWalletOutpuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-my-wallet-outpu',
  templateUrl: 'my-wallet-outpu.html',
})
export class MyWalletOutpuPage {

  serverUrl: string = "http://unak.vip/uplus/Api/mobile";
  userInfo: UserInfoModel;
  requestValue: string = "";
  price: string = "";
  n_price: string = "";
  historyData: any = "";
  pageAction: string = "";
  level: any = "";

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
    ) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    this.pageAction = this.navParams.get("action");
    let tmp = JSON.parse(localStorage.getItem("infoData"));
    this.level = tmp.level;
    let postParam = {
      uid: localStorage.getItem("uid"),
      token: localStorage.getItem("token"),
      action: this.pageAction + "_new"
    };
    switch (this.pageAction) {
      case "price":
        this.price = tmp.price;
        this.n_price = tmp.n_price;
        break;
      case "price_shop":
        this.price = tmp.price_shop;
        break;
    
      default:
        break;
    }

    let loading = this.loadingCtrl.create();
    loading.present();

    this.http.post(this.serverUrl + "/out_pay_history.php", JSON.stringify(postParam))
    .map(res => res.json())
    .subscribe(data => {
      console.log(data);
      loading.dismiss();
      switch (data.error) {
        case 1:
          this.historyData = data.historyData;
          let tmp = localStorage.getItem("infoData");
          let userData = JSON.parse(tmp);
          if(this.price == "price") {
            userData.price = data.real;
            userData.n_price = data.n_price;
          } else {
            userData.price_shop = data.real;
          }
          localStorage.setItem("infoData", JSON.stringify(userData));
          break;
        case 2:
          this.alertCtrl.create({
            title: '警告',
            message: 'Another User logged',
            buttons: ["确定"]
          }).present();
          break;
      
        default:
          break;
      }
    }, err => {
      loading.dismiss();
    });
  }

  outputRequest() {
    if(this.requestValue != "" && parseFloat(this.requestValue) >= 10000) {
      let requestedValue = 0;
      for (let index = 0; index < this.historyData.length; index++) {
        if(this.historyData[index].state == "0") {
          requestedValue += parseFloat(this.historyData[index].price);
        }
      }

      if(parseFloat(this.requestValue) > (parseFloat(this.n_price) - requestedValue)) {
        this.alertCtrl.create({
          title: "警告",
          message: "您自前无法申请提现",
          buttons: ["确定"]
        }).present();
      } else {
        if(parseFloat(this.requestValue) < 10000) {
          this.alertCtrl.create({
            title: "警告",
            message: "请输入100元以上金额",
            buttons: ["确定"]
          }).present();
        } else {
          let postParam = {
            uid: localStorage.getItem("uid"),
            token: localStorage.getItem("token"),
            action: this.pageAction + "_withdraw_new",
            value: parseFloat(this.requestValue)
          };
          
          console.log(postParam);

          let loading = this.loadingCtrl.create();
          loading.present();
          this.http.post(this.serverUrl + "/out_pay_history.php", JSON.stringify(postParam))
          .map(res => res.json())
          .subscribe(data => {
            loading.dismiss();
            console.log(data);
            switch (data.error) {
              case 1:
                this.requestValue = "";
                this.historyData = data.historyData;
                let tmp = localStorage.getItem("infoData");
                let userData = JSON.parse(tmp);
                if(this.price == "price") {
                  userData.price = data.real;
                  userData.n_price = data.n_price;
                } else {
                  userData.price_shop = data.real;
                }
                localStorage.setItem("infoData", JSON.stringify(userData));
                break;
              case 2:
                this.alertCtrl.create({
                  title: '警告',
                  message: 'Another User logged',
                  buttons: ["确定"]
                }).present();
                break;
              case 0:
                this.alertCtrl.create({
                  title: '警告',
                  message: '已在申请中。。',
                  buttons: ["确定"]
                }).present();
                break;
            
              default:
                break;
            }
          }, err => {
            loading.dismiss();
          });
        }
      }
    } else {
      this.alertCtrl.create({
        title: "警告",
        message: "请输入100元以上金额",
        buttons: ["确定"]
      }).present();
    }
  }
}
