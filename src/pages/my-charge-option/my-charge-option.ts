import { Component, Pipe, PipeTransform } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'safe' })


/**
 * Generated class for the MyChargeOptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-charge-option',
  templateUrl: 'my-charge-option.html',
})
export class MyChargeOptionPage implements PipeTransform{

  uid: any;
  charge_screen_url: any;

  amount: any;
  kind: any;
  option: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    this.amount = this.navParams.get('amount');
    this.kind = this.navParams.get('kind');
    this.option = this.navParams.get('option');

    this.uid = localStorage.getItem('uid');

    if(this.option == 101) {
      this.charge_screen_url = this.transform("http://unak.vip/uplus/qr_code/Template/signup/Alipay/n_alipay.php?uid=" + localStorage.getItem('uid') + "&kind=" + this.kind + "&amount=" + this.amount);
    }
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
