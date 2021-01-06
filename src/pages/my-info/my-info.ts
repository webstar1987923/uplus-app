import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController, Platform, LoadingController, Loading, AlertController } from 'ionic-angular';
import { MyInfoQrCodePage } from '../my-info-qr-code/my-info-qr-code';
import { MyInfoMorePage } from '../my-info-more/my-info-more';

import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserInfoModel } from '../../provider/userinfo-model';

/**
 * Generated class for the MyInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;


@Component({
  selector: 'page-my-info',
  templateUrl: 'my-info.html',
})
export class MyInfoPage {

  serverUrl: any = "http://unak.vip/uplus/Api/mobile";

  username: any = "";
  realname: any = "";
  photo: any = "";
  lastImage: string = null;
  loading: Loading;
  userModel: UserInfoModel;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public actionsheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public http: Http
    ) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    var userInfo = localStorage.getItem('infoData');
    if(userInfo) {
      var userData = JSON.parse(userInfo);
      this.username = userData.uid;
      this.realname = userData.realname;
      this.photo = userData.photo;
    }
  }

  gotoQrCode() {
    this.navCtrl.push(MyInfoQrCodePage);
  }

  gotoIntro() {
    this.navCtrl.push(MyInfoMorePage);
  }

  public presentActionSheet() {
    let actionSheet = this.actionsheetCtrl.create({
      title: '',
      buttons: [
        {
          text: '图片选择',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: '连接相机',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: '取消',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
  
    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    }, (err) => {
      // this.presentToast('Error while selecting image.');
    });
  }

  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }
   
  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      this.uploadImage();
    }, error => {
      // this.presentToast('Error while storing file.');
    });
  }
   
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
   
  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage() {
    // Destination URL
    var url = this.serverUrl + "/profile_img_upload.php";
  
    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);
  
    // File name only
    var filename = this.lastImage;
  
    var options = {
      fileKey: "file",
      fileName: filename,
      httpMethod: "POST",
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params : {'fileName': filename},
    };

    const fileTransfer: TransferObject = this.transfer.create();
  
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(data => {

      let postData = {
        action: 'uploaded',
        uid: localStorage.getItem('uid'),
        photo: filename.toString()
      };

      this.http.post(this.serverUrl + "/photo_upload.php", JSON.stringify(postData))
      .map(res => res.json())
      .subscribe(data => {
        this.loading.dismissAll();
        if(data.error == 1) {
          let tmp = localStorage.getItem('infoData');
          this.userModel = new UserInfoModel();
          this.userModel = JSON.parse(tmp);
          this.userModel.photo = data.photo;
          this.photo = data.photo;
          localStorage.setItem('infoData', JSON.stringify(this.userModel));
          this.presentToast("更改头像成功");
        } else {
          this.presentToast("更改头像失败");
        }
      }, err => {
        this.loading.dismissAll();
        this.presentToast("更改头像失败");
      });
      
    }, err => {
      this.loading.dismissAll()
      this.presentToast("更改头像失败");
    });
  }

  changeName() {
    this.alertCtrl.create({
      title: "我的姓名",
      inputs: [
        {
          name: 'field',
          placeholder: "我的姓名",
          type: "text",
          value: this.realname
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
            this.realname = data.field;
            let postData = {
              username: this.username,
              realname: this.realname,
              action: "change_name"
            };

            let loading = this.loadingCtrl.create();
            loading.present();

            this.http.post(this.serverUrl + "/change_name.php", JSON.stringify(postData))
            .map(res => res.json())
            .subscribe(data => {
              loading.dismiss();
              if(data.error == 1) {
                let tmp = localStorage.getItem('infoData');
                this.userModel = new UserInfoModel();
                this.userModel = JSON.parse(tmp);
                this.userModel.realname = this.realname;
                localStorage.setItem('infoData', JSON.stringify(this.userModel));
              }
            }, err => {
              loading.dismiss();
            });
          }
        }
      ]
    }).present();
  }
  
}
