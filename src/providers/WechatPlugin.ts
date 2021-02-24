import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { map } from 'rxjs/operators/map';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

declare var Wechat: any; 

export interface WechatPayParam {  
  partnerid: string;  
  prepayid: string;  
  noncestr: string;  
  timestamp: string;  
  sign: string;  
}  

@Injectable()
export class WechatPlugin {  

  public static isInstalled() {  
    return new Promise((resolve, reject) => {  
      Wechat.isInstalled(result => {  
        resolve(result);  
      }, error => {  
        reject(error);  
      });  
    });  
  }  

  public static sendPaymentRequest(params: WechatPayParam) {  
    return new Promise((resolve, reject) => {  
      Wechat.sendPaymentRequest(params, result => {  
        resolve(result);  
      }, error => {  
        reject(error);  
      });  
    });  
  }  
} 