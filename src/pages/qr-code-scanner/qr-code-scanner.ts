import { Component, Pipe, PipeTransform } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { ShopPayScreenPage } from '../shop-pay-screen/shop-pay-screen';
// import { DomSanitizer} from '@angular/platform-browser';

/**
 * Generated class for the QrCodeScannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @Pipe({ name: 'safe' })

@Component({
  selector: 'page-qr-code-scanner',
  templateUrl: 'qr-code-scanner.html',
})
// export class QrCodeScannerPage implements PipeTransform {
export class QrCodeScannerPage {

  data = {};
  option: BarcodeScannerOptions;
  qr_data: any = "";

  constructor(public navCtrl: NavController, 
    private barcodeScanner: BarcodeScanner,
    // private sanitizer: DomSanitizer,
    public alertCtrl: AlertController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    console.log('qr code scanner working...');
    this.option = {
      prompt: ""
    };
    
    this.barcodeScanner.scan(this.option).then(barcodeData => {
      this.data = barcodeData;
      this.qr_data = barcodeData.text;

    // this.qr_data = "uplus_dGVzdA==";

      var tmp = this.qr_data.split("_");
      var prefix = tmp[0];
      var c_data = tmp[1];
      if(prefix == 'uplus') {
        this.navCtrl.push(ShopPayScreenPage, {data: c_data});
      } else {
        this.alertCtrl.create({
          title: "警告",
          message: "无法识别二维码",
          buttons: [
            {
              text: '确定',
              handler: data => {
                this.navCtrl.pop();
              }
            }
          ]
        }).present();
      }
     }).catch(err => {
       console.log(err);
     });
  }

  // transform(url) {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(url + "&buyer=" + localStorage.getItem("uid"));
  // }
}
