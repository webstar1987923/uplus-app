import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { Shake } from '@ionic-native/shake';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { HomePage } from '../pages/home/home';

import { AdsPage } from '../pages/ads/ads';
import { AdsDetailPage } from '../pages/ads-detail/ads-detail';

import { MyPage } from '../pages/my/my';
import { MyInfoPage } from '../pages/my-info/my-info';
import { MyLevelPage } from '../pages/my-level/my-level';
import { MyAdvertisePage } from '../pages/my-advertise/my-advertise';
import { MyAdsAddPage } from '../pages/my-ads-add/my-ads-add';
import { MyAdsItemViewPage } from '../pages/my-ads-item-view/my-ads-item-view';
import { MyShopMolePage } from '../pages/my-shop-mole/my-shop-mole';
import { MyContactListPage } from '../pages/my-contact-list/my-contact-list';
import { MyFriendInfoPage } from '../pages/my-friend-info/my-friend-info';
import { MyContactFindPage } from '../pages/my-contact-find/my-contact-find';
import { MyInfoMingPianPage } from '../pages/my-info-ming-pian/my-info-ming-pian';
import { MyMingPianPage } from '../pages/my-ming-pian/my-ming-pian';

import { MyWalletPage } from '../pages/my-wallet/my-wallet';
import { MyWalletCoinPage } from '../pages/my-wallet-coin/my-wallet-coin';
import { MyWalletPricePage } from '../pages/my-wallet-price/my-wallet-price';
import { MyWalletUplusPage } from '../pages/my-wallet-uplus/my-wallet-uplus';
import { MyWalletShopPage } from '../pages/my-wallet-shop/my-wallet-shop';
import { MyWalletOutpuPage } from '../pages/my-wallet-outpu/my-wallet-outpu';
import { MyWalletUplusOutPage } from '../pages/my-wallet-uplus-out/my-wallet-uplus-out';
import { MyChargePage } from '../pages/my-charge/my-charge';
import { MyWalletChargePage } from '../pages/my-wallet-charge/my-wallet-charge';

import { ShopPage } from '../pages/shop/shop';
import { ShopMoleItemViewPage } from '../pages/shop-mole-item-view/shop-mole-item-view';
import { ShopPayScreenPage } from '../pages/shop-pay-screen/shop-pay-screen';

import { SettingPage } from '../pages/setting/setting';
import { SettingChangePasswordPage } from '../pages/setting-change-password/setting-change-password';
import { SettingChangePayPasswordPage } from '../pages/setting-change-pay-password/setting-change-pay-password';
import { SettingPayOptionPage } from '../pages/setting-pay-option/setting-pay-option';
import { MyInfoMorePage } from '../pages/my-info-more/my-info-more';
import { MyInfoQrCodePage } from '../pages/my-info-qr-code/my-info-qr-code';

import { HelpSupportPage } from '../pages/help-support/help-support';
import { NewTicketPage } from '../pages/new-ticket/new-ticket';
import { HelpSupportItemViewPage } from '../pages/help-support-item-view/help-support-item-view';

import { NormallPopoverComponent } from '../components/normall-popover/normall-popover';
import { ContactPopoverComponent } from '../components/contact-popover/contact-popover';
import { SaveUserNameProvider } from '../providers/save-user-name/save-user-name';

import { CallNumber } from '@ionic-native/call-number';
import { BaiduMapModule } from 'angular2-baidu-map';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { QrCodeScannerPage } from '../pages/qr-code-scanner/qr-code-scanner';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { ForgotPasswordChangePage } from '../pages/forgot-password-change/forgot-password-change';

import { UplusSellBoardPage } from '../pages/uplus-sell-board/uplus-sell-board';
import { UplusMyBoardPage } from '../pages/uplus-my-board/uplus-my-board';

import { ChatPage } from '../pages/chat/chat';

