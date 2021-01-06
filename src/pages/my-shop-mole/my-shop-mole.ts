import { Component, Pipe, PipeTransform } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';
import { MyChargePage } from '../my-charge/my-charge';
import { UserInfoModel } from '../../provider/userinfo-model';

@Pipe({ name: 'safe' })

@Component({
  selector: 'page-my-shop-mole',
  templateUrl: 'my-shop-mole.html',
})
export class MyShopMolePage implements PipeTransform {

  uid: any;
  shop_mole_url: any;

  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public navParams: NavParams, 
    private sanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    this.uid = localStorage.getItem('uid');
    // this.shop_mole_url = this.transform("http://unak.vip/uplus/qr_code/Template/shop/shop_add.php?uid=" + localStorage.getItem('uid'));
    this.shop_mole_url = this.transform("http://unak.vip/uplus/qr_code/n_qr_mole_generate.php?data=" + localStorage.getItem('uid'));
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  changeMoleInfo() {
    let tmp = localStorage.getItem("infoData");
    let userData = new UserInfoModel();
    userData = JSON.parse(tmp);
    if(userData.level >= '5') {

    } else {
      this.alertCtrl.create({
        title: '警告',
        message: '注册商家需支付广告费用!',
        buttons: [
          {
            text: '确定',
            handler: data => {
              this.navCtrl.push(MyChargePage);
            }
          }
        ]
      }).present();
    }
  }
}
