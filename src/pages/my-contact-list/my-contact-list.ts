import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, PopoverController, App } from 'ionic-angular';

import { MyFriendInfoPage } from '../my-friend-info/my-friend-info';
import { MyContactFindPage } from '../my-contact-find/my-contact-find';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { CallNumber } from '@ionic-native/call-number';

import { ContactPopoverComponent } from '../../components/contact-popover/contact-popover';

/**
 * Generated class for the MyContactListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-my-contact-list',
  templateUrl: 'my-contact-list.html',
})
export class MyContactListPage {

  serverUrl = "http://unak.vip/uplus/Api/mobile";
  my_contacts: any = [];
  my_requests: any = "";

  chatNoti: any = "";
  notiData = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public http: Http,
    public app: App,
    public popoverCtrl: PopoverController,
    public callNumber: CallNumber
    ) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    this.my_contacts = [];
    this.my_requests = [];

    let loading = this.loadingCtrl.create();
    loading.present();

    let postData = {
      action: 'get',
      uid: localStorage.getItem('uid')
    };

    this.http.post(this.serverUrl + "/contact_list.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
      loading.dismiss();
      if(data.error == 1) {
        if(data.data != null) {
          this.my_contacts = data.data;
        }
        this.my_requests = data.request;
      } else {
        loading.dismiss();
        this.customAlert('警告', '网络失败!');
      }
    }, err => {
      loading.dismiss();
    });

    this.getChatNotiy();
    // let __this = this;
    // this.chatNoti = setInterval(function() {
    //   __this.getChatNotiy();
    // }, 1000);
  }

  ionViewWillLeave() {
    // clearInterval(this.chatNoti);
  }

  getChatNotiy() {
    let postData = {
      uid: localStorage.getItem('uid')
    };

    this.http.post(this.serverUrl + "/chat_notify.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
        this.notiData = data.list;
    }, err => {

    });
  }
  
  gotoFriendInfo(c_id, nickname) {
    this.navCtrl.push(MyFriendInfoPage, {cID: c_id, nick: nickname});
  }

  rejectRequest(id) {
    let postData = {
      action: 'reject',
      itemID: id
    };

    this.http.post(this.serverUrl + "/contact_list.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
      if(data.error == 1) {
        this.ionViewWillEnter();
      } else {
        this.customAlert('警告', '网络失败!');
      }
    }, err => {
    });
  }

  acceptRequest(id) {
    let postData = {
      action: 'add',
      itemID: id
    };

    this.http.post(this.serverUrl + "/contact_list.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
      if(data.error == 1) {
        this.ionViewWillEnter();
      } else {
        this.customAlert('警告', '网络失败!');
      }
    }, err => {
    });
  }

  callContact(phoneNumber) {
    this.callNumber.callNumber(phoneNumber, true)
    .then(res => {
    })
    .catch(err => {
    });
  }

  deleteContact(id) {
    this.alertCtrl.create({
      title: "通知",
      message: "确定删除吗？",
      buttons:[
        {
          text: "是",
          handler: () => {

            let postData = {
              action: 'delete',
              itemID: id
            };
        
            this.http.post(this.serverUrl + "/contact_list.php", JSON.stringify(postData))
            .map(res => res.json())
            .subscribe(data => {
              if(data.error == 1) {
                this.ionViewWillEnter();
              } else {
                this.customAlert('警告', '网络失败!');
              }
            }, err => {
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

  customAlert(title, message) {
    this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ["确定"]
    }).present();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(ContactPopoverComponent);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss(data => {
        switch (data) {
            case 'new_contact':
                this.navCtrl.push(MyContactFindPage);
                break;
            case 'single-chat':
                this.customAlert("通知", "暂不支持此功能");
                break;
            case 'group-chat':
                this.customAlert("通知", "暂不支持此功能");
                break;
        
            default:
                break;
        }
    });
  }

  changeNickname(id, nickname) {
    this.alertCtrl.create({
      title: "NickName",
      inputs: [
        {
          name: 'field',
          placeholder: "NickName",
          type: "text",
          value: nickname
        },
      ],
      buttons:[
        {
          text: '取消',
          handler: data => {

          }
        },
        {
          text: '确定',
          handler: data => {
            let newNick = data.field;

            let postData = {
              uid: localStorage.getItem('uid'),
              cid: id,
              nick: newNick,
              action: 'nick_change'
            };

            this.http.post(this.serverUrl + "/contact_list.php", JSON.stringify(postData))
            .map(res => res.json())
            .subscribe(data => {
              this.ionViewWillEnter();
            }, err => {
            });
          }
        }
      ]
    }).present();
  }

}