import { EmojiProvider } from '../providers/emoji';
import { ChatService } from "../providers/chat-service";
import { WechatPlugin } from "../providers/WechatPlugin";
import { EmojiPickerComponentModule } from "../components/emoji-picker/emoji-picker.module";
import { HttpClientModule } from "@angular/common/http";
import { RelativeTime } from "../pipes/relative-time";
import { NewVersionPage } from '../pages/new-version/new-version';
import { AdsListPage } from '../pages/ads-list/ads-list';
import { AdsItemDetailPage } from '../pages/ads-item-detail/ads-item-detail';
import { MyWalletCoinOutPage } from '../pages/my-wallet-coin-out/my-wallet-coin-out';
import { MyMarketInfoPage } from '../pages/my-market-info/my-market-info';
import { UplusHistoryBoardPage } from '../pages/uplus-history-board/uplus-history-board';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    ChatPage,
    HomePage,
    AdsPage,
    AdsDetailPage,
    AdsListPage,
    AdsItemDetailPage,
    MyPage,
    MyInfoPage,
    MyInfoMorePage,
    MyInfoQrCodePage,
    MyLevelPage,
    MyAdvertisePage,
    MyAdsAddPage,
    MyAdsItemViewPage,
    MyShopMolePage,
    MyContactListPage,
    MyFriendInfoPage,
    MyContactFindPage,
    MyInfoMingPianPage,
    MyMingPianPage,
    MyWalletPage,
    MyWalletCoinPage,
    MyWalletCoinOutPage,
    MyWalletPricePage,
    MyWalletUplusPage,
    MyWalletShopPage,
    MyWalletOutpuPage,
    MyWalletUplusOutPage,
    MyWalletChargePage,
    MyMarketInfoPage,
    MyChargePage,    
    ShopPage,
    ShopPayScreenPage,
    ShopMoleItemViewPage,
    SettingPage,
    SettingChangePasswordPage,
    SettingChangePayPasswordPage,
    SettingPayOptionPage,
    HelpSupportPage,
    NewTicketPage,
    HelpSupportItemViewPage,
    NormallPopoverComponent,
    ContactPopoverComponent,
    QrCodeScannerPage,
    ForgotPasswordPage,
    ForgotPasswordChangePage,
    UplusSellBoardPage,
    UplusMyBoardPage,
    RelativeTime,
    NewVersionPage,
    UplusHistoryBoardPage,
  ],
  imports: [
    BrowserModule,
    BaiduMapModule.forRoot({ak: 'tVdy4eXUm05dBXTC9mR7mDjlgUR9GeeV'}),
    HttpModule,
    HttpClientModule,
    EmojiPickerComponentModule,
    IonicModule.forRoot(MyApp, {statusbarPadding: true}),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    ChatPage,
    HomePage,
    AdsPage,
    AdsDetailPage,
    AdsListPage,
    AdsItemDetailPage,
    MyPage,
    MyInfoPage,
    MyInfoMorePage,
    MyInfoQrCodePage,
    MyLevelPage,
    MyAdvertisePage,
    MyAdsAddPage,
    MyAdsItemViewPage,
    MyShopMolePage,
    MyContactListPage,
    MyInfoMingPianPage,
    MyMingPianPage,
    MyFriendInfoPage,
    MyContactFindPage,
    MyWalletPage,
    MyWalletCoinPage,
    MyWalletCoinOutPage,
    MyWalletPricePage,
    MyWalletUplusPage,
    MyWalletShopPage,
    MyWalletOutpuPage,
    MyWalletUplusOutPage,
    MyWalletChargePage,
    MyMarketInfoPage,
    MyChargePage,
    ShopPage,
    ShopPayScreenPage,
    ShopMoleItemViewPage,
    SettingPage,
    SettingChangePasswordPage,
    SettingChangePayPasswordPage,
    SettingPayOptionPage,
    HelpSupportPage,
    NewTicketPage,
    HelpSupportItemViewPage,
    NormallPopoverComponent,
    ContactPopoverComponent,
    QrCodeScannerPage,
    ForgotPasswordPage,
    ForgotPasswordChangePage,
    UplusSellBoardPage,
    UplusMyBoardPage,
    NewVersionPage,
    UplusHistoryBoardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Shake,
    InAppBrowser,
    File,
    Transfer,
    Camera,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SaveUserNameProvider,
    CallNumber,
    BarcodeScanner,
    EmojiProvider,
    ChatService,
    WechatPlugin  
  ]
})
export class AppModule {}
