import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { MyChargeOptionPage } from '../my-charge-option/my-charge-option';

/**
 * Generated class for the MyChargePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-charge',
  templateUrl: 'my-charge.html',
})
export class MyChargePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyChargePage');
  }

  chargePrice(amount, kind) {
    this.showOptions(amount, kind);
  }

  showOptions(amount, kind) {
    this.alertCtrl.create({
      title: amount + " 元 充值",
      inputs: [
        {
          name: 'pay_option',
          label: '支付宝',
          type: 'radio',
          checked: true,
          value: '101'
        },
        {
          name: 'pay_option',
          label: '微信支付',
          type: 'radio',
          value: '102'
        }
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
            this.selectOption(data, amount, kind);
          }
        }
      ]
    }).present();
  }

  //kind: 1: charge, 2: Shop ads
  //option: 101: alipay, 102: weixin
  selectOption(option, amount, kind) {
    if(option == 102) {
      // window.open("http://unak.vip/uplus/qr_code/Template/signup/Weixin/Api/native_charge.php?uid=" + localStorage.getItem('uid') + "&amount=" + amount, "_system", "location=no");
      this.alertCtrl.create({
        title: "",
        message: "Doesn't provide the Weixin yet",
        buttons: ["确定"]
      }).present();
    } else {
      this.navCtrl.push(MyChargeOptionPage, {amount: amount, kind: kind, option: option})
    }
  }

}
