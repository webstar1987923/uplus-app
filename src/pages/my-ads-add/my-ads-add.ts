import { Component, Pipe, PipeTransform } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'safe' })

@Component({
  selector: 'page-my-ads-add',
  templateUrl: 'my-ads-add.html',
})
export class MyAdsAddPage  implements PipeTransform {

  uid: any;
  ads_add_url: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    this.uid = localStorage.getItem('uid');
    this.ads_add_url = this.transform("http://unak.vip/uplus/qr_code/Template/ads/ads_add.php?uid=" + localStorage.getItem('uid'));
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
