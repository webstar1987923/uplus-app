import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NewTicketPage } from '../new-ticket/new-ticket';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { HelpSupportItemViewPage } from '../help-support-item-view/help-support-item-view';

/**
 * Generated class for the HelpSupportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-help-support',
  templateUrl: 'help-support.html',
})
export class HelpSupportPage {

  serverUrl = "http://unak.vip/uplus/Api/mobile";
  historyData: any = [];
  page_num = 0;

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
    let loading = this.loadingCtrl.create();
    loading.present();

    let postData = {
      action: 'get_history',
      uid: localStorage.getItem('uid'),
      nIdx: this.page_num
    };

    this.http.post(this.serverUrl + "/support_help.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
      loading.dismiss();
      if(data.error == 1) {
        this.historyData = [];
        for (let index = 0; index < data.data.length; index++) {
          this.historyData.push(data.data[index]);
        }
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

  getSupportHistory(nIdx, infiniteScroll) {
    let postData = {
      action: 'get_history',
      uid: localStorage.getItem('uid'),
      nIdx: nIdx
    };

    this.http.post(this.serverUrl + "/support_help.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
      if(data.error == 1) {
        for (let index = 0; index < data.data.length; index++) {
          this.historyData.push(data.data[index]);
        }
      } else {
        this.alertCtrl.create({
          title: "警告",
          message: "网络失败!",
          buttons: ["确定"]
        }).present();
      }        
      infiniteScroll.complete();
    });
  }

  doInfinite(infiniteScroll) {
    this.page_num++;
    this.getSupportHistory(this.page_num, infiniteScroll);
  }

  newTicket() {
    this.navCtrl.push(NewTicketPage);
  }

  itemView(item) {
    this.navCtrl.push(HelpSupportItemViewPage, {itemData: item});
  }

  deleteItem(itemID) {
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
              itemID: itemID
            };
            this.http.post(this.serverUrl + "/support_help.php", JSON.stringify(postData))
            .map(res => res.json())
            .subscribe(data => {
              loading.dismiss();
              if(data.error == 1) {
                this.ionViewWillEnter();
              } else {
                this.alertCtrl.create({
                  title: "警告",
                  message: "网络失败!",
                  buttons: ["确定"]
                }).present();
              }
            }, err => {
              loading.dismiss();
              this.alertCtrl.create({
                title: "警告",
                message: "网络失败!",
                buttons: ["确定"]
              }).present();
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
