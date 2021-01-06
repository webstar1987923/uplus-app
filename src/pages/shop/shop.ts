import { Component, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import { NavController, NavParams, App, LoadingController, AlertController, ActionSheetController } from 'ionic-angular';
import { ShopMoleItemViewPage } from '../shop-mole-item-view/shop-mole-item-view';
import { Http } from  '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  @ViewChild(Slides) slides1: Slides;

  serverUrl = "http://unak.vip/uplus/Api/mobile";
  shop_moles = [];
  diqu: any = "";
  page_num = 0;
  slides = [];
  provinces: any = [];
  cities: any = [];
  areas: any = [];

  s_province: any = "";
  s_city: any = "";
  s_area: any = "";

  searchFlag: any = false;
  isValid: any = true;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public app: App,
    public http: Http,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public actionSheet: ActionSheetController
    ) {
  }

  ionViewDidLoad() {
  }

  showCurrentMole(shopID, lat, lng) {
    this.app.getRootNav().push(ShopMoleItemViewPage, {shop_id: shopID, lat: lat, lng: lng});
  }

  gotoInternetShopMole() {
    this.alertCtrl.create({
      title: "警告",
      message: "网络商城正在建设中，敬请期待",
      buttons: ["确定"]
    }).present();
  }

  ionViewWillEnter() {
    setTimeout(()=>{
        this.slides1.freeMode = true;
        this.slides1.autoplay = 2000;
        this.slides1.speed = 500;
        this.slides1.loop = true;
        this.slides1.startAutoplay()
    },1000);

    this.isValid = true;
    this.searchFlag = false;

    for (let index = 1; index < 7; index++) {
      this.slides.push({
        id: index
      });      
    }
    this.page_num = 0;
    let postData = {
      action: 'get',
      uid: localStorage.getItem("uid"),
      nIdx: this.page_num
    };

    let loading = this.loadingCtrl.create();
    loading.present();

    this.http.post(this.serverUrl + "/shop_mole_list_get.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
        loading.dismiss();
        for (let index = 0; index < data.data.length; index++) {
          this.shop_moles.push(data.data[index]);          
        }
        this.shop_moles = data.data;
        this.diqu = data.diqu;
    }, err => {
      loading.dismiss();
    });
  }

  slideChanged(){
    // console.log("slide changed.");
    this.slides1.startAutoplay();
  }

  doInfinite(infiniteScroll) {
    this.page_num++;
    this.getMoleList(this.page_num, infiniteScroll);
  }

  getMoleList(nIdx, infiniteScroll) {
    let postData; 
    if(this.searchFlag) {
      postData = {
        action: 'search',
        uid: localStorage.getItem("uid"),
        nIdx: nIdx,
        sheng: this.s_province,
        shi: this.s_city,
        qu: this.s_area
      };
    } else {
      postData = {
        action: 'get',
        uid: localStorage.getItem("uid"),
        nIdx: nIdx
      };
    }

    this.http.post(this.serverUrl + "/shop_mole_list_get.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
        for (let index = 0; index < data.data.length; index++) {
          this.shop_moles.push(data.data[index]);          
        }
        infiniteScroll.complete();
      });
  }

  getProvinceData() {
    this.s_province = "";
    this.s_city = "";
    this.s_area = "";

    this.http.get("assets/json/dg_province.json")
    .map(res => res.json())
    .subscribe(data => {
      this.provinces = [];
      for (let index = 0; index < data.length; index++) {
        this.provinces.push(data[index]);
      }
      let provinceSheet = this.actionSheet.create({
        title: "省份",
        cssClass: "cus_height",
        buttons: [{
          text: "搜索",
          handler: () => {
            this.page_num = 0;
            this.searchData();
          }
        }]
      });
  
      for (let index = 0; index < this.provinces.length; index++) {
        var button= {
          text: this.provinces[index].province,
          handler: () => {
            this.s_province = this.provinces[index].provinceID;
            this.inputCityData();
          }
        }
        provinceSheet.addButton(button);
      }
  
      provinceSheet.present();
    });
  }

  getCityData() {
    this.http.get("assets/json/dg_city.json")
    .map(res => res.json())
    .subscribe(data => {
      this.cities = [];
      for (let index = 0; index < data.length; index++) {
        if(data[index].father == this.s_province) {
          this.cities.push(data[index]);
        }
      }
      let citySheet = this.actionSheet.create({
        title: "城市",
        cssClass: "cus_height",
        buttons: [{
          text: "搜索",
          handler: () => {
            this.searchData();
          }
        }]
      });
  
      for (let index = 0; index < this.cities.length; index++) {
        var button= {
          text: this.cities[index].city,
          handler: () => {
            this.s_city = this.cities[index].cityID;
            this.inputAreaData();
          }
        }
        citySheet.addButton(button);
      }
  
      citySheet.present();
    });
  }

  getAreaData() {
    this.http.get("assets/json/dg_area.json")
    .map(res => res.json())
    .subscribe(data => {
      this.areas = [];
      for (let index = 0; index < data.length; index++) {
        if(data[index].father == this.s_city) {
          this.areas.push(data[index]);
        }
      }
      let areaSheet = this.actionSheet.create({
        title: "地区",
        cssClass: "cus_height",
        buttons: [{
          text: "搜索",
          handler: () => {
            this.searchData();
          }
        }]
      });
  
      for (let index = 0; index < this.areas.length; index++) {
        var button= {
          text: this.areas[index].area,
          handler: () => {
            this.s_area = this.areas[index].areaID;
            this.searchData();
          }
        }
        areaSheet.addButton(button);
      }
  
      areaSheet.present();
    });
  }

  inputProvinceData() {
    this.getProvinceData();
  }

  inputCityData() {
    this.getCityData();
  }

  inputAreaData() {
    this.getAreaData();
  }

  searchData() {
    let tmp = JSON.parse(localStorage.getItem("infoData"));
    if(tmp.sheng == this.s_province) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
    this.searchFlag = true;
    this.page_num = 0;

    let postData = {
      action: 'search',
      uid: localStorage.getItem("uid"),
      nIdx: this.page_num,
      sheng: this.s_province,
      shi: this.s_city,
      qu: this.s_area
    };

    let loading = this.loadingCtrl.create();
    loading.present();

    this.http.post(this.serverUrl + "/shop_mole_list_get.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
        loading.dismiss();
        for (let index = 0; index < data.data.length; index++) {
          this.shop_moles.push(data.data[index]);          
        }
        this.shop_moles = data.data;
        this.diqu = data.diqu;
    }, err => {
      loading.dismiss();
    });
  }


}
