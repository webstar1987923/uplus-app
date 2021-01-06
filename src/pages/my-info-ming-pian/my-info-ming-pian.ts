import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the MyInfoMingPianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-my-info-ming-pian',
  templateUrl: 'my-info-ming-pian.html',
})
export class MyInfoMingPianPage {

  serverUrl = "http://unak.vip/uplus/Api/mobile";

  company: any = "";
  job_cate: any = "";
  other_cate: any = "";
  other_cate_arr = [];
  job_desc: any = "";
  mobile1: any = "";
  mobile2: any = "";
  mobile3: any = "";
  phone1: any = "";
  phone2: any = "";
  phone3: any = "";
  c_address: any = "";
  email: any = "";
  homepage: any = "";
  clicked_other = 0;

  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public http: Http,
    public navParams: NavParams
    ) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    this.clicked_other = 0;

    let postParam = {
      uid: localStorage.getItem('uid'),
      action: 'get'
    }

    let loading = this.loadingCtrl.create();
    loading.present();

    this.http.post(this.serverUrl + "/get_comp_info.php", JSON.stringify(postParam))
    .map(res => res.json())
    .subscribe(data => {
      loading.dismiss();
      if(data.error == 1) {
        this.company = data.data.c_name;
        this.job_cate = data.data.job_cate;
        this.other_cate = data.data.other_cate;
        let cate_tmp = this.other_cate.split("--");
        if(cate_tmp.length == 0) {
          this.other_cate_arr[0] = "";
        } else {
          this.other_cate_arr = cate_tmp;
          if(this.other_cate_arr[this.other_cate_arr.length - 1] != "") {
            this.other_cate_arr[this.other_cate_arr.length] = "";
          }
        }
        this.job_desc = data.data.job_desc;
        this.mobile1 = data.data.mobile1;
        this.mobile2 = data.data.mobile2;
        this.mobile3 = data.data.mobile3;
        this.phone1 = data.data.phone1;
        this.phone2 = data.data.phone2;
        this.phone3 = data.data.phone3;
        this.c_address = data.data.c_address;
        this.email = data.data.email;
        this.homepage = data.data.homepage;
      }
    }, err => {
      loading.dismiss();
    });
  }

  saveChanged() {
    let postData = {
      action: 'save',
      uid: localStorage.getItem('uid'),
      c_name: this.company,
      job_cate: this.job_cate,
      other_cate: this.other_cate,
      job_desc: this.job_desc,
      mobile1: this.mobile1,
      mobile2: this.mobile2,
      mobile3: this.mobile3,
      phone1: this.phone1,
      phone2: this.phone2,
      phone3: this.phone3,
      c_address: this.c_address,
      email: this.email,
      homepage: this.homepage,
    };

    let loading = this.loadingCtrl.create();
    loading.present();

    this.http.post(this.serverUrl + "/get_comp_info.php", JSON.stringify(postData))
    .map(res => res.json())
    .subscribe(data => {
      loading.dismiss();
    }, err => {
      loading.dismiss();
    });
  }

  changeCompany() {
    this.changeField("company", "单位名称", "text");
  }
  changeJobCate() {
    this.changeField("job_cate", "职务", "text");
  }
  changeOtherCate(param) {
    this.clicked_other = param;
    this.changeField("other_cate", "其他社会职务" + (param + 1), "text");
  }
  changeMobile(nIdx) {
    this.changeField("mobile" + nIdx, "手机号码" + nIdx, "phone");
  }
  changePhone(nIdx) {
    this.changeField("phone" + nIdx, "电话号码" + nIdx, "phone");
  }
  changeCAddress() {
    this.changeField("c_address", "地址", "text");
  }
  changeEmail() {
    this.changeField("email", "邮箱", "email");
  }
  changeHomepage() {
    this.changeField("homepage", "网址", "text");
  }

  changeField(field, alertTitle, type) {
    let fieldValue = "";
    switch (field) {
      case "company":
        fieldValue = this.company;
        break;
      case "job_cate":
        fieldValue = this.job_cate;
        break;
      case "other_cate":
        fieldValue = this.other_cate_arr[this.clicked_other];
        break;
      case "mobile1":
        fieldValue = this.mobile1;
        break;
      case "mobile2":
        fieldValue = this.mobile2;
        break;
      case "mobile3":
        fieldValue = this.mobile3;
        break;
      case "phone1":
        fieldValue = this.phone1;
        break;
      case "phone2":
        fieldValue = this.phone2;
        break;
      case "phone3":
        fieldValue = this.phone3;
        break;
      case "c_address":
        fieldValue = this.c_address;
        break;
      case "email":
        fieldValue = this.email;
        break;
      case "homepage":
        fieldValue = this.homepage;
        break;
      default:
        break;
    }
    this.alertCtrl.create({
      title: alertTitle,
      inputs: [
        {
          name: 'field',
          placeholder: alertTitle,
          type: type,
          value: fieldValue
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
            fieldValue = data.field;
            switch (field) {
              case "company":
                this.company = fieldValue;
                break;
              case "job_cate":
                this.job_cate = fieldValue;
                break;
              case "other_cate":
                if(fieldValue) {
                  this.other_cate_arr[this.clicked_other] = fieldValue;
                  this.clicked_other++;
                  if(this.clicked_other >= this.other_cate_arr.length) {
                    this.other_cate_arr[this.clicked_other] = "";
                  }
                } else {
                  if(this.other_cate_arr.length != 1) {
                    this.other_cate_arr.splice(this.clicked_other, 1);
                  } else {
                    this.other_cate_arr[this.clicked_other] = "";
                  }
                }
                this.other_cate = this.other_cate_arr[0];
                for(let a = 1; a < this.other_cate_arr.length; a++) {
                  if(this.other_cate_arr[a]) {
                    this.other_cate += "--" + this.other_cate_arr[a];
                  }
                }
                break;
              case "job_desc":
                this.job_desc = fieldValue;
                break;
              case "mobile1":
                this.mobile1 = fieldValue;
                break;
              case "mobile2":
                this.mobile2 = fieldValue;
                break;
              case "mobile3":
                this.mobile3 = fieldValue;
                break;
              case "phone1":
                this.phone1 = fieldValue;
                break;
              case "phone2":
                this.phone2 = fieldValue;
                break;
              case "phone3":
                this.phone3 = fieldValue;
                break;
              case "c_address":
                this.c_address = fieldValue;
                break;
              case "email":
                this.email = fieldValue;
                break;
              case "homepage":
                this.homepage = fieldValue;
                break;
            
              default:
                break;
            }
          }
        }
      ]
    }).present();

  }

}
