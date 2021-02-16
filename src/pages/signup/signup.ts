import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ActionSheetController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SaveUserNameProvider } from '../../providers/save-user-name/save-user-name';
import { takeUntil } from 'rxjs/operator/takeUntil';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  serverUrl: any = "http://unak.vip/uplus/Api/mobile";
  sms_btn_caption: any = "获取验证码";
  sms_timer_hasStarted : Boolean = false;
  sms_secondsRemaining : Number = 15;

  realname: String = "";
  mobile: string = "";
  sms: string = "";
  pwd: String = "";
  repwd: String = "";
  tjrname: String = "";
  diqu: String = "";

  provinces: any = [];
  cities: any = [];
  areas: any = [];

  s_provinceID: any = "";
  s_cityID: any = "";
  s_areaID: any = "";

  s_province: any = "";
  s_city: any = "";
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public saveIDProvider: SaveUserNameProvider,
    public actionSheet: ActionSheetController
    ) {
  }

  ionViewDidLoad() {
    navigator.geolocation.getCurrentPosition(pos => {
    });
  }

  ionViewWillEnter() {
 

  }

  sendSMS() {
    if (this.sms_timer_hasStarted) 
      return;
    
    //call sms service
    var postParam = {        
      'mobile': this.mobile        
    };
      
    this.http.post(this.serverUrl + "/send_sms.php", JSON.stringify(postParam))
    .map(res => res.json())
    .subscribe(data => {
      
    }, err => {
      
    });

    this.sms_timer_hasStarted = true;    
    this.timerTick();
  }

  timerTick() {
    setTimeout(() => {        
        this.sms_secondsRemaining--;
        this.sms_btn_caption = this.sms_secondsRemaining;
        if (this.sms_secondsRemaining > 0) {
            this.timerTick();
        }
        else {
            this.sms_timer_hasStarted = false;
            this.sms_secondsRemaining = 15;
            this.sms_btn_caption = "获取验证码";
        }
    }, 1000);
  }

  signup() {
    if (this.sms_secondsRemaining == 15) {
      this.alertCtrl.create({
        title: "警告",
        message: "超过了短信代码的有效时间",
        buttons: ["确定"]
      }).present();
      return;
    }      

    if (this.pwd.trim() !="" && this.pwd != this.repwd ) {
      this.alertCtrl.create({
        title: "警告",
        message: "密码不一致",
        buttons: ["确定"]
      }).present();
    } else {
      if (this.realname.trim() != "" && this.pwd.trim() != "") {        
        var postParam = {
          'realname': this.realname,
          'pwd': this.pwd,
          'mobile': this.mobile,
          'sms': this.sms,
          'tjrname': this.tjrname,
          'diqu': this.diqu,
          'province': this.s_provinceID,
          'city': this.s_cityID,
          'area': this.s_areaID,
          'action': 'reg'
        };
        const loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.serverUrl + "/signup.php", JSON.stringify(postParam))
        .map(res => res.json())
        .subscribe(data => {
          loading.dismiss();
          switch (data.error) {
            case 1:    
                this.alertCtrl.create({
                  title: "成功",
                  message: "您的会员编号是"+data.uid,
                  buttons: [ {
                                text: '确定',
                                handler: () => {
                                  this.navCtrl.pop();
                                }
                              }
                            ]
                }).present();         
              
              // this.saveIDProvider.saveUID({"userID": data.uid}).then( result => {
              //   this.navCtrl.setRoot(HomePage);
              // })
              // .catch( err => {
              // });
              break;
            case 2:
              this.alertCtrl.create({
                title: "警告",
                message: data.message,
                buttons: ["确定"]
              }).present();
              break;           
            default:
              break;
          }
        }, err => {
          loading.dismiss();
        });
      } else {
        this.alertCtrl.create({
          title: "警告",
          message: "请输入会员帐号和密码。",
          buttons: ["确定"]
        }).present();
      }
    }
  }
  
  getProvinceData() {
    this.s_province = "";
    this.s_city = "";
    
    this.http.get("assets/json/dg_province.json")
    .map(res => res.json())
    .subscribe(data => {
      this.provinces = [];
      for (let index = 0; index < data.length; index++) {
        this.provinces.push(data[index]);
      }
      let provinceSheet = this.actionSheet.create({
        title: "省份",
        cssClass: "cus_height"              
      });
  
      for (let index = 0; index < this.provinces.length; index++) {
        var button= {
          text: this.provinces[index].province,
          handler: () => {
            this.s_provinceID = this.provinces[index].provinceID;
            this.s_province = this.provinces[index].province;
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
        if(data[index].father == this.s_provinceID) {
          this.cities.push(data[index]);
        }
      }
      let citySheet = this.actionSheet.create({
        title: "城市",
        cssClass: "cus_height",
        buttons: [{
          text: "---",
          handler: () => {
            this.diqu = this.s_province;
          }
        }]      
      });
  
      for (let index = 0; index < this.cities.length; index++) {
        var button= {
          text: this.cities[index].city,
          handler: () => {
            this.s_cityID = this.cities[index].cityID;
            this.s_city = this.cities[index].city;
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
        if(data[index].father == this.s_cityID) {
          this.areas.push(data[index]);
        }
      }
      let areaSheet = this.actionSheet.create({
        title: "地区",
        cssClass: "cus_height"       
      });
  
      for (let index = 0; index < this.areas.length; index++) {
        var button= {
          text: this.areas[index].area,
          handler: () => {
            this.s_areaID = this.areas[index].areaID;
                        
            this.diqu = this.s_province + "/" + this.s_city + "/" + this.areas[index].area;
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

}
