import { Component, Pipe, PipeTransform } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';
import { AdsListPage } from '../ads-list/ads-list';

@Pipe({ name: 'safe' })
@Component({
  selector: 'page-ads-detail',
  templateUrl: 'ads-detail.html',
})
export class AdsDetailPage implements PipeTransform{

  uid: any;
  uplus_site_url: any;

  adsIdx: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {
    this.adsIdx = Array();
    for (let index = 0; index < 22; index++) {
      this.adsIdx[index] = index + 1;
      
    }
  }

  ionViewDidLoad() {
    this.uid = localStorage.getItem('uid');
    this.uplus_site_url = this.transform("http://unak.vip/qiantu");
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  showAdsList() {
    this.navCtrl.push(AdsListPage);
  }
}
