import { Component, Pipe, PipeTransform } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'safe' })

@Component({
  selector: 'page-new-version',
  templateUrl: 'new-version.html',
})
export class NewVersionPage {

  uid: any;
  new_version_url: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    this.new_version_url = this.transform("http://unak.vip/uplus/qr_code/Template/download");
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
