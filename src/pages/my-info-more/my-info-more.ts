import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserInfoModel } from '../../provider/userinfo-model';
import { MyMingPianPage } from '../my-ming-pian/my-ming-pian';

/**
 * Generated class for the MyInfoMorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-my-info-more',
  templateUrl: 'my-info-more.html',
})
export class MyInfoMorePage {

  serverUrl = "http://unak.vip/uplus/Api/mobile";

  phone: any;
  day: any;
  month: any;
  year: any;
  province: any;
  city: any;
  area: any;
  address: any;
  sheng: any;
  shi: any;
  qu: any;
  sex: any;

  tmpMonth: any;
  tmpDay: any;
  tmpYear: any;

  userModel: UserInfoModel;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public http: Http
    ) {
      this.tmpDay = [{value: '01'}, {value: '02'}, {value: '03'}, {value: '04'}, {value: '05'}, 
      {value: '06'}, {value: '07'}, {value: '08'}, {value: '09'}, {value: '10'}, {value: '11'}, 
      {value: '12'}, {value: '13'}, {value: '14'}, {value: '15'}, {value: '16'}, {value: '17'}, 
      {value: '18'}, {value: '19'}, {value: '20'}, {value: '21'}, {value: '22'}, {value: '23'}, 
      {value: '24'}, {value: '25'}, {value: '26'}, {value: '27'}, {value: '28'}, {value: '29'}, 
      {value: '30'}, {value: '31'}];

      this.tmpMonth = [
        {value: '01'},
        {value: '02'},
        {value: '03'},
        {value: '04'},
        {value: '05'},
        {value: '06'},
        {value: '07'},
        {value: '08'},
        {value: '09'},
        {value: '10'},
        {value: '11'},
        {value: '12'}
      ]
      this.tmpYear = [];
      for (let index = 1910; index <= 2020; index++) {
        this.tmpYear.push({value: index});
      }
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    let tmp = localStorage.getItem('infoData');
    let tmpData = JSON.parse(tmp);
    this.phone = tmpData.mobile;
    this.address = tmpData.address;
    this.province = tmpData.province;
    this.city = tmpData.city;
    this.area = tmpData.area;
    this.sheng = tmpData.sheng;
    this.shi = tmpData.shi;
    this.qu = tmpData.qu;
    this.sex = tmpData.sex;
    let tmp_birth = tmpData.birth.split(".");
    this.year = tmp_birth[0];

    if(tmp_birth[1]) {
      this.month = tmp_birth[1];
    }
    if(tmp_birth[2]) {
      this.day = tmp_birth[2];
    }
  }

  changeMobile() {
    this.alertCtrl.create({
      title:"手机号码",
      inputs: [
        {
          name: 'mobile',
          placeholder: '手机号码',
          type: 'number',
          value: this.phone
        },
      ],
      buttons:[
        {
          text: '取消',
          handler: data => {

          }
        },
        {
          text: '确定',
          handler: data => {
            this.phone = data.mobile;
          }
        }
      ]
    }).present();
  }

  changeProvince() {
    console.log('currently province can not be changed');
  }

  changeAddress() {
    this.alertCtrl.create({
      title:"地址",
      inputs: [
        {
          name: 'address',
          placeholder: '地址',
          type: 'text',
          value: this.address
        },
      ],
      buttons:[
        {
          text: '取消',
          handler: data => {

          }
        },
        {
          text: '确定',
          handler: data => {
            this.address = data.address;
          }
        }
      ]
    }).present();
  }

  saveChanged() {
    if(this.year == null || this.month == null || this.day == null) {
      this.customAlert("警告", "请输入您的生年日期");
    } else {
      let loading = this.loadingCtrl.create();
      loading.present();
  
      let postData = {
        action: 'save',
        uid: localStorage.getItem('uid'),
        mobile: this.phone,
        birth: this.year + "." + this.month + "." + this.day,
        sex: this.sex,
        address: this.address,
      };
  
      this.http.post(this.serverUrl + "/saveinfo.php", JSON.stringify(postData))
      .map(res => res.json())
      .subscribe(data => {
        loading.dismiss();
        if(data.error == 1) {
          let tmp = localStorage.getItem('infoData');
          this.userModel = new UserInfoModel();
          this.userModel = JSON.parse(tmp);
          this.userModel.mobile = this.phone;
          this.userModel.sex = this.sex;
          this.userModel.birth = this.year + "." + this.month + "." + this.day;
          this.userModel.address = this.address;
          localStorage.setItem('infoData', JSON.stringify(this.userModel));
        } else {
          this.customAlert('警告', '网络失败!');
        }
      }, err => {
        loading.dismiss();
      });
    }
  }

  customAlert(title, message) {
    this.alertCtrl.create({
      title: title,
      message: message,
      buttons: ["确定"]
    }).present();
  }

  changeMingPianInform() {
    this.navCtrl.push(MyMingPianPage);
  }

}
