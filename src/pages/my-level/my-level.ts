import { Component, Pipe, PipeTransform } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'safe' })

@Component({
  selector: 'page-my-level',
  templateUrl: 'my-level.html',
})
export class MyLevelPage implements PipeTransform {

  uid: any;
  level_up_url: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    this.uid = localStorage.getItem('uid');
    this.level_up_url = this.transform("http://unak.vip/uplus/qr_code/Template/level/level_up.php?uid=" + this.uid);
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
