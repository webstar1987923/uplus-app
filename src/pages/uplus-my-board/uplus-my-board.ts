import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { UserInfoModel } from '../../provider/userinfo-model';
import { Http } from '@angular/http';
import { Chart } from 'chart.js';

/**
 * Generated class for the UplusMyBoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-uplus-my-board',
  templateUrl: 'uplus-my-board.html',
})
export class UplusMyBoardPage {
  @ViewChild('lineCanvas') lineCanvas;

  serverUrl: string = "http://unak.vip/uplus/Api/mobile";
  userInfo: UserInfoModel;

  market: any = "";
  title: any = "";
  m_message: any = "";
  lineChart: any;
  requestValue: any = 0.00;
  n_uplus: any = 0.00;
  my_request: any = "";

  constructor(public navCtrl: NavController, 
    public http: Http,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UplusMyBoardPage');
  }

  ionViewWillEnter() {
    // let tmp = localStorage.getItem("infoData");
    // let userData = JSON.parse(tmp);
    // this.n_uplus = userData.n_uplus;

    this.market = this.navParams.get('market');
    this.title = "公司交易所";
    if(this.market.username) {
      this.title = this.market.title;
    }

    this.m_message = this.market.message;
    this.lineChartMethod();
    this.getOldRequest();
  }

  lineChartMethod() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
        datasets: [
          {
            label: '交易所',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 109, 230, 481, 562, 750, 800, 830, 950],
            spanGaps: false,
          }
        ]
      }
    });
  }

  getOldRequest() {
    let postParam = {
      action: 'get',
      uid: localStorage.getItem('uid'),
      mid: this.market.username
    }
    let loading = this.loadingCtrl.create();
    loading.present();

    this.http.post(this.serverUrl + "/covert_request_action.php", JSON.stringify(postParam))
    .map(res => res.json())
    .subscribe(data => {
      loading.dismiss();
      this.my_request = data.data;
      this.n_uplus = data.n_uplus;
      console.log(this.my_request);
    }, err => {
      loading.dismiss();
    });
  }

  rejectRequest(id) {
    let postParam = {
      action: 'del',
      id: id
    }
   
    this.http.post(this.serverUrl + "/covert_request_action.php", JSON.stringify(postParam))
    .map(res => res.json())
    .subscribe(data => {
      this.getOldRequest();
    }, err => {
    });
  }

  convertRequest() {
    let tmp = localStorage.getItem("infoData");
    let userData = JSON.parse(tmp);

    if(this.requestValue < 100) {
      this.alertCtrl.create({
        title: "警告",
        message: "请输入100钱途以上金额",
        buttons: ["确定"]
      }).present();
    } else if(parseFloat(this.requestValue) > parseFloat(userData.n_uplus)) {
      this.alertCtrl.create({
        title: "警告",
        message: "您自前无法申请提现",
        buttons: ["确定"]
      }).present();
    } else {
      let market_name = "company";
      if(this.market.username) {
        market_name = this.market.username;
      }
      let postParam = {
        uid: localStorage.getItem('uid'),
        market: market_name,
        amount: this.requestValue
      };

      let loading = this.loadingCtrl.create();
      loading.present();
      this.http.post(this.serverUrl + "/covert_request.php", JSON.stringify(postParam))
      .map(res => res.json())
      .subscribe(data => {
        loading.dismiss();
        switch (data.error) {
          case 1:
            this.alertCtrl.create({
              title: '警告',
              message: '成功！',
              buttons: ["确定"]
            }).present();
            let tmp = localStorage.getItem("infoData");
            let userData = JSON.parse(tmp);
            userData.n_uplus = userData.n_uplus - this.requestValue;
            if(market_name == 'company') {
              userData.price = userData.price + this.requestValue / 100 - this.requestValue / 100 * 0.15;
            } else {
              userData.price = userData.price + this.requestValue / 100 - this.requestValue / 100 * 0.1;
            }
            localStorage.setItem("infoData", JSON.stringify(userData));
            this.navCtrl.pop();
            break;
          case 0:
            this.alertCtrl.create({
              title: '警告',
              message: 'Another User logged',
              buttons: ["确定"]
            }).present();
            break;
        
          default:
            break;
        }
      }, err => {
        loading.dismiss();
      });
    }
  }
}
