import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController, LoadingController, PopoverController } from 'ionic-angular';

import { MyWalletPage } from '../my-wallet/my-wallet';
import { MyInfoPage } from '../my-info/my-info';

import { UserInfoModel } from '../../provider/userinfo-model';

import { Http } from  '@angular/http';
import 'rxjs/add/operator/map';
import { MyLevelPage } from '../my-level/my-level';
import { MyShopMolePage } from '../my-shop-mole/my-shop-mole';
import { SettingPage } from '../setting/setting';
import { MyInfoQrCodePage } from '../my-info-qr-code/my-info-qr-code';
import { NormallPopoverComponent } from '../../components/normall-popover/normall-popover';
import { HelpSupportPage } from '../help-support/help-support';
import { MyContactFindPage } from '../my-contact-find/my-contact-find';
import { MyAdvertisePage } from '../my-advertise/my-advertise';
import { QrCodeScannerPage } from '../qr-code-scanner/qr-code-scanner';
import { NewVersionPage } from '../new-version/new-version';
import { MyMarketInfoPage } from '../my-market-info/my-market-info';
import { MyChargePage } from '../my-charge/my-charge';

@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {

    serverUrl = "http://unak.vip/uplus/Api/mobile";

    realname: string = "";
    username: string = "";
    levelname: string = "";
    photo: string = "";

    curUserInfo: UserInfoModel;
    curVersion: any = "";
    old_version: string = "2.0";
    notiInterval: any = "";
    newChatCount = 0;
    unreadMails = 0;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public app: App,
        public http: Http,
        public alertCtrl: AlertController,
        public loadingCtrl: LoadingController,
        public popoverCtrl: PopoverController,
        ) {
    }

    ionViewDidLoad() {
    }

    ionViewWillEnter() {
        this.setUserInfo();
        this.newChatCount = 0;
        this.getChatNotify();
        // let _this = this;
        // this.notiInterval = setInterval(function() {
        //     _this.getChatNotify();
        // }, 1000);
        this.getUserInfo();
        this.getUnreadMailCount();
    }

    ionViewWillLeave() {
        // clearInterval(this.notiInterval);
    }

    getUnreadMailCount() {
        let postData = {
            action: 'get_unread_count',
            uid: localStorage.getItem('uid')           
        };
    
        this.http.post(this.serverUrl + "/support_help.php", JSON.stringify(postData))
        .map(res => res.json())
        .subscribe(data => {
            if(data.error == 1) {
                this.unreadMails = data.count;              
            }            
        });
    }

    getChatNotify() {
        let postData = {
            uid: localStorage.getItem('uid')
        };

        this.http.post(this.serverUrl + "/chat_notify.php", JSON.stringify(postData))
        .map(res => res.json())
        .subscribe(data => {
            this.newChatCount = data.total;
        }, err => {

        });
    }

    getUserInfo() {
        this.curVersion = localStorage.getItem('new_version');

        let postData = {
            action: 'get',
            uid: localStorage.getItem("uid")
        };
        let loading = this.loadingCtrl.create();
        loading.present();

        this.http.post(this.serverUrl + "/current_user.php", JSON.stringify(postData))
        .map(res => res.json())
        .subscribe(data => {
            loading.dismiss();
            this.curUserInfo = new UserInfoModel();
            this.curUserInfo = data;
            localStorage.setItem("infoData", JSON.stringify(this.curUserInfo));
            this.username = this.curUserInfo.uid;
            this.realname = this.curUserInfo.realname;
            this.levelname = this.curUserInfo.level_name;
            this.photo = this.curUserInfo.photo;
        }, err => {
            console.log(err);
            loading.dismiss();
        });
    }

    setUserInfo() {
        let tmp = localStorage.getItem("infoData");
        if(tmp == undefined || tmp == "") {
            this.getUserInfo();
        } else {
            let savedUser = new UserInfoModel();
            savedUser = JSON.parse(tmp);
            this.username = localStorage.getItem("uid");
            if(this.username != savedUser.uid) {
                this.getUserInfo();
            } else {
                this.username = savedUser.uid;
                this.realname = savedUser.realname;
                this.levelname = savedUser.level_name;
            }
        }

    }

    gotoDownload() {
        this.app.getRootNav().push(NewVersionPage);
    }

    gotoWallet() {
        this.app.getRootNav().push(MyWalletPage);
    }
       
    gotoInfo() {
        this.app.getRootNav().push(MyInfoPage);
    }

    gotoLevel() {
        this.app.getRootNav().push(MyLevelPage);
    }

    gotoShopMole() {
        this.app.getRootNav().push(MyShopMolePage);
    }

    gotoMarket() {
        if(this.curUserInfo.market != '1') {
            this.alertCtrl.create({
                title: "通知",
                message: "获得交易所权限的亲亲请给如下账号转账交易所申请费用五万元哟！",
                buttons: ["确定"]
            }).present();
        } else {
            this.app.getRootNav().push(MyMarketInfoPage);
        }
    }

    gotoAds() {
        this.app.getRootNav().push(MyAdvertisePage);
    }

    gotoCharge() {
        this.app.getRootNav().push(MyChargePage);
    }

    gotoSetting() {
        this.app.getRootNav().push(SettingPage);
    }

    gotoMyQRCode() {
        this.app.getRootNav().push(MyInfoQrCodePage);
    }

    gotoGame() {
        this.alertCtrl.create({
            title: "通知",
            message: "您的版本暂不支持游戏功能，请期待下一个版本。",
            buttons: ["确定"]
        }).present();
    }

    GotoHelpPage() {
        this.app.getRootNav().push(HelpSupportPage);
    }

    presentPopover(myEvent) {
        let popover = this.popoverCtrl.create(NormallPopoverComponent);
        popover.present({
          ev: myEvent
        });

        popover.onDidDismiss(data => {
            switch (data) {
                case 'new_contact':
                    this.app.getRootNav().push(MyContactFindPage);
                    break;
                case 'scan':
                    this.app.getRootNav().push(QrCodeScannerPage);
                    break;
                /*case 'help':
                    this.app.getRootNav().push(HelpSupportPage);
                    break;*/            
                default:
                    break;
            }
        });
    }
}
