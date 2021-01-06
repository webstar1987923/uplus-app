import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the HelpSupportItemViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-help-support-item-view',
  templateUrl: 'help-support-item-view.html',
})
export class HelpSupportItemViewPage {

  itemID: any = "";
  itemContent: any = "";
  itemAddtime: any = "";
  serverUrl = "http://unak.vip/uplus/Api/mobile";

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
    let tmpData = this.navParams.get("itemData");
    this.itemID = tmpData.id;
    this.itemContent = tmpData.content;
    this.itemAddtime = tmpData.addtime;
    if(tmpData.readstate == '0') {
      let postData = {
        mID: this.itemID
      };
      let loading = this.loadingCtrl.create();
      loading.present();
      this.http.post(this.serverUrl + "/read_message.php", JSON.stringify(postData))
      .map(res => res.json())
      .subscribe(data => {
        loading.dismiss();
      }, err => {
        loading.dismiss();
      });
    }
  }

  deleteTicket() {
    let loading = this.loadingCtrl.create();
    this.alertCtrl.create({
      title: "通知",
      message: "确定删除吗？",
      buttons:[
        {
          text: "是",
          handler: () => {
            loading.present();
            let postData = {
              action: 'delete',
              itemID: this.itemID
            };
            this.http.post(this.serverUrl + "/support_help.php", JSON.stringify(postData))
            .map(res => res.json())
            .subscribe(data => {
              loading.dismiss();
              if(data.error == 1) {
                this.navCtrl.pop();
              } else {
                this.alertCtrl.create({
                  title: "警告",
                  message: "网络失败!",
                  buttons: ["确定"]
                }).present();
              }
            }, err => {
              loading.dismiss();
            });
          }
        },
        {
          text: "不",
          handler: () => {}
        }
      ]
    }).present();
  }

}
