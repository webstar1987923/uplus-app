import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';

import { MyWalletPricePage } from '../my-wallet-price/my-wallet-price';
import { MyWalletShopPage } from  '../my-wallet-shop/my-wallet-shop';
import { MyWalletUplusPage } from '../my-wallet-uplus/my-wallet-uplus';
import { MyWalletCoinPage } from '../my-wallet-coin/my-wallet-coin';
import { MyWalletChargePage } from '../my-wallet-charge/my-wallet-charge';

/**
 * Generated class for the MyWalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-my-wallet',
  templateUrl: 'my-wallet.html',
})
export class MyWalletPage {

  @ViewChild('myTabs') tabRef: Tabs;

  tab1 = MyWalletCoinPage;
  tab2 = MyWalletPricePage;
  tab3 = MyWalletUplusPage;
  // tab4 = MyWalletShopPage;
  tab4 = MyWalletChargePage;

  rank: any = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    let tmp = JSON.parse(localStorage.getItem("infoData"));
    this.rank = tmp.level;
  }

}
