import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, PopoverController, App } from 'ionic-angular';
import { Slides } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NormallPopoverComponent } from '../../components/normall-popover/normall-popover';
import { HelpSupportPage } from '../help-support/help-support';
import { MyContactFindPage } from '../my-contact-find/my-contact-find';
import { AdsDetailPage } from '../ads-detail/ads-detail';
import { QrCodeScannerPage } from '../qr-code-scanner/qr-code-scanner';

/**
 * Generated class for the AdsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ads',
  templateUrl: 'ads.html',
})
export class AdsPage {
  @ViewChild(Slides) slides: Slides;

  serverUrl : string = "http://unak.vip/uplus/Api/mobile";
  top: string = "";
  center: string = "";
  bottom: string = "";
  flag: string = ""; 
  slide: string = ""; 
  // color: string = "#ff9000";
  color: string = "#666fb2";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public popoverCtrl: PopoverController,
    public app: App
    ) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    let postData = {
      uid: localStorage.getItem('uid')
    };

    this.http.post(this.serverUrl + "/get_n_ads.php" ,  JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
      if(data.error == 1) {
        this.flag = data.error;
        this.top = data.top;
        this.center = data.center;
        this.bottom = data.bottom;
        this.color = data.color;
        this.slide = data.slide;
        if(this.slide == '1') {
          setTimeout(()=>{
            if(this.center && this.center.length > 0){
              this.slides.freeMode = true;
              this.slides.autoplay = 2000;
              this.slides.speed = 500;
              this.slides.loop = true;
              this.slides.startAutoplay()
            }
          },1000);
        }
      } else {
        this.top = "";
        this.center = "";
        this.bottom = "";
        this.flag = "";
        this.slide = "";
        this.color = "#ff9000";
      }
    });
  }
  
  slideChanged(){
    // console.log("slide changed.");
    this.slides.startAutoplay();
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
            case 'help':
                this.app.getRootNav().push(HelpSupportPage);
                break;
        
            default:
                break;
        }
    });
  }

  gotoDetailPage() {
    this.app.getRootNav().push(AdsDetailPage);
  }

}
