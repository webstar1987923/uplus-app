import { Component, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';
import { Slides } from 'ionic-angular';
import { Http } from '@angular/http';

declare let cordova;

@Component({
  selector: 'page-my-level',
  templateUrl: 'my-level.html',
})
export class MyLevelPage {
  @ViewChild(Slides) slides: Slides;
  
  serverUrl: any = "http://unak.vip/uplus/Api/mobile";

  uid: any;
  rank: any = 0;
  up_rank: any = 0;
  rank_name: string = "";
  level_up_url: any;
  bgs: Array<string> = ["bg1.jpg", "bg2.jpg", "bg3.jpg"];

  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer, public http: Http, public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    setTimeout(()=>{     
        this.slides.freeMode = true;
        this.slides.autoplay = 2000;
        this.slides.speed = 500;
        this.slides.loop = true;
        this.slides.autoplayDisableOnInteraction = false;
        this.slides.startAutoplay();     
    },1000);
  }

  ionViewWillLeave() {
    this.slides.stopAutoplay();
  }

  ionViewDidLoad() {
    this.uid = localStorage.getItem('uid');
    
    let postData = {      
      uid: localStorage.getItem('uid')      
    };

    this.http.post(this.serverUrl + "/get_member_level.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
    
      if(data.err == 0) {
        this.rank = data.rank;
        this.up_rank = data.rank;
        this.rank_name = data.rank_name;
      } else {
        // uid doesn't exist 
      }
    }, err => {    
    });

  }

  changeRank() {

  }

  pay(pay_type) {
    if (this.up_rank != this.rank) {
      let money = 0;
      
      switch (this.up_rank) {
        case '1': 
            money = 100;
            break;
        case '3': 
            money = 1000;
            break;
        case '5': 
            money = 10000;
            break;
        default:
            //default block statement;
      }

      if (pay_type == 1) {
        
        this.alertCtrl.create({
          title: "",
          message: "Doesn't provide the Weixin yet",
          buttons: ["确定"]
        }).present();

      } else {

        var postParam = {
          'pay_item': 'level_up',
          'uid': localStorage.getItem('uid'),
          'rank': this.up_rank,
          'price': money        
        };
  
        this.http.post(this.serverUrl + "/payment/alipay/order.php", JSON.stringify(postParam))    
        .map(res => res.json())
        .subscribe(data => {
          
            let payInfo = this.unescapeHTML(data.response);          
  
            cordova.plugins.alipay.payment(payInfo, (e) => {
              //TODO 支付成功
              this.alertCtrl.create({
                title: "警告",
                message: '支付成功',
                buttons: ["确定"]
              }).present();  
            }, (e) => {
              //TODO 支付失败                          
              this.alertCtrl.create({
                title: "警告",
                message: "支付失败" + e.resultStatus + "," + e.memo,
                buttons: ["确定"]
              }).present();  
            });       
          
        }, err => {
            this.alertCtrl.create({
              title: "警告",
              message: err,
              buttons: ["确定"]
            }).present();  
        });

      }
    } else {
      this.alertCtrl.create({
        title: "",
        message: "请选择等级",
        buttons: ["确定"]
      }).present();
    }
  }

  slideChanged(){   
    this.slides.startAutoplay();
  }

  unescapeHTML(a){
    let aNew = "" + a;
    
    return aNew.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
  } 
}
