import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { MapOptions, BMarker, Point, MarkerOptions } from 'angular2-baidu-map'
/**
 * Generated class for the ShopMoleItemViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-shop-mole-item-view',
  templateUrl: 'shop-mole-item-view.html',
})
export class ShopMoleItemViewPage {

  serverUrl = "http://unak.vip/uplus/Api/mobile";
  mole_data: any = "";
  realname: any = "";
  mobile: any = "";
  diqu: any = "";

  options: MapOptions;
  public markers: Array<{ point: Point; options?: MarkerOptions}>

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
    ) {
      this.options = {
        centerAndZoom: {
          lat: this.navParams.get("lat"),
          lng: this.navParams.get("lng"),
          zoom: 14
        },
        enableKeyboard: true
      }
      this.markers = [
        {
          point: {
            lat: this.navParams.get("lat"),
            lng: this.navParams.get("lng"),
          }
        }
      ]
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    let shopID = this.navParams.get("shop_id");
    let postData = {
      action: 'get',
      shop_id: shopID
    };

    let loading = this.loadingCtrl.create();
    loading.present();

    this.http.post(this.serverUrl + "/shop_mole_item_get.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
        loading.dismiss();
        this.mole_data = data.mole;
        this.realname = data.realname;
        this.mobile = data.mobile;
        this.diqu = data.diqu;      

        // this.options = {
        //   centerAndZoom: {
        //     lat: this.mole_data.lat,
        //     lng: this.mole_data.lng,
        //     zoom: 16
        //   },
        //   enableKeyboard: true
        // }
    }, err => {
      loading.dismiss();
    });
  }

}
