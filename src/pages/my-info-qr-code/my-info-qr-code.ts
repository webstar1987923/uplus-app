import { Component, Pipe, PipeTransform } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'safe' })

@Component({
  selector: 'page-my-info-qr-code',
  templateUrl: 'my-info-qr-code.html',
})
export class MyInfoQrCodePage implements PipeTransform {

  uid: any;
  qr_code_url: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private sanitizer: DomSanitizer
    ) {
  }

  ionViewDidLoad() {
    this.uid = localStorage.getItem('uid');
    // this.qr_code_url = this.transform("http://unak.vip/uplus/qr_code/qr_generate_page.php?data=" + this.uid);
    this.qr_code_url = this.transform("http://unak.vip/uplus/qr_code/n_qr_generate.php?data=" + this.uid);
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
