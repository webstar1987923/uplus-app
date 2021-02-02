import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ActionSheetController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AdsItemDetailPage } from '../ads-item-detail/ads-item-detail';

@Component({
  selector: 'page-ads-list',
  templateUrl: 'ads-list.html',
})
export class AdsListPage {

  uid: any;
  serverUrl = "http://unak.vip/uplus/Api";
  ads_list = [];
  total = 0;
  
  provinces: any = [];
  cities: any = [];  
  page_num = 0;

  s_province: any = "";
  s_city: any = "";  
  diqu: any = "";

  searchFlag: any = false;
  isValid: any = true;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public actionSheet: ActionSheetController
    ) {
  }

  ionViewDidLoad() {
    this.uid = localStorage.getItem('uid');
  }

  ionViewWillEnter() {
    let postData = {
      action: 'get',
      uid: localStorage.getItem("uid"),
      province: localStorage.getItem("province"),
      city: localStorage.getItem("city"),
      loc_type: 'str'
    };
   
    this.diqu = localStorage.getItem("province") + "/" + localStorage.getItem("city");

    let loading = this.loadingCtrl.create();
    loading.present();

    this.http.post(this.serverUrl + "/adsmanage.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
        loading.dismiss();

        this.s_province = data.provinceID;
        this.s_city = data.cityID;

        this.ads_list = [];
        for (let index = 0; index < data.highlight.length; index++) {
          this.ads_list.push(data.highlight[index]);  
          this.total = data.total;        
        }
    }, err => {
      loading.dismiss();
    });
  }

  itemDetail(index) {    
    this.navCtrl.push(AdsItemDetailPage, {items: this.ads_list, index: index});
  }

  //dialog

  inputProvinceData() {
    this.getProvinceData();
  } 

  inputCityData() {
    this.getCityData();
  }

  getProvinceData() {
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
            /*this.page_num = 0;
            this.searchData();*/
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
            this.searchData();
          }
        }
        citySheet.addButton(button);
      }
  
      citySheet.present();
    });
  }

  searchData() {
    let postData = {
      action: 'get',
      uid: localStorage.getItem("uid"),
      province: this.s_province,
      city: this.s_city,
      loc_type: 'number'
    };    

    let loading = this.loadingCtrl.create();
    loading.present();

    this.http.post(this.serverUrl + "/adsmanage.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
        loading.dismiss();    

        this.diqu = data.diqu;

        this.ads_list = [];
        for (let index = 0; index < data.highlight.length; index++) {
          this.ads_list.push(data.highlight[index]);  
          this.total = data.total;        
        }
    }, err => {
      loading.dismiss();
    });
  }
}
