webpackJsonp([0],{

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyWalletOutpuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the MyWalletOutpuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyWalletOutpuPage = /** @class */ (function () {
    function MyWalletOutpuPage(navCtrl, navParams, http, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.requestValue = "";
        this.price = "";
        this.n_price = "";
        this.historyData = "";
        this.pageAction = "";
        this.level = "";
    }
    MyWalletOutpuPage.prototype.ionViewDidLoad = function () {
    };
    MyWalletOutpuPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.pageAction = this.navParams.get("action");
        var tmp = JSON.parse(localStorage.getItem("infoData"));
        this.level = tmp.level;
        var postParam = {
            uid: localStorage.getItem("uid"),
            token: localStorage.getItem("token"),
            action: this.pageAction + "_new"
        };
        switch (this.pageAction) {
            case "price":
                this.price = tmp.price;
                this.n_price = tmp.n_price;
                break;
            case "price_shop":
                this.price = tmp.price_shop;
                break;
            default:
                break;
        }
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.serverUrl + "/out_pay_history.php", JSON.stringify(postParam))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log(data);
            loading.dismiss();
            switch (data.error) {
                case 1:
                    _this.historyData = data.historyData;
                    var tmp_1 = localStorage.getItem("infoData");
                    var userData = JSON.parse(tmp_1);
                    if (_this.price == "price") {
                        userData.price = data.real;
                        userData.n_price = data.n_price;
                    }
                    else {
                        userData.price_shop = data.real;
                    }
                    localStorage.setItem("infoData", JSON.stringify(userData));
                    break;
                case 2:
                    _this.alertCtrl.create({
                        title: '警告',
                        message: 'Another User logged',
                        buttons: ["确定"]
                    }).present();
                    break;
                default:
                    break;
            }
        }, function (err) {
            loading.dismiss();
        });
    };
    MyWalletOutpuPage.prototype.outputRequest = function () {
        var _this = this;
        if (this.requestValue != "" && parseFloat(this.requestValue) >= 10000) {
            var requestedValue = 0;
            for (var index = 0; index < this.historyData.length; index++) {
                if (this.historyData[index].state == "0") {
                    requestedValue += parseFloat(this.historyData[index].price);
                }
            }
            if (parseFloat(this.requestValue) > (parseFloat(this.n_price) - requestedValue)) {
                this.alertCtrl.create({
                    title: "警告",
                    message: "您自前无法申请提现",
                    buttons: ["确定"]
                }).present();
            }
            else {
                if (parseFloat(this.requestValue) < 10000) {
                    this.alertCtrl.create({
                        title: "警告",
                        message: "请输入100元以上金额",
                        buttons: ["确定"]
                    }).present();
                }
                else {
                    var postParam = {
                        uid: localStorage.getItem("uid"),
                        token: localStorage.getItem("token"),
                        action: this.pageAction + "_withdraw_new",
                        value: parseFloat(this.requestValue)
                    };
                    console.log(postParam);
                    var loading_1 = this.loadingCtrl.create();
                    loading_1.present();
                    this.http.post(this.serverUrl + "/out_pay_history.php", JSON.stringify(postParam))
                        .map(function (res) { return res.json(); })
                        .subscribe(function (data) {
                        loading_1.dismiss();
                        console.log(data);
                        switch (data.error) {
                            case 1:
                                _this.requestValue = "";
                                _this.historyData = data.historyData;
                                var tmp = localStorage.getItem("infoData");
                                var userData = JSON.parse(tmp);
                                if (_this.price == "price") {
                                    userData.price = data.real;
                                    userData.n_price = data.n_price;
                                }
                                else {
                                    userData.price_shop = data.real;
                                }
                                localStorage.setItem("infoData", JSON.stringify(userData));
                                break;
                            case 2:
                                _this.alertCtrl.create({
                                    title: '警告',
                                    message: 'Another User logged',
                                    buttons: ["确定"]
                                }).present();
                                break;
                            case 0:
                                _this.alertCtrl.create({
                                    title: '警告',
                                    message: '已在申请中。。',
                                    buttons: ["确定"]
                                }).present();
                                break;
                            default:
                                break;
                        }
                    }, function (err) {
                        loading_1.dismiss();
                    });
                }
            }
        }
        else {
            this.alertCtrl.create({
                title: "警告",
                message: "请输入100元以上金额",
                buttons: ["确定"]
            }).present();
        }
    };
    MyWalletOutpuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-wallet-outpu',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my-wallet-outpu\my-wallet-outpu.html"*/'<!--\n  Generated template for the MyWalletOutpuPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>我的提现目录</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-grid class="cate-grid">\n        <ion-row>\n            <ion-col col-12>\n                <ion-item class="value-area">\n                    <ion-label *ngIf="pageAction == \'price\'">现在 : {{n_price}} 个<br>\n                        <!-- <font style="font-size: 18px; color:#848484;">(锁现金 : ¥{{price}})</font> -->\n                    </ion-label>\n                    <ion-label *ngIf="pageAction != \'price\'">现金 : ¥{{price}}</ion-label>\n                </ion-item>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n    <ion-list style="margin: 16px;">\n        <ion-item>\n            <ion-input type="number" placeholder="0" disabled *ngIf="level == \'0\' "></ion-input>\n            <ion-input type="number" placeholder="0" [(ngModel)]="requestValue" *ngIf="level != \'0\'"></ion-input>\n        </ion-item>\n        <button ion-button block color="primary" style="height: 50px;" disabled *ngIf="level == \'0\'">\n            提现\n        </button>\n        <button ion-button block color="main" style="height: 50px;" (click)="outputRequest();" *ngIf="level != \'0\' && n_price >= 10000">\n            提现\n        </button>\n    </ion-list>\n    <ion-item *ngIf="level == \'0\' ">\n        <!-- <p style="color: #f44336; width: 100%; text-align: center;">如推荐两名以上同级别会员,可申请提现。</p> -->\n        <p style="color: #f44336; width: 100%; text-align: center;">如推荐两名以上同级别会员,可申请提现。</p>\n    </ion-item>\n    <ion-list inset class="history-list">\n        <button ion-item clear icon-start class="history-item" *ngFor="let item of historyData">\n            <ion-icon item-start name="information-circle" *ngIf="item.state==\'0\'" class="ico-info"></ion-icon>\n            <ion-icon item-start name="checkmark" *ngIf="item.state==\'1\'" class="ico-check"></ion-icon>\n            <ion-icon item-start name="close" *ngIf="item.state==\'2\'" class="ico-cancel"></ion-icon>\n            <ion-label>\n                ¥ {{item.price}}\n            </ion-label>\n            <ion-note item-end class="action-date">\n                {{item.addtime}}<br>{{item.updatetime}}\n            </ion-note>\n        </button>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my-wallet-outpu\my-wallet-outpu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
    ], MyWalletOutpuPage);
    return MyWalletOutpuPage;
}());

//# sourceMappingURL=my-wallet-outpu.js.map

/***/ }),

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyInfoQrCodePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MyInfoQrCodePage = /** @class */ (function () {
    function MyInfoQrCodePage(navCtrl, navParams, sanitizer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sanitizer = sanitizer;
    }
    MyInfoQrCodePage.prototype.ionViewDidLoad = function () {
        this.uid = localStorage.getItem('uid');
        // this.qr_code_url = this.transform("http://unak.vip/uplus/qr_code/qr_generate_page.php?data=" + this.uid);
        this.qr_code_url = this.transform("http://unak.vip/uplus/qr_code/n_qr_generate.php?data=" + this.uid);
    };
    MyInfoQrCodePage.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    MyInfoQrCodePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({ name: 'safe' }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-info-qr-code',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my-info-qr-code\my-info-qr-code.html"*/'<!--\n  Generated template for the MyInfoQrCodePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>我的二维码</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <iframe width="100%" height="100%" [src]="qr_code_url" frameborder="0"></iframe>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my-info-qr-code\my-info-qr-code.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */]])
    ], MyInfoQrCodePage);
    return MyInfoQrCodePage;
}());

//# sourceMappingURL=my-info-qr-code.js.map

/***/ }),

/***/ 113:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyChargePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the MyChargePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyChargePage = /** @class */ (function () {
    function MyChargePage(navCtrl, navParams, alertCtrl, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
    }
    MyChargePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyChargePage');
    };
    MyChargePage.prototype.chargePrice = function (amount, kind) {
        this.showOptions(amount, kind);
    };
    MyChargePage.prototype.showOptions = function (amount, kind) {
        var _this = this;
        this.alertCtrl.create({
            title: amount + " 元 充值",
            inputs: [
                {
                    name: 'pay_option',
                    label: '支付宝',
                    type: 'radio',
                    checked: true,
                    value: '101'
                },
                {
                    name: 'pay_option',
                    label: '微信支付',
                    type: 'radio',
                    value: '102'
                }
            ],
            buttons: [
                {
                    text: '取消',
                    handler: function (data) {
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        _this.selectOption(data, amount, kind);
                    }
                }
            ]
        }).present();
    };
    //kind: 1: charge, 2: Shop ads
    //option: 101: alipay, 102: weixin
    MyChargePage.prototype.selectOption = function (option, amount, kind) {
        var _this = this;
        if (option == 102) {
            // window.open("http://unak.vip/uplus/qr_code/Template/signup/Weixin/Api/native_charge.php?uid=" + localStorage.getItem('uid') + "&amount=" + amount, "_system", "location=no");
            this.alertCtrl.create({
                title: "",
                message: "Doesn't provide the Weixin yet",
                buttons: ["确定"]
            }).present();
        }
        else {
            var postParam = {
                'pay_item': 'charge',
                'uid': localStorage.getItem('uid'),
                'kind': kind,
                'price': amount
            };
            this.http.post(this.serverUrl + "/payment/alipay/order.php", JSON.stringify(postParam))
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                var payInfo = _this.unescapeHTML(data.response);
                cordova.plugins.alipay.payment(payInfo, function (e) {
                    //TODO 支付成功
                    _this.alertCtrl.create({
                        title: "警告",
                        message: '支付成功',
                        buttons: ["确定"]
                    }).present();
                }, function (e) {
                    //TODO 支付失败                          
                    _this.alertCtrl.create({
                        title: "警告",
                        message: "支付失败" + e.resultStatus + "," + e.memo,
                        buttons: ["确定"]
                    }).present();
                });
            }, function (err) {
                _this.alertCtrl.create({
                    title: "警告",
                    message: err,
                    buttons: ["确定"]
                }).present();
            });
        }
    };
    MyChargePage.prototype.unescapeHTML = function (a) {
        var aNew = "" + a;
        return aNew.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
    };
    MyChargePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-charge',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my-charge\my-charge.html"*/'<!--\n  Generated template for the MyChargePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>支付 - 充值</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <p>消费充值</p>\n    <ion-grid>\n        <ion-row>\n            <ion-col col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2>\n                <button ion-button color="secondary" outline (click)="chargePrice(100, 1);">\n                  <p class="price">100元</p>\n                </button>\n            </ion-col>\n            <ion-col col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2>\n                <button ion-button color="secondary" outline (click)="chargePrice(200, 1);">\n                  <p class="price">200元</p>\n                </button>\n            </ion-col>\n            <ion-col col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2>\n                <button ion-button color="secondary" outline (click)="chargePrice(300, 1);">\n                  <p class="price">300元</p>\n                </button>\n            </ion-col>\n            <ion-col col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2>\n                <button ion-button color="secondary" outline (click)="chargePrice(500, 1);">\n                  <p class="price">500元</p>\n                </button>\n            </ion-col>\n            <ion-col col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2>\n                <button ion-button color="secondary" outline (click)="chargePrice(1000, 1);">\n                  <p class="price">1000元</p>\n                </button>\n            </ion-col>\n            <ion-col col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2>\n                <button ion-button color="secondary" outline (click)="chargePrice(5000, 1);">\n                  <p class="price">5000元</p>\n                </button>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n    <p>广告位及广告充值</p>\n    <ion-grid>\n        <ion-row>\n            <ion-col col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2>\n                <button ion-button color="secondary" outline (click)="chargePrice(1000, 2);">\n                  <p class="price">1000元</p>\n                  <p class="price-desc">1 年</p>\n                </button>\n            </ion-col>\n            <ion-col col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2>\n                <button ion-button color="secondary" outline (click)="chargePrice(10000, 2);">\n                  <p class="price">10000元</p>\n                  <p class="price-desc">10 年</p>\n                </button>\n            </ion-col>\n        </ion-row>\n    </ion-grid>   \n    <!--iframe width="100%" height="100%" [src]="charge_screen_url" frameborder="0"></iframe--> \n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my-charge\my-charge.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]])
    ], MyChargePage);
    return MyChargePage;
}());

//# sourceMappingURL=my-charge.js.map

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NormallPopoverComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the NormallPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var NormallPopoverComponent = /** @class */ (function () {
    function NormallPopoverComponent(viewCtrl) {
        this.viewCtrl = viewCtrl;
        this.text = 'Hello World';
    }
    NormallPopoverComponent.prototype.itemClick = function (item) {
        this.viewCtrl.dismiss(item);
    };
    NormallPopoverComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'normall-popover',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\components\normall-popover\normall-popover.html"*/'<ion-list>\n    <ion-item (click)="itemClick(\'new_contact\');" class="border-bottom">\n        <ion-icon name="person-add" item-start></ion-icon>\n        新名片\n    </ion-item>\n    <ion-item (click)="itemClick(\'scan\');" class="border-bottom">\n        <ion-icon name="qr-scanner" item-start></ion-icon>\n        扫一扫\n    </ion-item>\n    <!--ion-item (click)="itemClick(\'help\');">\n        <ion-icon name="mail" item-start></ion-icon>\n        服务中心\n    </ion-item-->\n</ion-list>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\components\normall-popover\normall-popover.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */]])
    ], NormallPopoverComponent);
    return NormallPopoverComponent;
}());

//# sourceMappingURL=normall-popover.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpSupportPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__new_ticket_new_ticket__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__help_support_item_view_help_support_item_view__ = __webpack_require__(371);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the HelpSupportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HelpSupportPage = /** @class */ (function () {
    function HelpSupportPage(navCtrl, navParams, http, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.historyData = [];
        this.page_num = 0;
    }
    HelpSupportPage.prototype.ionViewDidLoad = function () {
    };
    HelpSupportPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.page_num = 0;
        var loading = this.loadingCtrl.create();
        loading.present();
        var postData = {
            action: 'get_history',
            uid: localStorage.getItem('uid'),
            nIdx: this.page_num
        };
        this.http.post(this.serverUrl + "/support_help.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            if (data.error == 1) {
                _this.historyData = [];
                for (var index = 0; index < data.data.length; index++) {
                    _this.historyData.push(data.data[index]);
                }
            }
            else {
                _this.alertCtrl.create({
                    title: "警告",
                    message: "网络失败!",
                    buttons: ["确定"]
                }).present();
            }
        }, function (err) {
            loading.dismiss();
        });
    };
    HelpSupportPage.prototype.getSupportHistory = function (nIdx, infiniteScroll) {
        var _this = this;
        var postData = {
            action: 'get_history',
            uid: localStorage.getItem('uid'),
            nIdx: nIdx
        };
        this.http.post(this.serverUrl + "/support_help.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (data.error == 1) {
                for (var index = 0; index < data.data.length; index++) {
                    _this.historyData.push(data.data[index]);
                }
            }
            else {
                _this.alertCtrl.create({
                    title: "警告",
                    message: "网络失败!",
                    buttons: ["确定"]
                }).present();
            }
            infiniteScroll.complete();
        });
    };
    HelpSupportPage.prototype.doInfinite = function (infiniteScroll) {
        this.page_num++;
        this.getSupportHistory(this.page_num, infiniteScroll);
    };
    HelpSupportPage.prototype.newTicket = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__new_ticket_new_ticket__["a" /* NewTicketPage */]);
    };
    HelpSupportPage.prototype.itemView = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__help_support_item_view_help_support_item_view__["a" /* HelpSupportItemViewPage */], { itemData: item });
    };
    HelpSupportPage.prototype.deleteItem = function (itemID) {
        var _this = this;
        var loading = this.loadingCtrl.create();
        this.alertCtrl.create({
            title: "通知",
            message: "确定删除吗？",
            buttons: [
                {
                    text: "是",
                    handler: function () {
                        loading.present();
                        var postData = {
                            action: 'delete',
                            itemID: itemID
                        };
                        _this.http.post(_this.serverUrl + "/support_help.php", JSON.stringify(postData))
                            .map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            loading.dismiss();
                            if (data.error == 1) {
                                _this.ionViewWillEnter();
                            }
                            else {
                                _this.alertCtrl.create({
                                    title: "警告",
                                    message: "网络失败!",
                                    buttons: ["确定"]
                                }).present();
                            }
                        }, function (err) {
                            loading.dismiss();
                            _this.alertCtrl.create({
                                title: "警告",
                                message: "网络失败!",
                                buttons: ["确定"]
                            }).present();
                        });
                    }
                },
                {
                    text: "不",
                    handler: function () { }
                }
            ]
        }).present();
    };
    HelpSupportPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-help-support',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\help-support\help-support.html"*/'<!--\n  Generated template for the HelpSupportPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>服务中心</ion-title>\n        <ion-buttons end (click)="newTicket();">\n            <button ion-button icon-only>\n                <ion-icon name="create"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-list inset class="history-list">\n        <ion-item-sliding *ngFor="let item of historyData">\n            <button ion-item clear icon-start class="history-item" (click)="itemView(item);">\n              <ion-icon item-start name="mail" class="ico-new" *ngIf="item.readstate==\'0\'"></ion-icon>\n              <ion-icon item-start name="mail-open" class="ico-open" *ngIf="item.readstate==\'1\'"></ion-icon>\n              <ion-label>\n                  {{item.content_old}}\n              </ion-label>\n              <ion-note item-end class="action-date">\n                  {{item.addtime}}\n              </ion-note>\n          </button>\n            <ion-item-options side="right">\n                <button ion-button color="danger" (click)="deleteItem(item.id);">\n                  <ion-icon name="trash"></ion-icon>\n                  删除\n              </button>\n            </ion-item-options>\n        </ion-item-sliding>\n    </ion-list>\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\help-support\help-support.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], HelpSupportPage);
    return HelpSupportPage;
}());

//# sourceMappingURL=help-support.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChatPage = /** @class */ (function () {
    function ChatPage(navParams, navCtrl, 
        // private chatService: ChatService,
        http, events) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.events = events;
        this.msgList = [];
        this.editorMsg = '';
        this.showEmojiPicker = false;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.runtime = "";
        // Get the navParams toUserId parameter
        this.toUser = {
            id: navParams.get('cid'),
            name: navParams.get('cname'),
            avatar: navParams.get('cphoto')
        };
        // Get mock user information
        var userInfo = localStorage.getItem('infoData');
        if (userInfo) {
            var userData = JSON.parse(userInfo);
            var uPhoto = (userData.photo) ? this.serverUrl + "/profile_imgs/" + userData.photo : "assets/imgs/other/default.png";
            this.user = {
                id: userData.uid,
                name: userData.realname,
                avatar: uPhoto
            };
        }
    }
    ChatPage.prototype.ionViewWillLeave = function () {
        // unsubscribe
        clearInterval(this.runtime);
        this.events.unsubscribe('chat:received');
    };
    ChatPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        //get message list
        this.getMsg();
        // Subscribe to received  new message events
        this.events.subscribe('chat:received', function (msg) {
            _this.pushNewMsg(msg);
        });
        var __this = this;
        this.runtime = setInterval(function () {
            __this.getNewMessageList();
        }, 1000);
    };
    ChatPage.prototype.onFocus = function () {
        this.showEmojiPicker = false;
        this.content.resize();
        this.scrollToBottom();
    };
    ChatPage.prototype.switchEmojiPicker = function () {
        this.showEmojiPicker = !this.showEmojiPicker;
        if (!this.showEmojiPicker) {
            this.focus();
        }
        else {
            this.setTextareaScroll();
        }
        this.content.resize();
        this.scrollToBottom();
    };
    ChatPage.prototype.getMsg = function () {
        var _this = this;
        var list = [];
        list = this.getMsgList();
        if (list.length > 0) {
            for (var i = 0; i < list.length; i++) {
                this.msgList.push(list[i]);
            }
            this.scrollToBottom();
        }
        else {
            var postData = {
                userId: this.user.id,
                toUserId: this.toUser.id
            };
            this.http.post(this.serverUrl + "/chat_get_first.php", JSON.stringify(postData))
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                var tmp = data.list;
                for (var n = 0; n < tmp.length; n++) {
                    var mockMsg = {
                        messageId: tmp[n].time,
                        userId: tmp[n].sender,
                        userName: (tmp[n].sender == _this.user.id) ? _this.user.name : _this.toUser.name,
                        userAvatar: (tmp[n].sender == _this.user.id) ? _this.user.avatar : _this.toUser.avatar,
                        toUserId: tmp[n].receiver,
                        time: tmp[n].time,
                        message: tmp[n].message,
                        status: 'success'
                    };
                    _this.msgList.push(mockMsg);
                }
                _this.scrollToBottom();
            }, function (err) {
            });
        }
    };
    /**
     * @name sendMsg
     */
    ChatPage.prototype.sendMsg = function () {
        if (!this.editorMsg.trim())
            return;
        // Mock message
        var id = Date.now().toString();
        var newMsg = {
            messageId: Date.now().toString(),
            userId: this.user.id,
            userName: this.user.name,
            userAvatar: this.user.avatar,
            toUserId: this.toUser.id,
            time: Date.now(),
            message: this.editorMsg,
            status: 'success'
        };
        this.pushNewMsg(newMsg);
        this.editorMsg = '';
        if (!this.showEmojiPicker) {
            this.focus();
        }
        this.http.post(this.serverUrl + "/chat_send.php", JSON.stringify(newMsg))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) { }, function (err) { });
        // this.chatService.sendMsg(newMsg)
        // .then(() => {
        //   let index = this.getMsgIndexById(id);
        //   if (index !== -1) {
        //     this.msgList[index].status = 'success';
        //   }
        // })
    };
    /**
     * @name pushNewMsg
     * @param msg
     */
    ChatPage.prototype.pushNewMsg = function (msg) {
        var userId = this.user.id, toUserId = this.toUser.id;
        // Verify user relationships
        if (msg.userId === userId && msg.toUserId === toUserId) {
            this.msgList.push(msg);
        }
        else if (msg.toUserId === userId && msg.userId === toUserId) {
            this.msgList.push(msg);
        }
        localStorage.setItem(this.toUser.id, JSON.stringify(this.msgList));
        this.scrollToBottom();
    };
    ChatPage.prototype.getMsgIndexById = function (id) {
        return this.msgList.findIndex(function (e) { return e.messageId === id; });
    };
    ChatPage.prototype.scrollToBottom = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.content.scrollToBottom) {
                _this.content.scrollToBottom();
            }
        }, 400);
    };
    ChatPage.prototype.focus = function () {
        if (this.messageInput && this.messageInput.nativeElement) {
            this.messageInput.nativeElement.focus();
        }
    };
    ChatPage.prototype.setTextareaScroll = function () {
        var textarea = this.messageInput.nativeElement;
        textarea.scrollTop = textarea.scrollHeight;
    };
    ChatPage.prototype.getMsgList = function () {
        var data = localStorage.getItem(this.toUser.id);
        var msgList;
        if (data == "" || data == null || data == undefined) {
            msgList = [];
        }
        else {
            msgList = JSON.parse(data);
        }
        return msgList;
    };
    ChatPage.prototype.getNewMessageList = function () {
        var _this = this;
        var lastTime = localStorage.getItem(this.toUser.id + "_last");
        var postData = {
            'userId': this.user.id,
            'toUserId': this.toUser.id,
            'time': lastTime,
        };
        this.http.post(this.serverUrl + "/chat_get.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            var tmp = data.list;
            for (var n = 0; n < tmp.length; n++) {
                var mockMsg = {
                    messageId: tmp[n].time,
                    userId: _this.toUser.id,
                    userName: _this.toUser.name,
                    userAvatar: _this.toUser.avatar,
                    toUserId: _this.user.id,
                    time: tmp[n].time,
                    message: tmp[n].message,
                    status: 'success'
                };
                _this.events.publish('chat:received', mockMsg, Date.now());
            }
            if (tmp.length > 0) {
                localStorage.setItem(_this.toUser.id + "_last", tmp[tmp.length - 1].time);
            }
        }, function (err) {
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Content */])
    ], ChatPage.prototype, "content", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('chat_input'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], ChatPage.prototype, "messageInput", void 0);
    ChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chat',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\chat\chat.html"*/'<ion-header>\n\n    <ion-navbar>\n        <ion-title>{{toUser.name}}</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n\n    <div class="message-wrap">\n\n        <div *ngFor="let msg of msgList" class="message" [class.left]=" msg.userId === toUser.id " [class.right]=" msg.userId === user.id ">\n            <img class="user-img" [src]="msg.userAvatar" alt="" src="">\n            <ion-spinner name="dots" *ngIf="msg.status === \'pending\'"></ion-spinner>\n            <div class="msg-detail">\n                <div class="msg-info">\n                    <p>\n                        {{msg.userName}}&nbsp;&nbsp;&nbsp;\n                        <!-- {{msg.time | relativeTime}} -->\n                    </p>\n                </div>\n                <div class="msg-content">\n                    <span class="triangle"></span>\n                    <p class="line-breaker ">{{msg.message}}</p>\n                </div>\n            </div>\n        </div>\n\n    </div>\n\n</ion-content>\n\n<ion-footer no-border [style.height]="showEmojiPicker ? \'255px\' : \'55px\'">\n    <div class="input-wrap">\n        <button ion-button clear icon-only item-right (click)="switchEmojiPicker()">\n      <ion-icon name="md-happy"></ion-icon>\n    </button>\n        <textarea #chat_input placeholder="Text Input" [(ngModel)]="editorMsg" (keyup.enter)="sendMsg()" (focusin)="onFocus()"></textarea>\n        <button ion-button clear icon-only item-right (click)="sendMsg()">\n      <ion-icon name="ios-send" ios="ios-send" md="md-send"></ion-icon>\n    </button>\n    </div>\n    <emoji-picker [(ngModel)]="editorMsg"></emoji-picker>\n</ion-footer>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\chat\chat.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */]])
    ], ChatPage);
    return ChatPage;
}());

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 129:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 129;

/***/ }),

/***/ 170:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 170;

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ads_list_ads_list__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__my_my__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shop_shop__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__my_contact_list_my_contact_list__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { AdsPage } from '../ads/ads';





/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, http, alertCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.tab1 = __WEBPACK_IMPORTED_MODULE_2__ads_list_ads_list__["a" /* AdsListPage */];
        this.tab2 = __WEBPACK_IMPORTED_MODULE_4__shop_shop__["a" /* ShopPage */];
        this.tab3 = __WEBPACK_IMPORTED_MODULE_5__my_contact_list_my_contact_list__["a" /* MyContactListPage */];
        this.tab4 = __WEBPACK_IMPORTED_MODULE_3__my_my__["a" /* MyPage */];
        this.curVersion = "2.0";
    }
    HomePage.prototype.ionViewDidLoad = function () {
    };
    HomePage.prototype.ionViewWillEnter = function () {
        // this.getNewVersion();
        // let _this = this;
        // this.timeInterval = setInterval(function() {
        //   _this.getNewVersion();
        // }, 30000);
    };
    HomePage.prototype.ionViewWillLeave = function () {
        // clearInterval(this.timeInterval);
    };
    HomePage.prototype.getNewVersion = function () {
        var _this = this;
        var storedVersion = localStorage.getItem('new_version');
        var savedLastPay = localStorage.getItem('payLast');
        if (storedVersion == "" || storedVersion == undefined || storedVersion == this.curVersion) {
            console.log('getting...');
            var postData = {
                version: this.curVersion,
                uid: localStorage.getItem('uid'),
                savedLastPay: savedLastPay
            };
            this.http.post(this.serverUrl + "/get_new_version.php", JSON.stringify(postData))
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                if (data.data == '0' || data.data == '1') {
                    localStorage.setItem('new_version', "");
                }
                else {
                    localStorage.setItem('new_version', data.data);
                }
                if (data.last != "" && data.last != null) {
                    _this.alertCtrl.create({
                        message: "亲亲！您目前是免费会员，公司发放的推广奖金和看广告的分享金虽然不少不过可以更多的哟！只要成为正式入网会员(100元，终身一次性费用)您的奖金就会翻倍，推广奖金每人每次最高100元，看广告每月所得最高300元哦！共享钱途 共享未来！",
                        buttons: ["确定"]
                    }).present();
                    localStorage.setItem('payLast', data.last);
                }
            }, function (err) {
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Tabs */])
    ], HomePage.prototype, "tabRef", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\home\home.html"*/'<ion-tabs #myTabs>\n    <ion-tab tabIcon="logo-youtube" tabTitle="广告" [root]="tab1"></ion-tab>\n    <ion-tab tabIcon="cart" tabTitle="城市商城" [root]="tab2"></ion-tab>\n    <ion-tab tabIcon="card" tabTitle="消息" [root]="tab3"></ion-tab>\n    <ion-tab tabIcon="person" tabTitle="我的" [root]="tab4"></ion-tab>    \n</ion-tabs>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\home\home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_6__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdsItemDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_save_user_name_save_user_name__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AdsItemDetailPage = /** @class */ (function () {
    function AdsItemDetailPage(navCtrl, navParams, http, loadingCtrl, alertCtrl, saveUserIDProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.saveUserIDProvider = saveUserIDProvider;
        this.serverUrl = "http://unak.vip/uplus";
        this.aid = "";
        this.curPos = 0;
    }
    AdsItemDetailPage.prototype.ionViewDidLoad = function () {
        this.uid = localStorage.getItem('uid');
    };
    AdsItemDetailPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.ads_list = this.navParams.get("items");
        this.curPos = this.navParams.get("index");
        this.video_url = this.serverUrl + this.ads_list[this.curPos].video;
        this.aid = this.ads_list[this.curPos].aid;
        this.vplayer.nativeElement.addEventListener("canplay", function () {
            _this.vplayer.nativeElement.play();
        }, true);
    };
    AdsItemDetailPage.prototype.videoEnded = function () {
        var _this = this;
        console.log('-----video ended-------');
        // ads bonus ---
        var postParam = {
            uid: localStorage.getItem("uid"),
            aid: this.aid,
            token: localStorage.getItem("token"),
            action: 'play_video'
        };
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.serverUrl + "/Api/ads_n_earn.php", JSON.stringify(postParam))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            if (data.status == true) {
                //play next video automatically
                _this.curPos++;
                if (_this.curPos >= _this.ads_list.length) {
                    _this.curPos = 0;
                }
                if (_this.curPos != _this.navParams.get("index")) {
                    _this.video_url = _this.serverUrl + _this.ads_list[_this.curPos].video;
                    _this.aid = _this.ads_list[_this.curPos].aid;
                }
            }
            else {
                _this.alertCtrl.create({
                    title: "警告",
                    message: "这个帐户已经登录了另一个手机。 不能继续看广告。",
                    buttons: [{
                            text: '确定',
                            handler: function () {
                                var postData = {
                                    token: localStorage.getItem("token"),
                                    uid: localStorage.getItem('uid'),
                                    action: 'logout'
                                };
                                _this.http.post(_this.serverUrl + "/Api/mobile/logout.php", JSON.stringify(postData))
                                    .map(function (res) { return res.json(); })
                                    .subscribe(function (data) {
                                    loading.dismiss();
                                    if (data.error == '0') {
                                        localStorage.setItem("uid", "");
                                        localStorage.setItem("token", "");
                                        localStorage.setItem("infoData", "");
                                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                                        _this.saveUserIDProvider.removeUID('remove').then(function (result) {
                                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                                        })
                                            .catch(function (err) {
                                        });
                                    }
                                });
                            }
                        }]
                }).present();
                ;
            }
        }, function (err) {
            loading.dismiss();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('videoPlayer'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], AdsItemDetailPage.prototype, "vplayer", void 0);
    AdsItemDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ads-item-detail',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\ads-item-detail\ads-item-detail.html"*/'<!--\n  Generated template for the AdsDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>广告介绍</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-list>\n        <ion-item>\n            <video class="ads_video" #videoPlayer playsinline preload="auto" [src]="video_url" controls (ended)="videoEnded();"></video>\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\ads-item-detail\ads-item-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_save_user_name_save_user_name__["a" /* SaveUserNameProvider */]])
    ], AdsItemDetailPage);
    return AdsItemDetailPage;
}());

//# sourceMappingURL=ads-item-detail.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__my_wallet_my_wallet__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__my_info_my_info__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__provider_userinfo_model__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__my_level_my_level__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__my_shop_mole_my_shop_mole__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__setting_setting__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__my_info_qr_code_my_info_qr_code__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_normall_popover_normall_popover__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__help_support_help_support__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__my_contact_find_my_contact_find__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__my_advertise_my_advertise__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__qr_code_scanner_qr_code_scanner__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__new_version_new_version__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__my_market_info_my_market_info__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__my_charge_my_charge__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



















var MyPage = /** @class */ (function () {
    function MyPage(navCtrl, navParams, app, http, alertCtrl, loadingCtrl, popoverCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.popoverCtrl = popoverCtrl;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.realname = "";
        this.username = "";
        this.levelname = "";
        this.photo = "";
        this.curVersion = "";
        this.old_version = "2.0";
        this.notiInterval = "";
        this.newChatCount = 0;
        this.unreadMails = 0;
    }
    MyPage.prototype.ionViewDidLoad = function () {
    };
    MyPage.prototype.ionViewWillEnter = function () {
        this.setUserInfo();
        this.newChatCount = 0;
        this.getChatNotify();
        // let _this = this;
        // this.notiInterval = setInterval(function() {
        //     _this.getChatNotify();
        // }, 1000);
        this.getUserInfo();
        this.getUnreadMailCount();
    };
    MyPage.prototype.ionViewWillLeave = function () {
        // clearInterval(this.notiInterval);
    };
    MyPage.prototype.getUnreadMailCount = function () {
        var _this = this;
        var postData = {
            action: 'get_unread_count',
            uid: localStorage.getItem('uid')
        };
        this.http.post(this.serverUrl + "/support_help.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (data.error == 1) {
                _this.unreadMails = data.count;
            }
        });
    };
    MyPage.prototype.getChatNotify = function () {
        var _this = this;
        var postData = {
            uid: localStorage.getItem('uid')
        };
        this.http.post(this.serverUrl + "/chat_notify.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.newChatCount = data.total;
        }, function (err) {
        });
    };
    MyPage.prototype.getUserInfo = function () {
        var _this = this;
        this.curVersion = localStorage.getItem('new_version');
        var postData = {
            action: 'get',
            uid: localStorage.getItem("uid")
        };
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.serverUrl + "/current_user.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            _this.curUserInfo = new __WEBPACK_IMPORTED_MODULE_4__provider_userinfo_model__["a" /* UserInfoModel */]();
            _this.curUserInfo = data;
            localStorage.setItem("infoData", JSON.stringify(_this.curUserInfo));
            _this.username = _this.curUserInfo.uid;
            _this.realname = _this.curUserInfo.realname;
            _this.levelname = _this.curUserInfo.level_name;
            _this.photo = _this.curUserInfo.photo;
        }, function (err) {
            console.log(err);
            loading.dismiss();
        });
    };
    MyPage.prototype.setUserInfo = function () {
        var tmp = localStorage.getItem("infoData");
        if (tmp == undefined || tmp == "") {
            this.getUserInfo();
        }
        else {
            var savedUser = new __WEBPACK_IMPORTED_MODULE_4__provider_userinfo_model__["a" /* UserInfoModel */]();
            savedUser = JSON.parse(tmp);
            this.username = localStorage.getItem("uid");
            if (this.username != savedUser.uid) {
                this.getUserInfo();
            }
            else {
                this.username = savedUser.uid;
                this.realname = savedUser.realname;
                this.levelname = savedUser.level_name;
            }
        }
    };
    MyPage.prototype.gotoDownload = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_16__new_version_new_version__["a" /* NewVersionPage */]);
    };
    MyPage.prototype.gotoWallet = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__my_wallet_my_wallet__["a" /* MyWalletPage */]);
    };
    MyPage.prototype.gotoInfo = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_3__my_info_my_info__["a" /* MyInfoPage */]);
    };
    MyPage.prototype.gotoLevel = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_7__my_level_my_level__["a" /* MyLevelPage */]);
    };
    MyPage.prototype.gotoShopMole = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_8__my_shop_mole_my_shop_mole__["a" /* MyShopMolePage */]);
    };
    MyPage.prototype.gotoMarket = function () {
        if (this.curUserInfo.market != '1') {
            this.alertCtrl.create({
                title: "通知",
                message: "获得交易所权限的亲亲请给如下账号转账交易所申请费用五万元哟！",
                buttons: ["确定"]
            }).present();
        }
        else {
            this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_17__my_market_info_my_market_info__["a" /* MyMarketInfoPage */]);
        }
    };
    MyPage.prototype.gotoAds = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_14__my_advertise_my_advertise__["a" /* MyAdvertisePage */]);
    };
    MyPage.prototype.gotoCharge = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_18__my_charge_my_charge__["a" /* MyChargePage */]);
    };
    MyPage.prototype.gotoSetting = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_9__setting_setting__["a" /* SettingPage */]);
    };
    MyPage.prototype.gotoMyQRCode = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_10__my_info_qr_code_my_info_qr_code__["a" /* MyInfoQrCodePage */]);
    };
    MyPage.prototype.gotoGame = function () {
        this.alertCtrl.create({
            title: "通知",
            message: "您的版本暂不支持游戏功能，请期待下一个版本。",
            buttons: ["确定"]
        }).present();
    };
    MyPage.prototype.GotoHelpPage = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_12__help_support_help_support__["a" /* HelpSupportPage */]);
    };
    MyPage.prototype.presentPopover = function (myEvent) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_11__components_normall_popover_normall_popover__["a" /* NormallPopoverComponent */]);
        popover.present({
            ev: myEvent
        });
        popover.onDidDismiss(function (data) {
            switch (data) {
                case 'new_contact':
                    _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_13__my_contact_find_my_contact_find__["a" /* MyContactFindPage */]);
                    break;
                case 'scan':
                    _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_15__qr_code_scanner_qr_code_scanner__["a" /* QrCodeScannerPage */]);
                    break;
                /*case 'help':
                    this.app.getRootNav().push(HelpSupportPage);
                    break;*/
                default:
                    break;
            }
        });
    };
    MyPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my\my.html"*/'<!--\n  Generated template for the MyPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-navbar>\n        <ion-title>我的</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="GotoHelpPage();">\n                <ion-icon name="mail"></ion-icon>\n                <ion-badge color="danger" *ngIf="unreadMails != 0" class="mail-number">{{unreadMails}}</ion-badge>\n            </button>\n            <button ion-button icon-only (click)="presentPopover($event);">\n                <ion-icon name="add"></ion-icon>\n            </button>            \n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-list>\n        <ion-item>\n            <ion-thumbnail item-start (click)="gotoInfo(username);">\n                <img src="assets/imgs/other/default.png" *ngIf="!photo">\n                <img src="{{serverUrl}}/profile_imgs/{{photo}}" *ngIf="photo">\n            </ion-thumbnail>\n            <h2 (click)="gotoInfo(username);">{{realname}}</h2>\n            <p (click)="gotoInfo(username);">会员帐号: {{username}}</p>\n            <button ion-button clear item-end (click)="gotoMyQRCode()">\n              <img src="assets/imgs/other/default_qrcode.png" alt="" class="qr-code">\n            </button>\n        </ion-item>\n    </ion-list>\n    <ion-list>\n        <button ion-item class="download" (click)="gotoDownload();" *ngIf="curVersion!=\'\' && curVersion!=undefined">\n            <ion-icon name="download" item-start color="main"></ion-icon>\n            新版本 {{curVersion}}\n        </button>\n    </ion-list>\n    <ion-list>\n        <button ion-item (click)="gotoWallet();">\n            <ion-icon name="cash" item-start ></ion-icon>\n            钱包\n        </button>\n    </ion-list>\n    <ion-list>\n        <button ion-item class="border-bottom" (click)="gotoLevel();">\n            <ion-icon name="stats" item-start></ion-icon>\n            等级 : {{levelname}}\n        </button>\n        <!-- <button ion-item class="border-bottom" (click)="gotoAds();">\n            <ion-icon name="logo-youtube" item-start color="main"></ion-icon>\n            我的广告\n        </button> -->\n        <button ion-item class="border-bottom" (click)="gotoCharge();">\n            <ion-icon name="logo-yen" item-start></ion-icon>\n            支付\n        </button>\n        <button ion-item class="border-bottom" (click)="gotoShopMole();">\n            <ion-icon name="cart" item-start></ion-icon>\n            我的商家\n        </button>\n        <button ion-item class="border-bottom" (click)="gotoMarket();">\n            <ion-icon name="globe" item-start></ion-icon>\n            我的交易所\n        </button>\n        <!--button ion-item class="border-bottom" (click)="gotoContact();">\n            <ion-icon name="contacts" item-start color="main"></ion-icon>\n            我的名片目录\n            <ion-badge color="danger" *ngIf="newChatCount != 0">{{newChatCount}}</ion-badge>\n        </button-->\n        <button ion-item (click)="gotoGame();">\n            <ion-icon name="game-controller-b" item-start></ion-icon>\n            我的游戏\n        </button>\n    </ion-list>\n    <ion-list>\n        <button ion-item (click)="gotoSetting();">\n            <ion-icon name="settings" item-start></ion-icon>\n            设置\n        </button>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my\my.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* PopoverController */]])
    ], MyPage);
    return MyPage;
}());

//# sourceMappingURL=my.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyWalletPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__my_wallet_price_my_wallet_price__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__my_wallet_uplus_my_wallet_uplus__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__my_wallet_coin_my_wallet_coin__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__my_wallet_charge_my_wallet_charge__ = __webpack_require__(358);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the MyWalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyWalletPage = /** @class */ (function () {
    function MyWalletPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tab1 = __WEBPACK_IMPORTED_MODULE_4__my_wallet_coin_my_wallet_coin__["a" /* MyWalletCoinPage */];
        this.tab2 = __WEBPACK_IMPORTED_MODULE_2__my_wallet_price_my_wallet_price__["a" /* MyWalletPricePage */];
        this.tab3 = __WEBPACK_IMPORTED_MODULE_3__my_wallet_uplus_my_wallet_uplus__["a" /* MyWalletUplusPage */];
        // tab4 = MyWalletShopPage;
        this.tab4 = __WEBPACK_IMPORTED_MODULE_5__my_wallet_charge_my_wallet_charge__["a" /* MyWalletChargePage */];
        this.rank = "";
    }
    MyWalletPage.prototype.ionViewDidLoad = function () {
    };
    MyWalletPage.prototype.ionViewWillEnter = function () {
        var tmp = JSON.parse(localStorage.getItem("infoData"));
        this.rank = tmp.level;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('myTabs'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Tabs */])
    ], MyWalletPage.prototype, "tabRef", void 0);
    MyWalletPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-wallet',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my-wallet\my-wallet.html"*/'<ion-tabs #myTabs>\n    <ion-tab tabIcon="logo-bitcoin" tabTitle="广告豆" [root]="tab1"></ion-tab>    \n    <ion-tab tabIcon="logo-yen" tabTitle="金豆" [root]="tab2"></ion-tab>\n    <ion-tab tabIcon="logo-chrome" tabTitle="现金" [root]="tab3"></ion-tab>    \n    <!-- <ion-tab tabIcon="cart" tabTitle="商家现金" [root]="tab4" *ngIf="rank >= 5"></ion-tab> -->\n    <ion-tab tabIcon="sync" tabTitle="充值目录" [root]="tab4"></ion-tab>\n</ion-tabs>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my-wallet\my-wallet.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], MyWalletPage);
    return MyWalletPage;
}());

//# sourceMappingURL=my-wallet.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyWalletPricePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__my_wallet_outpu_my_wallet_outpu__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the MyWalletPricePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyWalletPricePage = /** @class */ (function () {
    function MyWalletPricePage(navCtrl, navParams, http, app, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.historyData = [];
        this.price = "";
        this.n_price = "";
        this.out_price = "";
        this.savedData = false;
    }
    MyWalletPricePage.prototype.ionViewDidLoad = function () {
    };
    MyWalletPricePage.prototype.getSavedData = function () {
        var tmp_price = localStorage.getItem("priceData");
        if (tmp_price == undefined || tmp_price == "") {
            return false;
        }
        else {
            this.savedData = true;
            var priceData = JSON.parse(tmp_price);
            this.historyData = priceData.historyData;
            this.price = priceData.other;
            this.n_price = priceData.n_price;
            this.out_price = priceData.out_price;
            var tmp = localStorage.getItem("infoData");
            var userData = JSON.parse(tmp);
            userData.price = this.price;
            userData.n_price = this.n_price;
            localStorage.setItem("infoData", JSON.stringify(userData));
            return true;
        }
    };
    MyWalletPricePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.savedData = this.getSavedData();
        var uid = localStorage.getItem("uid");
        var token = localStorage.getItem("token");
        var postData = {
            action: 'price_history',
            uid: uid,
            token: token
        };
        var loading = this.loadingCtrl.create();
        if (!this.savedData) {
            loading.present();
        }
        this.http.post(this.serverUrl + "/get_n_pay_history.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (!_this.savedData) {
                loading.dismiss();
            }
            switch (data.error) {
                case 1:
                    localStorage.setItem("priceData", JSON.stringify(data));
                    _this.historyData = data.historyData;
                    _this.price = data.other;
                    _this.n_price = data.n_price;
                    _this.out_price = data.out_price;
                    var tmp = localStorage.getItem("infoData");
                    var userData = JSON.parse(tmp);
                    userData.price = _this.price;
                    localStorage.setItem("infoData", JSON.stringify(userData));
                    break;
                case 2:
                    _this.alertCtrl.create({
                        title: '警告',
                        message: 'Another User logged',
                        buttons: ["确定"]
                    }).present();
                    break;
                default:
                    break;
            }
        }, function (err) {
            if (!_this.savedData) {
                loading.dismiss();
            }
        });
    };
    MyWalletPricePage.prototype.gotoBack = function () {
        this.app.getRootNav().pop();
    };
    MyWalletPricePage.prototype.gotoOutPut = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__my_wallet_outpu_my_wallet_outpu__["a" /* MyWalletOutpuPage */], { action: 'price' });
    };
    MyWalletPricePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-wallet-price',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my-wallet-price\my-wallet-price.html"*/'<!--\n  Generated template for the MyWalletPricePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-navbar>\n        <ion-buttons start class="back-button-custom">\n            <button ion-button icon-only (click)="gotoBack()">\n              <ion-icon name="arrow-back"></ion-icon>\n            </button>\n        </ion-buttons>\n        <ion-title>金豆</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="gotoOutPut()">\n                <ion-icon name="add"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-item class="value-area">\n        <p>现在 : {{n_price}}个</p>\n        <!-- <p style="font-size: 18px; color:#848484;">(转换加密货币中 : ¥{{price}})</p> -->\n        <p>已提现 : ¥{{out_price}}</p>\n    </ion-item>\n    <ion-list>\n        <ion-item *ngFor="let item of historyData">\n            <ion-label class="value-item">{{item.state}} {{item.price}}</ion-label>\n            <ion-label class="value-item-time">{{item.date}}<br>{{item.kind}}</ion-label>\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my-wallet-price\my-wallet-price.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
    ], MyWalletPricePage);
    return MyWalletPricePage;
}());

//# sourceMappingURL=my-wallet-price.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyWalletUplusPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__provider_userinfo_model__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__my_wallet_uplus_out_my_wallet_uplus_out__ = __webpack_require__(224);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the MyWalletUplusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyWalletUplusPage = /** @class */ (function () {
    function MyWalletUplusPage(navCtrl, navParams, http, app, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.historyData = [];
        this.uplus = "";
        this.n_uplus = "";
        this.savedData = false;
    }
    MyWalletUplusPage.prototype.ionViewDidLoad = function () {
    };
    MyWalletUplusPage.prototype.getSavedData = function () {
        var tmp_price = localStorage.getItem("uplusData");
        if (tmp_price == undefined || tmp_price == "") {
            return false;
        }
        else {
            this.savedData = true;
            var uplusData = JSON.parse(tmp_price);
            this.historyData = uplusData.historyData;
            this.uplus = uplusData.other;
            this.n_uplus = uplusData.n_uplus;
            var tmp = localStorage.getItem("infoData");
            var userData = new __WEBPACK_IMPORTED_MODULE_2__provider_userinfo_model__["a" /* UserInfoModel */]();
            userData = JSON.parse(tmp);
            userData.uplus = this.uplus;
            userData.n_uplus = this.n_uplus;
            localStorage.setItem("infoData", JSON.stringify(userData));
            return true;
        }
    };
    MyWalletUplusPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.savedData = this.getSavedData();
        var uid = localStorage.getItem("uid");
        var token = localStorage.getItem("token");
        var postData = {
            action: 'uplus_history',
            uid: uid,
            token: token
        };
        var loading = this.loadingCtrl.create();
        if (!this.savedData) {
            loading.present();
        }
        this.http.post(this.serverUrl + "/get_n_pay_history.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (!_this.savedData) {
                loading.dismiss();
            }
            switch (data.error) {
                case 1:
                    localStorage.setItem('uplusData', JSON.stringify(data));
                    _this.historyData = data.historyData;
                    _this.uplus = data.other;
                    _this.n_uplus = data.n_uplus;
                    var tmp = localStorage.getItem("infoData");
                    var userData = new __WEBPACK_IMPORTED_MODULE_2__provider_userinfo_model__["a" /* UserInfoModel */]();
                    userData = JSON.parse(tmp);
                    userData.uplus = _this.uplus;
                    userData.n_uplus = _this.n_uplus;
                    localStorage.setItem("infoData", JSON.stringify(userData));
                    break;
                case 2:
                    _this.alertCtrl.create({
                        title: '警告',
                        message: 'Another User logged',
                        buttons: ["确定"]
                    }).present();
                    break;
                default:
                    break;
            }
        }, function (err) {
            if (!_this.savedData) {
                loading.dismiss();
            }
        });
    };
    MyWalletUplusPage.prototype.gotoBack = function () {
        this.app.getRootNav().pop();
    };
    MyWalletUplusPage.prototype.gotoOutPut = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__my_wallet_uplus_out_my_wallet_uplus_out__["a" /* MyWalletUplusOutPage */]);
    };
    MyWalletUplusPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-wallet-uplus',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my-wallet-uplus\my-wallet-uplus.html"*/'<!--\n  Generated template for the MyWalletUplusPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-navbar>\n        <ion-buttons start class="back-button-custom">\n            <button ion-button icon-only (click)="gotoBack()">\n                <ion-icon name="arrow-back"></ion-icon>\n            </button>\n        </ion-buttons>\n        <ion-title>现金包</ion-title>\n        <!-- <ion-buttons end>\n            <button ion-button icon-only (click)="gotoOutPut()">\n                <ion-icon name="add"></ion-icon>\n            </button>\n        </ion-buttons> -->\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-item class="value-area">\n        <!-- <p *ngIf="uplus != \'0.00\'">钱途 : {{uplus}}</p> -->\n        <p>现金 : {{n_uplus}}</p>\n    </ion-item>\n    <ion-list>\n        <ion-item *ngFor="let item of historyData">\n            <ion-label class="value-item">{{item.e_coin}}个 -> {{item.cash}}¥</ion-label>\n            <ion-label class="value-item-time">{{item.date}}</ion-label>\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my-wallet-uplus\my-wallet-uplus.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
    ], MyWalletUplusPage);
    return MyWalletUplusPage;
}());

//# sourceMappingURL=my-wallet-uplus.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyWalletUplusOutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the MyWalletUplusOutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyWalletUplusOutPage = /** @class */ (function () {
    function MyWalletUplusOutPage(navCtrl, navParams, app, http, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.history_data = [];
        this.page_num = 0;
    }
    MyWalletUplusOutPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyWalletUplusOutPage');
    };
    MyWalletUplusOutPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.page_num = 0;
        var postData = {
            action: 'uplus_history_out',
            uid: localStorage.getItem("uid"),
            nIdx: this.page_num
        };
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.serverUrl + "/get_pay_history.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            for (var index = 0; index < data.historyData.length; index++) {
                _this.history_data.push(data.historyData[index]);
            }
        }, function (err) {
            console.log(err);
            loading.dismiss();
        });
    };
    MyWalletUplusOutPage.prototype.doInfinite = function (infiniteScroll) {
        this.page_num++;
        this.getHistoryData(this.page_num, infiniteScroll);
    };
    MyWalletUplusOutPage.prototype.getHistoryData = function (nIdx, infiniteScroll) {
        var _this = this;
        var postData = {
            action: 'uplus_history_out',
            uid: localStorage.getItem("uid"),
            nIdx: nIdx
        };
        this.http.post(this.serverUrl + "/get_pay_history.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            for (var index = 0; index < data.historyData.length; index++) {
                _this.history_data.push(data.historyData[index]);
            }
            infiniteScroll.complete();
        });
    };
    MyWalletUplusOutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-wallet-uplus-out',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my-wallet-uplus-out\my-wallet-uplus-out.html"*/'<!--\n  Generated template for the MyWalletUplusOutPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>我的账单</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-item class="value-area">\n        <ion-label>已提现 : {{uplus}}</ion-label>\n    </ion-item>\n    <ion-list>\n        <ion-item *ngFor="let item of history_data">\n            <ion-label class="value-item">- {{item.amount * 100}}</ion-label>\n            <ion-label class="value-item-time">{{item.date}}</ion-label>\n        </ion-item>\n    </ion-list>\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my-wallet-uplus-out\my-wallet-uplus-out.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], MyWalletUplusOutPage);
    return MyWalletUplusOutPage;
}());

//# sourceMappingURL=my-wallet-uplus-out.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyWalletCoinPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__qr_code_scanner_qr_code_scanner__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__uplus_sell_board_uplus_sell_board__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__my_wallet_coin_out_my_wallet_coin_out__ = __webpack_require__(357);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the MyWalletCoinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyWalletCoinPage = /** @class */ (function () {
    function MyWalletCoinPage(navCtrl, navParams, alertCtrl, app) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.slides_bg = [];
        this.e_coin = "";
        this.photo = "";
    }
    MyWalletCoinPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.slides_bg = [];
        for (var index = 1; index < 6; index++) {
            this.slides_bg.push({
                id: index
            });
        }
        setTimeout(function () {
            if (_this.slides_bg && _this.slides_bg.length > 0) {
                _this.slides.freeMode = true;
                _this.slides.autoplay = 2000;
                _this.slides.speed = 500;
                _this.slides.loop = true;
                _this.slides.startAutoplay();
            }
        }, 1000);
    };
    MyWalletCoinPage.prototype.slideChanged = function () {
        this.slides.startAutoplay();
    };
    MyWalletCoinPage.prototype.ionViewWillEnter = function () {
        var tmp = JSON.parse(localStorage.getItem('infoData'));
        this.e_coin = tmp.e_coin;
        this.photo = tmp.photo;
        if (this.e_coin == null || this.e_coin == "") {
            this.e_coin = "";
        }
    };
    MyWalletCoinPage.prototype.alertWarning = function () {
        this.alertCtrl.create({
            title: '通知',
            message: '注：钱途加密货币为公司无偿赠送的奖励形式，等国家的相关政策完善，达到符合要求的交易条件时正式上线交易。',
            buttons: ['确定']
        }).present();
    };
    MyWalletCoinPage.prototype.gotoBack = function () {
        this.app.getRootNav().pop();
    };
    MyWalletCoinPage.prototype.scanCode = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__qr_code_scanner_qr_code_scanner__["a" /* QrCodeScannerPage */]);
    };
    MyWalletCoinPage.prototype.gotoSellBoard = function () {
        // this.navCtrl.push(UplusSellBoardPage);
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_3__uplus_sell_board_uplus_sell_board__["a" /* UplusSellBoardPage */]);
        // this.alertCtrl.create({
        //   title: '通知',
        //   message: '即将开放敬请期待。',
        //   buttons: ['确定']
        // }).present();
    };
    MyWalletCoinPage.prototype.gotoHistory = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_4__my_wallet_coin_out_my_wallet_coin_out__["a" /* MyWalletCoinOutPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Slides */])
    ], MyWalletCoinPage.prototype, "slides", void 0);
    MyWalletCoinPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-wallet-coin',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my-wallet-coin\my-wallet-coin.html"*/'<!--\n  Generated template for the MyWalletCoinPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-buttons start class="back-button-custom">\n            <button ion-button icon-only (click)="gotoBack()">\n              <ion-icon name="arrow-back"></ion-icon>\n            </button>\n        </ion-buttons>\n        <ion-title>广告豆</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="gotoHistory()">\n                <ion-icon name="add"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <div class="coin-value-area">\n        <div class="coin-bg"></div>\n        <div class="coin-info" (click)="gotoHistory()">\n            <img src="assets/imgs/other/default.png" *ngIf="!photo">\n            <img src="{{serverUrl}}/profile_imgs/{{photo}}" *ngIf="photo">\n            <p>广告豆</p>\n            <p>{{e_coin}}个</p>\n        </div>\n        <div class="scan-img-area">\n            <img src="assets/imgs/scan.png" alt="" (click)="scanCode();">\n        </div>\n    </div>\n    <ion-slides class="top-slider" (ionSlideDidChange)="slideChanged()" *ngIf="slides_bg.length > 0">\n        <ion-slide *ngFor="let s_bg of slides_bg" [ngStyle]="{\'background-image\': \'url(assets/imgs/coin/c_b_\' + s_bg.id + \'.jpg)\'}">\n        </ion-slide>\n    </ion-slides>\n    <ion-grid>\n        <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n\n        <ion-row>\n            <ion-col>\n                <button ion-button class="text-on-bottom" (click)="alertWarning();">\n                    <img src="assets/imgs/coin/sell.png" alt="">\n                    <p>卖出</p>\n                </button>\n            </ion-col>\n            <ion-col>\n                <button ion-button class="text-on-bottom" (click)="alertWarning();">\n                    <img src="assets/imgs/coin/digital.png" alt="">\n                    <p>数字资产</p>\n                </button>\n            </ion-col>\n            <ion-col>\n                <button ion-button class="text-on-bottom" (click)="gotoSellBoard();">\n                    <img src="assets/imgs/coin/shop.png" alt="">\n                    <p style="color: red;">积分交易所</p>\n                </button>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col>\n                <button ion-button class="text-on-bottom" (click)="alertWarning();">\n                    <img src="assets/imgs/coin/tranfer_out.png" alt="">\n                    <p>转出</p>\n                </button>\n            </ion-col>\n            <ion-col>\n                <button ion-button class="text-on-bottom" (click)="alertWarning();">\n                    <img src="assets/imgs/coin/transfer_in.png" alt="">\n                    <p>转入</p>\n                </button>\n            </ion-col>\n            <ion-col>\n                <button ion-button class="text-on-bottom" (click)="alertWarning();">\n                    <img src="assets/imgs/coin/buy.png" alt="">\n                    <p>买入</p>\n                </button>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my-wallet-coin\my-wallet-coin.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */]])
    ], MyWalletCoinPage);
    return MyWalletCoinPage;
}());

//# sourceMappingURL=my-wallet-coin.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShopPayScreenPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ShopPayScreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ShopPayScreenPage = /** @class */ (function () {
    function ShopPayScreenPage(navCtrl, navParams, http, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.c_data = navParams.get('data');
        this.check_flag = false;
    }
    ShopPayScreenPage.prototype.ionViewDidLoad = function () {
    };
    ShopPayScreenPage.prototype.ionViewWillEnter = function () {
        console.log(this.c_data);
        var tmp_check = localStorage.getItem('check_flag');
        if (tmp_check == '1') {
            this.check_flag = true;
            this.pay_pass = localStorage.getItem('pay_pass');
        }
        else {
            this.check_flag = false;
            this.pay_pass = "";
        }
    };
    ShopPayScreenPage.prototype.checkedSavePwd = function () {
        this.check_flag = !this.check_flag;
    };
    ShopPayScreenPage.prototype.pay = function () {
        var _this = this;
        console.log(this.amount);
        console.log(this.pay_pass);
        if (this.pay_pass.trim() == "") {
            this.alertCtrl.create({
                title: "警告",
                message: "请输入支付密码",
                buttons: ["确定"]
            }).present();
        }
        else if (this.amount > 0) {
            if (this.check_flag) {
                localStorage.setItem('check_flag', '1');
                localStorage.setItem('pay_pass', this.pay_pass);
            }
            else {
                localStorage.setItem('check_flag', '0');
                localStorage.setItem('pay_pass', '');
            }
            var postData = {
                uid: localStorage.getItem("uid"),
                to_user: this.c_data,
                amount: this.amount,
                pay_pass: this.pay_pass
            };
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.http.post(this.serverUrl + "/n_pay_shop.php", JSON.stringify(postData))
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                loading_1.dismiss();
                if (data.error == '0') {
                    _this.alertCtrl.create({
                        title: "警告",
                        message: "支付成功",
                        buttons: ["确定"]
                    }).present();
                    _this.navCtrl.pop();
                }
                else if (data.error == '2') {
                    localStorage.setItem('check_flag', '0');
                    localStorage.setItem('pay_pass', '');
                    _this.pay_pass = "";
                    _this.alertCtrl.create({
                        title: "警告",
                        message: data.message,
                        buttons: ["确定"]
                    }).present();
                }
                else {
                    _this.alertCtrl.create({
                        title: "警告",
                        message: data.message,
                        buttons: ["确定"]
                    }).present();
                }
            }, function (err) {
                loading_1.dismiss();
            });
        }
        else {
            this.alertCtrl.create({
                title: "警告",
                message: "请输入0元以上金额",
                buttons: ["确定"]
            }).present();
        }
    };
    ShopPayScreenPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-shop-pay-screen',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\shop-pay-screen\shop-pay-screen.html"*/'<!--\n  Generated template for the ShopPayScreenPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>商家支付</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-row>\n        <ion-col>\n            <ion-list>\n                <ion-item>\n                    <ion-label floating>\n                        <ion-icon name="logo-yen" item-start class="text-primary"></ion-icon>\n                        支付金额\n                    </ion-label>\n                    <ion-input type="number" [(ngModel)]="amount"></ion-input>\n                </ion-item>\n                <ion-item>\n                    <ion-label floating>\n                        <ion-icon name="lock" item-start class="text-primary"></ion-icon>\n                        支付密码\n                    </ion-label>\n                    <ion-input type="password" [(ngModel)]="pay_pass"></ion-input>\n                </ion-item>\n                <ion-item>\n                    <ion-label style="color: #717171;">保存密码吗？</ion-label>\n                    <ion-checkbox color="dark" [checked]="check_flag" (click)="checkedSavePwd()"></ion-checkbox>\n                </ion-item>\n            </ion-list>\n        </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-col class="signup-col">\n            <button ion-button class="login-btn" full color="danger" (click)="pay();">支付</button>\n        </ion-col>\n    </ion-row>\n\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\shop-pay-screen\shop-pay-screen.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], ShopPayScreenPage);
    return ShopPayScreenPage;
}());

//# sourceMappingURL=shop-pay-screen.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UplusSellBoardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__provider_userinfo_model__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__uplus_my_board_uplus_my_board__ = __webpack_require__(229);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the UplusSellBoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UplusSellBoardPage = /** @class */ (function () {
    function UplusSellBoardPage(navCtrl, http, alertCtrl, loadingCtrl, navParams) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.market_list = [];
        this.page_num = 0;
        this.slides_bg = [];
        this.slides_bg = [];
        for (var index = 1; index < 7; index++) {
            this.slides_bg.push({
                id: index
            });
        }
        setTimeout(function () {
            if (_this.slides_bg && _this.slides_bg.length > 0) {
                _this.slides.freeMode = true;
                _this.slides.autoplay = 2000;
                _this.slides.speed = 500;
                _this.slides.loop = true;
                _this.slides.startAutoplay();
            }
        }, 1000);
    }
    UplusSellBoardPage.prototype.slideChanged = function () {
        this.slides.startAutoplay();
    };
    UplusSellBoardPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UplusSellBoardPage');
    };
    UplusSellBoardPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var tmp = localStorage.getItem('infoData');
        this.userInfo = new __WEBPACK_IMPORTED_MODULE_4__provider_userinfo_model__["a" /* UserInfoModel */]();
        this.userInfo = JSON.parse(tmp);
        this.n_uplus = this.userInfo.n_uplus;
        this.page_num = 0;
        var postData = {
            action: 'get',
            nIdx: this.page_num,
            uid: localStorage.getItem('uid')
        };
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.serverUrl + "/get_market_list.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            for (var index = 0; index < data.data.length; index++) {
                _this.market_list.push(data.data[index]);
            }
            _this.market_list = data.data;
        }, function (err) {
            loading.dismiss();
        });
    };
    UplusSellBoardPage.prototype.doInfinite = function (infiniteScroll) {
        this.page_num++;
        this.getMarketList(this.page_num, infiniteScroll);
    };
    UplusSellBoardPage.prototype.getMarketList = function (nIdx, infiniteScroll) {
        var _this = this;
        var postData = {
            action: 'get',
            uid: localStorage.getItem("uid"),
            nIdx: nIdx
        };
        this.http.post(this.serverUrl + "/get_market_list.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            for (var index = 0; index < data.data.length; index++) {
                _this.market_list.push(data.data[index]);
            }
            infiniteScroll.complete();
        });
    };
    UplusSellBoardPage.prototype.showCurrentMarket = function (market) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__uplus_my_board_uplus_my_board__["a" /* UplusMyBoardPage */], { market: market });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Slides */])
    ], UplusSellBoardPage.prototype, "slides", void 0);
    UplusSellBoardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-uplus-sell-board',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\uplus-sell-board\uplus-sell-board.html"*/'<!--\n  Generated template for the UplusSellBoardPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>积分交易所</ion-title>\n        <!-- <ion-buttons end>\n            <button ion-button icon-only (click)="gotoOutPut()">\n                <ion-icon name="add"></ion-icon>\n            </button>\n        </ion-buttons> -->\n\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <div class="slogan_div">\n        <h3>共享富足, 共享快乐</h3>\n    </div>\n    <ion-slides class="top-slider" (ionSlideDidChange)="slideChanged()" *ngIf="slides_bg.length > 0">\n        <ion-slide *ngFor="let s_bg of slides_bg" [ngStyle]="{\'background-image\': \'url(assets/imgs/market/m_\' + s_bg.id + \'.jpg)\'}">\n        </ion-slide>\n    </ion-slides>\n    <ion-list inset class="history-list">\n        <ion-list-header>\n            交易所目录\n        </ion-list-header>\n        <ion-item (click)="showCurrentMarket(\'company\');">\n            <ion-avatar item-start>\n                <img src="assets/imgs/other/market_default.png">\n            </ion-avatar>\n            <h2>公司交易所</h2>\n            <h3>手续费: 15%</h3>\n        </ion-item>\n        <ion-item *ngFor="let market of market_list" (click)="showCurrentMarket(market);">\n            <ion-avatar item-start>\n                <img src="assets/imgs/other/market_default.png" *ngIf="market.state == \'1\'">\n                <img src="assets/imgs/other/market_default_disable.png" *ngIf="market.state == \'0\'">\n            </ion-avatar>\n            <h2 *ngIf="market.state == \'1\'">{{market.title}}</h2>\n            <h3 *ngIf="market.state == \'1\'">手续费: 10%</h3>\n            <h2 class="disable-market" *ngIf="market.state == \'0\'">{{market.title}}</h2>\n            <h3 class="disable-market" *ngIf="market.state == \'0\'">手续费: 10%</h3>\n        </ion-item>\n        <ion-item>\n            <ion-avatar item-start>\n                <img src="assets/imgs/other/market_default_disable.png">\n            </ion-avatar>\n            <h2 class="disable-market">审批中的交易所</h2>\n            <h3 class="disable-market">手续费: 10%</h3>\n        </ion-item>\n        <ion-item>\n            <ion-avatar item-start>\n                <img src="assets/imgs/other/market_default_disable.png">\n            </ion-avatar>\n            <h2 class="disable-market">审批中的交易所</h2>\n            <h3 class="disable-market">手续费: 10%</h3>\n        </ion-item>\n        <ion-item>\n            <ion-avatar item-start>\n                <img src="assets/imgs/other/market_default_disable.png">\n            </ion-avatar>\n            <h2 class="disable-market">审批中的交易所</h2>\n            <h3 class="disable-market">手续费: 10%</h3>\n        </ion-item>\n    </ion-list>\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\uplus-sell-board\uplus-sell-board.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], UplusSellBoardPage);
    return UplusSellBoardPage;
}());

//# sourceMappingURL=uplus-sell-board.js.map

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UplusMyBoardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chart_js__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_chart_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_chart_js__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the UplusMyBoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UplusMyBoardPage = /** @class */ (function () {
    function UplusMyBoardPage(navCtrl, http, alertCtrl, loadingCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.market = "";
        this.title = "";
        this.m_message = "";
        this.requestValue = 0.00;
        this.n_uplus = 0.00;
        this.my_request = "";
    }
    UplusMyBoardPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UplusMyBoardPage');
    };
    UplusMyBoardPage.prototype.ionViewWillEnter = function () {
        // let tmp = localStorage.getItem("infoData");
        // let userData = JSON.parse(tmp);
        // this.n_uplus = userData.n_uplus;
        this.market = this.navParams.get('market');
        this.title = "公司交易所";
        if (this.market.username) {
            this.title = this.market.title;
        }
        this.m_message = this.market.message;
        this.lineChartMethod();
        this.getOldRequest();
    };
    UplusMyBoardPage.prototype.lineChartMethod = function () {
        this.lineChart = new __WEBPACK_IMPORTED_MODULE_3_chart_js__["Chart"](this.lineCanvas.nativeElement, {
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
    };
    UplusMyBoardPage.prototype.getOldRequest = function () {
        var _this = this;
        var postParam = {
            action: 'get',
            uid: localStorage.getItem('uid'),
            mid: this.market.username
        };
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.serverUrl + "/covert_request_action.php", JSON.stringify(postParam))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            _this.my_request = data.data;
            _this.n_uplus = data.n_uplus;
            console.log(_this.my_request);
        }, function (err) {
            loading.dismiss();
        });
    };
    UplusMyBoardPage.prototype.rejectRequest = function (id) {
        var _this = this;
        var postParam = {
            action: 'del',
            id: id
        };
        this.http.post(this.serverUrl + "/covert_request_action.php", JSON.stringify(postParam))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.getOldRequest();
        }, function (err) {
        });
    };
    UplusMyBoardPage.prototype.convertRequest = function () {
        var _this = this;
        var tmp = localStorage.getItem("infoData");
        var userData = JSON.parse(tmp);
        if (this.requestValue < 100) {
            this.alertCtrl.create({
                title: "警告",
                message: "请输入100钱途以上金额",
                buttons: ["确定"]
            }).present();
        }
        else if (parseFloat(this.requestValue) > parseFloat(userData.n_uplus)) {
            this.alertCtrl.create({
                title: "警告",
                message: "您自前无法申请提现",
                buttons: ["确定"]
            }).present();
        }
        else {
            var market_name_1 = "company";
            if (this.market.username) {
                market_name_1 = this.market.username;
            }
            var postParam = {
                uid: localStorage.getItem('uid'),
                market: market_name_1,
                amount: this.requestValue
            };
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.http.post(this.serverUrl + "/covert_request.php", JSON.stringify(postParam))
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                loading_1.dismiss();
                switch (data.error) {
                    case 1:
                        _this.alertCtrl.create({
                            title: '警告',
                            message: '成功！',
                            buttons: ["确定"]
                        }).present();
                        var tmp_1 = localStorage.getItem("infoData");
                        var userData_1 = JSON.parse(tmp_1);
                        userData_1.n_uplus = userData_1.n_uplus - _this.requestValue;
                        if (market_name_1 == 'company') {
                            userData_1.price = userData_1.price + _this.requestValue / 100 - _this.requestValue / 100 * 0.15;
                        }
                        else {
                            userData_1.price = userData_1.price + _this.requestValue / 100 - _this.requestValue / 100 * 0.1;
                        }
                        localStorage.setItem("infoData", JSON.stringify(userData_1));
                        _this.navCtrl.pop();
                        break;
                    case 0:
                        _this.alertCtrl.create({
                            title: '警告',
                            message: 'Another User logged',
                            buttons: ["确定"]
                        }).present();
                        break;
                    default:
                        break;
                }
            }, function (err) {
                loading_1.dismiss();
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('lineCanvas'),
        __metadata("design:type", Object)
    ], UplusMyBoardPage.prototype, "lineCanvas", void 0);
    UplusMyBoardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-uplus-my-board',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\uplus-my-board\uplus-my-board.html"*/'<!--\n  Generated template for the UplusSellBoardPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>{{title}}</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-grid class="cate-grid" *ngIf="m_message">\n        <ion-row>\n            <ion-col col-12>\n                <ion-item class="value-area">\n                    <ion-label>{{m_message}}</ion-label>\n                </ion-item>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n    <ion-list inset class="history-list">\n        <div class="ion-padding">\n            <canvas #lineCanvas></canvas>\n        </div>\n    </ion-list>\n    <ion-list style="margin: 16px;">\n        <ion-item>\n            <ion-label style="color: brown;">可申请量: {{n_uplus}}(POINT)</ion-label>\n        </ion-item>\n        <ion-item>\n            <ion-input type="number" placeholder="0.00" [(ngModel)]="requestValue"></ion-input>\n        </ion-item>\n        <button ion-button block color="main" style="height: 50px;" (click)="convertRequest();">\n            提现\n        </button>\n    </ion-list>\n    <ion-list style="margin: 16px;">\n        <ion-item-sliding *ngFor="let item of my_request">\n            <ion-item>\n                <ion-icon item-start name="information-circle" class="ico-info"></ion-icon>\n                <ion-label>\n                    {{item.amount * 100}}\n                </ion-label>\n                <ion-note item-end class="action-date">\n                    {{item.time}}\n                </ion-note>\n            </ion-item>\n            <ion-item-options side="right">\n                <button ion-button color="danger" (click)="rejectRequest(item.id);">\n                    <ion-icon name="trash"></ion-icon>\n                    <!-- 保留 -->\n                </button>\n            </ion-item-options>\n        </ion-item-sliding>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\uplus-my-board\uplus-my-board.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], UplusMyBoardPage);
    return UplusMyBoardPage;
}());

//# sourceMappingURL=uplus-my-board.js.map

/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserInfoModel; });
var UserInfoModel = /** @class */ (function () {
    function UserInfoModel() {
        this.uid = "";
        this.realname = "";
        this.level = "";
        this.level_name = "";
        this.regtime = "";
        this.price = "";
        this.uplus = "";
        this.price_shop = "";
        this.sex = "";
        this.province = "";
        this.city = "";
        this.area = "";
        this.address = "";
        this.photo = "";
        this.birth = "";
        this.score = "";
        this.mobile = "";
        this.weixin = "";
        this.alipay = "";
        this.bank = "";
        this.sheng = "";
        this.shi = "";
        this.qu = "";
        this.e_coin = "";
        this.market = "";
        this.n_uplus = "";
        this.n_price = "";
        this.n_price_shop = "";
    }
    return UserInfoModel;
}());

//# sourceMappingURL=userinfo-model.js.map

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyWalletCoinOutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__provider_userinfo_model__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the MyWalletUplusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyWalletCoinOutPage = /** @class */ (function () {
    function MyWalletCoinOutPage(navCtrl, navParams, http, app, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.historyData = [];
        this.e_coin = "";
        this.savedData = false;
    }
    MyWalletCoinOutPage.prototype.ionViewDidLoad = function () {
    };
    MyWalletCoinOutPage.prototype.getSavedData = function () {
        var tmp_price = localStorage.getItem("coinData");
        if (tmp_price == undefined || tmp_price == "") {
            return false;
        }
        else {
            this.savedData = true;
            var uplusData = JSON.parse(tmp_price);
            this.historyData = uplusData.historyData;
            this.e_coin = uplusData.e_coin;
            var tmp = localStorage.getItem("infoData");
            var userData = new __WEBPACK_IMPORTED_MODULE_2__provider_userinfo_model__["a" /* UserInfoModel */]();
            userData = JSON.parse(tmp);
            userData.e_coin = this.e_coin;
            localStorage.setItem("infoData", JSON.stringify(userData));
            return true;
        }
    };
    MyWalletCoinOutPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.savedData = this.getSavedData();
        var uid = localStorage.getItem("uid");
        var token = localStorage.getItem("token");
        var postData = {
            action: 'coin_history',
            uid: uid,
            token: token
        };
        var loading = this.loadingCtrl.create();
        if (!this.savedData) {
            loading.present();
        }
        this.http.post(this.serverUrl + "/get_n_pay_history.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (!_this.savedData) {
                loading.dismiss();
            }
            switch (data.error) {
                case 1:
                    localStorage.setItem('uplusData', JSON.stringify(data));
                    _this.historyData = data.historyData;
                    _this.e_coin = data.e_coin;
                    var tmp = localStorage.getItem("infoData");
                    var userData = new __WEBPACK_IMPORTED_MODULE_2__provider_userinfo_model__["a" /* UserInfoModel */]();
                    userData = JSON.parse(tmp);
                    userData.e_coin = _this.e_coin;
                    localStorage.setItem("infoData", JSON.stringify(userData));
                    break;
                case 2:
                    _this.alertCtrl.create({
                        title: '警告',
                        message: 'Another User logged',
                        buttons: ["确定"]
                    }).present();
                    break;
                default:
                    break;
            }
        }, function (err) {
            if (!_this.savedData) {
                loading.dismiss();
            }
        });
    };
    MyWalletCoinOutPage.prototype.gotoBack = function () {
        this.app.getRootNav().pop();
    };
    MyWalletCoinOutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-wallet-coin-out',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my-wallet-coin-out\my-wallet-coin-out.html"*/'<!--\n  Generated template for the MyWalletUplusPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-navbar>\n        <ion-title>广告豆包</ion-title>\n        <!-- <ion-buttons end>\n            <button ion-button icon-only (click)="gotoOutPut()">\n                <ion-icon name="add"></ion-icon>\n            </button>\n        </ion-buttons> -->\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-item class="value-area">\n        <p>广告豆 : {{e_coin}}</p>\n    </ion-item>\n    <ion-list>\n        <ion-item *ngFor="let item of historyData">\n            <ion-label class="value-item">{{item.state}} {{item.e_coin}}</ion-label>\n            <ion-label class="value-item-time">{{item.date}}</ion-label>\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my-wallet-coin-out\my-wallet-coin-out.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
    ], MyWalletCoinOutPage);
    return MyWalletCoinOutPage;
}());

//# sourceMappingURL=my-wallet-coin-out.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyWalletChargePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__provider_userinfo_model__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the MyWalletChargePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyWalletChargePage = /** @class */ (function () {
    function MyWalletChargePage(navCtrl, navParams, http, app, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.historyData = [];
        this.n_price_shop = "";
        this.savedData = false;
    }
    MyWalletChargePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyWalletChargePage');
    };
    MyWalletChargePage.prototype.getSavedData = function () {
        var tmp_price = localStorage.getItem("chargePriceData");
        if (tmp_price == undefined || tmp_price == "") {
            return false;
        }
        else {
            this.savedData = true;
            var shopPriceData = JSON.parse(tmp_price);
            this.historyData = shopPriceData.historyData;
            this.n_price_shop = shopPriceData.other;
            var tmp = localStorage.getItem("infoData");
            var userData = new __WEBPACK_IMPORTED_MODULE_4__provider_userinfo_model__["a" /* UserInfoModel */]();
            userData = JSON.parse(tmp);
            userData.n_price_shop = this.n_price_shop;
            localStorage.setItem("infoData", JSON.stringify(userData));
            return true;
        }
    };
    MyWalletChargePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.savedData = this.getSavedData();
        var uid = localStorage.getItem("uid");
        var token = localStorage.getItem("token");
        var postData = {
            action: 'charge_history',
            uid: uid,
            token: token
        };
        var loading = this.loadingCtrl.create();
        if (!this.savedData) {
            loading.present();
        }
        this.http.post(this.serverUrl + "/get_n_pay_history.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            console.log(data);
            if (!_this.savedData) {
                loading.dismiss();
            }
            switch (data.error) {
                case 1:
                    localStorage.setItem("chargePriceData", JSON.stringify(data));
                    _this.historyData = data.historyData;
                    _this.n_price_shop = data.other;
                    var tmp = localStorage.getItem("infoData");
                    var userData = new __WEBPACK_IMPORTED_MODULE_4__provider_userinfo_model__["a" /* UserInfoModel */]();
                    userData = JSON.parse(tmp);
                    userData.price_shop = _this.n_price_shop;
                    localStorage.setItem("infoData", JSON.stringify(userData));
                    break;
                case 2:
                    _this.alertCtrl.create({
                        title: '警告',
                        message: 'Another User logged',
                        buttons: ["确定"]
                    }).present();
                    break;
                default:
                    break;
            }
        }, function (err) {
            console.log(err);
            if (!_this.savedData) {
                loading.dismiss();
            }
        });
    };
    MyWalletChargePage.prototype.gotoBack = function () {
        this.app.getRootNav().pop();
    };
    MyWalletChargePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-wallet-charge',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my-wallet-charge\my-wallet-charge.html"*/'<!--\n  Generated template for the MyWalletChargePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-buttons start class="back-button-custom">\n            <button ion-button icon-only (click)="gotoBack()">\n                <ion-icon name="arrow-back"></ion-icon>\n            </button>\n        </ion-buttons>\n        <ion-title>充值目录</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-item class="value-area">\n        <p>商家现金 : ¥{{n_price_shop}}</p>\n    </ion-item>\n    <ion-list>\n        <ion-item *ngFor="let item of historyData">\n            <ion-label class="value-item">{{item.state}} {{item.price}}</ion-label>\n            <ion-label class="value-item-time">{{item.date}}</ion-label>\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my-wallet-charge\my-wallet-charge.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
    ], MyWalletChargePage);
    return MyWalletChargePage;
}());

//# sourceMappingURL=my-wallet-charge.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__my_info_qr_code_my_info_qr_code__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__my_info_more_my_info_more__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_transfer__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_path__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__provider_userinfo_model__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var MyInfoPage = /** @class */ (function () {
    function MyInfoPage(navCtrl, navParams, camera, transfer, file, filePath, actionsheetCtrl, toastCtrl, platform, loadingCtrl, alertCtrl, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.filePath = filePath;
        this.actionsheetCtrl = actionsheetCtrl;
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.username = "";
        this.realname = "";
        this.photo = "";
        this.lastImage = null;
    }
    MyInfoPage.prototype.ionViewDidLoad = function () {
    };
    MyInfoPage.prototype.ionViewWillEnter = function () {
        var userInfo = localStorage.getItem('infoData');
        if (userInfo) {
            var userData = JSON.parse(userInfo);
            this.username = userData.uid;
            this.realname = userData.realname;
            this.photo = userData.photo;
        }
    };
    MyInfoPage.prototype.gotoQrCode = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__my_info_qr_code_my_info_qr_code__["a" /* MyInfoQrCodePage */]);
    };
    MyInfoPage.prototype.gotoIntro = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__my_info_more_my_info_more__["a" /* MyInfoMorePage */]);
    };
    MyInfoPage.prototype.presentActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionsheetCtrl.create({
            title: '',
            buttons: [
                {
                    text: '图片选择',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                },
                {
                    text: '连接相机',
                    handler: function () {
                        _this.takePicture(_this.camera.PictureSourceType.CAMERA);
                    }
                },
                {
                    text: '取消',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    };
    MyInfoPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        // Create options for the Camera Dialog
        var options = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
        // Get the data of an image
        this.camera.getPicture(options).then(function (imagePath) {
            // Special handling for Android library
            if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                _this.filePath.resolveNativePath(imagePath)
                    .then(function (filePath) {
                    var correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                    var currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                    _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
                });
            }
            else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                _this.copyFileToLocalDir(correctPath, currentName, _this.createFileName());
            }
        }, function (err) {
            // this.presentToast('Error while selecting image.');
        });
    };
    MyInfoPage.prototype.createFileName = function () {
        var d = new Date(), n = d.getTime(), newFileName = n + ".jpg";
        return newFileName;
    };
    // Copy the image to a local folder
    MyInfoPage.prototype.copyFileToLocalDir = function (namePath, currentName, newFileName) {
        var _this = this;
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            _this.lastImage = newFileName;
            _this.uploadImage();
        }, function (error) {
            // this.presentToast('Error while storing file.');
        });
    };
    MyInfoPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    };
    // Always get the accurate path to your apps folder
    MyInfoPage.prototype.pathForImage = function (img) {
        if (img === null) {
            return '';
        }
        else {
            return cordova.file.dataDirectory + img;
        }
    };
    MyInfoPage.prototype.uploadImage = function () {
        var _this = this;
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
            params: { 'fileName': filename },
        };
        var fileTransfer = this.transfer.create();
        this.loading = this.loadingCtrl.create();
        this.loading.present();
        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, url, options).then(function (data) {
            var postData = {
                action: 'uploaded',
                uid: localStorage.getItem('uid'),
                photo: filename.toString()
            };
            _this.http.post(_this.serverUrl + "/photo_upload.php", JSON.stringify(postData))
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.loading.dismissAll();
                if (data.error == 1) {
                    var tmp = localStorage.getItem('infoData');
                    _this.userModel = new __WEBPACK_IMPORTED_MODULE_10__provider_userinfo_model__["a" /* UserInfoModel */]();
                    _this.userModel = JSON.parse(tmp);
                    _this.userModel.photo = data.photo;
                    _this.photo = data.photo;
                    localStorage.setItem('infoData', JSON.stringify(_this.userModel));
                    _this.presentToast("更改头像成功");
                }
                else {
                    _this.presentToast("更改头像失败");
                }
            }, function (err) {
                _this.loading.dismissAll();
                _this.presentToast("更改头像失败");
            });
        }, function (err) {
            _this.loading.dismissAll();
            _this.presentToast("更改头像失败");
        });
    };
    MyInfoPage.prototype.changeName = function () {
        var _this = this;
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
            buttons: [
                {
                    text: '取消',
                    handler: function (data) {
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        _this.realname = data.field;
                        var postData = {
                            username: _this.username,
                            realname: _this.realname,
                            action: "change_name"
                        };
                        var loading = _this.loadingCtrl.create();
                        loading.present();
                        _this.http.post(_this.serverUrl + "/change_name.php", JSON.stringify(postData))
                            .map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            loading.dismiss();
                            if (data.error == 1) {
                                var tmp = localStorage.getItem('infoData');
                                _this.userModel = new __WEBPACK_IMPORTED_MODULE_10__provider_userinfo_model__["a" /* UserInfoModel */]();
                                _this.userModel = JSON.parse(tmp);
                                _this.userModel.realname = _this.realname;
                                localStorage.setItem('infoData', JSON.stringify(_this.userModel));
                            }
                        }, function (err) {
                            loading.dismiss();
                        });
                    }
                }
            ]
        }).present();
    };
    MyInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-info',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my-info\my-info.html"*/'<!--\n  Generated template for the MyInfoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>个人信息</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-list>\n        <ion-item class="border-bottom" (click)="presentActionSheet();">\n            <h2>头像</h2>\n            <ion-thumbnail item-end>\n                <img src="assets/imgs/other/default.png" *ngIf="!photo">\n                <img src="{{serverUrl}}/profile_imgs/{{photo}}" *ngIf="photo">\n            </ion-thumbnail>\n        </ion-item>\n        <button ion-item class="border-bottom" (click)="changeName();">\n            <ion-label class="value-item">名字</ion-label>\n            <ion-label class="value-item-time">{{realname}}</ion-label>\n        </button>\n        <button ion-item class="border-bottom">\n          <ion-label class="value-item">会员账号</ion-label>\n            <ion-label class="value-item-time">{{username}}</ion-label>\n        </button>\n        <button ion-item class="border-bottom" (click)="gotoQrCode();">\n            <ion-label class="value-item">我的二维码</ion-label>\n            <ion-label class="value-item-time">\n                <img src="assets/imgs/other/default_qrcode.png" alt="" class="qr-code">\n            </ion-label>\n        </button>\n        <button ion-item class="border-bottom" (click)="gotoIntro();">\n            <ion-label class="value-item">更多</ion-label>\n            <ion-label class="value-item-time"></ion-label>\n        </button>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my-info\my-info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_path__["a" /* FilePath */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_8__angular_http__["a" /* Http */]])
    ], MyInfoPage);
    return MyInfoPage;
}());

//# sourceMappingURL=my-info.js.map

/***/ }),

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyInfoMorePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__provider_userinfo_model__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__my_ming_pian_my_ming_pian__ = __webpack_require__(361);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the MyInfoMorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyInfoMorePage = /** @class */ (function () {
    function MyInfoMorePage(navCtrl, navParams, alertCtrl, loadingCtrl, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.tmpDay = [{ value: '01' }, { value: '02' }, { value: '03' }, { value: '04' }, { value: '05' },
            { value: '06' }, { value: '07' }, { value: '08' }, { value: '09' }, { value: '10' }, { value: '11' },
            { value: '12' }, { value: '13' }, { value: '14' }, { value: '15' }, { value: '16' }, { value: '17' },
            { value: '18' }, { value: '19' }, { value: '20' }, { value: '21' }, { value: '22' }, { value: '23' },
            { value: '24' }, { value: '25' }, { value: '26' }, { value: '27' }, { value: '28' }, { value: '29' },
            { value: '30' }, { value: '31' }];
        this.tmpMonth = [
            { value: '01' },
            { value: '02' },
            { value: '03' },
            { value: '04' },
            { value: '05' },
            { value: '06' },
            { value: '07' },
            { value: '08' },
            { value: '09' },
            { value: '10' },
            { value: '11' },
            { value: '12' }
        ];
        this.tmpYear = [];
        for (var index = 1910; index <= 2020; index++) {
            this.tmpYear.push({ value: index });
        }
    }
    MyInfoMorePage.prototype.ionViewDidLoad = function () {
    };
    MyInfoMorePage.prototype.ionViewWillEnter = function () {
        var tmp = localStorage.getItem('infoData');
        var tmpData = JSON.parse(tmp);
        this.phone = tmpData.mobile;
        this.address = tmpData.address;
        this.province = tmpData.province;
        this.city = tmpData.city;
        this.area = tmpData.area;
        this.sheng = tmpData.sheng;
        this.shi = tmpData.shi;
        this.qu = tmpData.qu;
        this.sex = tmpData.sex;
        var tmp_birth = tmpData.birth.split(".");
        this.year = tmp_birth[0];
        if (tmp_birth[1]) {
            this.month = tmp_birth[1];
        }
        if (tmp_birth[2]) {
            this.day = tmp_birth[2];
        }
    };
    MyInfoMorePage.prototype.changeMobile = function () {
        var _this = this;
        this.alertCtrl.create({
            title: "手机号码",
            inputs: [
                {
                    name: 'mobile',
                    placeholder: '手机号码',
                    type: 'number',
                    value: this.phone
                },
            ],
            buttons: [
                {
                    text: '取消',
                    handler: function (data) {
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        _this.phone = data.mobile;
                    }
                }
            ]
        }).present();
    };
    MyInfoMorePage.prototype.changeProvince = function () {
        console.log('currently province can not be changed');
    };
    MyInfoMorePage.prototype.changeAddress = function () {
        var _this = this;
        this.alertCtrl.create({
            title: "地址",
            inputs: [
                {
                    name: 'address',
                    placeholder: '地址',
                    type: 'text',
                    value: this.address
                },
            ],
            buttons: [
                {
                    text: '取消',
                    handler: function (data) {
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        _this.address = data.address;
                    }
                }
            ]
        }).present();
    };
    MyInfoMorePage.prototype.saveChanged = function () {
        var _this = this;
        if (this.year == null || this.month == null || this.day == null) {
            this.customAlert("警告", "请输入您的生年日期");
        }
        else {
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            var postData = {
                action: 'save',
                uid: localStorage.getItem('uid'),
                mobile: this.phone,
                birth: this.year + "." + this.month + "." + this.day,
                sex: this.sex,
                address: this.address,
            };
            this.http.post(this.serverUrl + "/saveinfo.php", JSON.stringify(postData))
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                loading_1.dismiss();
                if (data.error == 1) {
                    var tmp = localStorage.getItem('infoData');
                    _this.userModel = new __WEBPACK_IMPORTED_MODULE_4__provider_userinfo_model__["a" /* UserInfoModel */]();
                    _this.userModel = JSON.parse(tmp);
                    _this.userModel.mobile = _this.phone;
                    _this.userModel.sex = _this.sex;
                    _this.userModel.birth = _this.year + "." + _this.month + "." + _this.day;
                    _this.userModel.address = _this.address;
                    localStorage.setItem('infoData', JSON.stringify(_this.userModel));
                }
                else {
                    _this.customAlert('警告', '网络失败!');
                }
            }, function (err) {
                loading_1.dismiss();
            });
        }
    };
    MyInfoMorePage.prototype.customAlert = function (title, message) {
        this.alertCtrl.create({
            title: title,
            message: message,
            buttons: ["确定"]
        }).present();
    };
    MyInfoMorePage.prototype.changeMingPianInform = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__my_ming_pian_my_ming_pian__["a" /* MyMingPianPage */]);
    };
    MyInfoMorePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-info-more',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my-info-more\my-info-more.html"*/'<!--\n  Generated template for the MyInfoMorePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>更多信息</ion-title>\n        <ion-buttons end (click)="saveChanged();">\n            <button ion-button>\n                保管\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-list>\n        <button ion-item class="border-bottom" (click)="changeMobile();">\n          <ion-label class="value-item">手机号码</ion-label>\n          <ion-label class="value-item-time">{{phone}}</ion-label>\n        </button>\n        <ion-item>\n            <ion-label>出生日期</ion-label>\n            <ion-select [(ngModel)]="year" placeholder="年">\n                <ion-option *ngFor="let item of tmpYear" value="{{item.value}}">{{item.value}}</ion-option>\n            </ion-select>\n            <ion-select [(ngModel)]="month" placeholder="月">\n                <ion-option *ngFor="let item of tmpMonth" value="{{item.value}}">{{item.value}}</ion-option>\n            </ion-select>\n            <ion-select [(ngModel)]="day" placeholder="日">\n                <ion-option *ngFor="let item of tmpDay" value="{{item.value}}">{{item.value}}</ion-option>\n            </ion-select>\n        </ion-item>\n        <ion-item>\n            <ion-label>性别</ion-label>\n            <ion-select [(ngModel)]="sex">\n                <ion-option value="男">男</ion-option>\n                <ion-option value="女">女</ion-option>\n            </ion-select>\n        </ion-item>\n        <button ion-item class="border-bottom" (click)="changeProvince();">\n          <ion-label class="value-item">省份、城市、地区</ion-label>\n          <ion-label class="value-item-time">{{province}}/{{area}}/{{city}}</ion-label>\n        </button>\n        <button ion-item class="border-bottom" (click)="changeAddress();">\n          <ion-label class="value-item">地址</ion-label>\n          <ion-label class="value-item-time">{{address}}</ion-label>\n        </button>\n        <button ion-item class="border-bottom" (click)="changeMingPianInform();">\n          <ion-label class="value-item">名片修改</ion-label>\n        </button>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my-info-more\my-info-more.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]])
    ], MyInfoMorePage);
    return MyInfoMorePage;
}());

//# sourceMappingURL=my-info-more.js.map

/***/ }),

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyMingPianPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__my_info_ming_pian_my_info_ming_pian__ = __webpack_require__(362);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the MyMingPianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyMingPianPage = /** @class */ (function () {
    function MyMingPianPage(navCtrl, navParams, http, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.friendData = "";
        this.photo = "";
        this.realname = "";
        this.other_cate = [];
        this.card_style = 1;
    }
    MyMingPianPage.prototype.ionViewDidLoad = function () {
    };
    MyMingPianPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var postData = {
            uid: localStorage.getItem('uid'),
            action: 'me'
        };
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.serverUrl + "/get_user_mingpian.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            if (data.error == 1) {
                _this.photo = data.data.photo;
                _this.realname = data.data.realname;
                if (data.data.mingpian) {
                    _this.friendData = data.data.mingpian;
                    _this.other_cate = _this.friendData.other_cate.split("--");
                    _this.card_style = _this.friendData.card_style;
                }
            }
            else {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__my_info_ming_pian_my_info_ming_pian__["a" /* MyInfoMingPianPage */]);
            }
        }, function (err) {
            loading.dismiss();
        });
    };
    MyMingPianPage.prototype.changeMingpian = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__my_info_ming_pian_my_info_ming_pian__["a" /* MyInfoMingPianPage */]);
    };
    MyMingPianPage.prototype.changeStyle = function () {
        var postData = {
            uid: localStorage.getItem('uid'),
            style: this.card_style,
            action: 'change'
        };
        this.http.post(this.serverUrl + "/change_style.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
        }, function (err) {
        });
    };
    MyMingPianPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-ming-pian',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my-ming-pian\my-ming-pian.html"*/'<!--\n  Generated template for the MyMingPianPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>我的名片</ion-title>\n        <ion-buttons end (click)="changeMingpian()">\n            <button ion-button>\n                修改内容\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-list>\n        <ion-item>\n            <ion-label>名片格式</ion-label>\n            <ion-select [(ngModel)]="card_style" (ngModelChange)="changeStyle($event)">\n                <ion-option value="1">名片格式 1</ion-option>\n                <ion-option value="2">名片格式 2</ion-option>\n                <ion-option value="3">名片格式 3</ion-option>\n            </ion-select>\n        </ion-item>\n    </ion-list>\n\n    <ion-card class="card{{card_style}}">\n        <div class="cover-layer"></div>\n        <div class="card-top{{card_style}}"></div>\n        <div class="card-bottom{{card_style}}"></div>\n        <ion-card-content>\n            <ion-grid>\n                <ion-row>\n                    <ion-col>\n                        <h1>{{friendData.c_name}}</h1>\n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col col-6 class="user-img">\n                        <img src="assets/imgs/other/default.png" *ngIf="!photo">\n                        <img src="{{serverUrl}}/profile_imgs/{{photo}}" *ngIf="photo">\n                    </ion-col>\n                    <ion-col col-6>\n                        <h2>{{realname}}</h2>\n                        <h3>{{friendData.job_cate}}</h3>\n                        <button ion-button icon-start small color="light" clear *ngIf="friendData.mobile1">\n                            <ion-icon name="call"></ion-icon>\n                            {{friendData.mobile1}}\n                        </button>\n                        <button ion-button icon-start small color="light" clear *ngIf="friendData.mobile2">\n                            <ion-icon name="call"></ion-icon>\n                            {{friendData.mobile2}}\n                        </button>\n                        <button ion-button icon-start small color="light" clear *ngIf="friendData.mobile3">\n                            <ion-icon name="call"></ion-icon>\n                            {{friendData.mobile3}}\n                        </button>\n                        <button ion-button icon-start small color="light" clear *ngIf="friendData.phone1">\n                            <ion-icon name="phone-portrait"></ion-icon>\n                            {{friendData.phone1}}\n                        </button>\n                        <button ion-button icon-start small color="light" clear *ngIf="friendData.phone2">\n                            <ion-icon name="phone-portrait"></ion-icon>\n                            {{friendData.phone2}}\n                        </button>\n                        <button ion-button icon-start small color="light" clear *ngIf="friendData.phone3">\n                            <ion-icon name="phone-portrait"></ion-icon>\n                            {{friendData.phone3}}\n                        </button>\n                        <!-- <p *ngFor="let cate of other_cate; let nIdx = index"><u>其他社会职务{{nIdx + 1}}:</u><br>{{cate}}</p> -->\n                        <!-- <p *ngIf="friendData.other_cate">其他社会职务:</p>\n                        <p *ngIf="friendData.other_cate">{{friendData.other_cate}}</p> -->\n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col>\n                        <p *ngFor="let cate of other_cate; let nIdx = index"><u>其他社会职务{{nIdx + 1}}: </u>{{cate}}</p>\n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col *ngIf="friendData.job_desc">\n                        <p><u>社会贡献:</u></p>\n                        <p>{{friendData.job_desc}}</p>\n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col>\n                        <p><u>地址:</u> {{friendData.c_address}}</p>\n                        <p><u>邮箱:</u> {{friendData.email}}</p>\n                        <p><u>网址:</u> {{friendData.homepage}}</p>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-card-content>\n        <!-- <ion-row>\n            <ion-col>\n                <button ion-button icon-start clear small (click)="callFriend(friendData.mobile)">\n                    <ion-icon name="call"></ion-icon>\n                    <div>{{friendData.mobile}}</div>\n                </button>\n            </ion-col>\n        </ion-row> -->\n    </ion-card>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my-ming-pian\my-ming-pian.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
    ], MyMingPianPage);
    return MyMingPianPage;
}());

//# sourceMappingURL=my-ming-pian.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyInfoMingPianPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the MyInfoMingPianPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyInfoMingPianPage = /** @class */ (function () {
    function MyInfoMingPianPage(navCtrl, alertCtrl, loadingCtrl, http, navParams) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.navParams = navParams;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.company = "";
        this.job_cate = "";
        this.other_cate = "";
        this.other_cate_arr = [];
        this.job_desc = "";
        this.mobile1 = "";
        this.mobile2 = "";
        this.mobile3 = "";
        this.phone1 = "";
        this.phone2 = "";
        this.phone3 = "";
        this.c_address = "";
        this.email = "";
        this.homepage = "";
        this.clicked_other = 0;
    }
    MyInfoMingPianPage.prototype.ionViewDidLoad = function () {
    };
    MyInfoMingPianPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.clicked_other = 0;
        var postParam = {
            uid: localStorage.getItem('uid'),
            action: 'get'
        };
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.serverUrl + "/get_comp_info.php", JSON.stringify(postParam))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            if (data.error == 1) {
                _this.company = data.data.c_name;
                _this.job_cate = data.data.job_cate;
                _this.other_cate = data.data.other_cate;
                var cate_tmp = _this.other_cate.split("--");
                if (cate_tmp.length == 0) {
                    _this.other_cate_arr[0] = "";
                }
                else {
                    _this.other_cate_arr = cate_tmp;
                    if (_this.other_cate_arr[_this.other_cate_arr.length - 1] != "") {
                        _this.other_cate_arr[_this.other_cate_arr.length] = "";
                    }
                }
                _this.job_desc = data.data.job_desc;
                _this.mobile1 = data.data.mobile1;
                _this.mobile2 = data.data.mobile2;
                _this.mobile3 = data.data.mobile3;
                _this.phone1 = data.data.phone1;
                _this.phone2 = data.data.phone2;
                _this.phone3 = data.data.phone3;
                _this.c_address = data.data.c_address;
                _this.email = data.data.email;
                _this.homepage = data.data.homepage;
            }
        }, function (err) {
            loading.dismiss();
        });
    };
    MyInfoMingPianPage.prototype.saveChanged = function () {
        var postData = {
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
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.serverUrl + "/get_comp_info.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loading.dismiss();
        }, function (err) {
            loading.dismiss();
        });
    };
    MyInfoMingPianPage.prototype.changeCompany = function () {
        this.changeField("company", "单位名称", "text");
    };
    MyInfoMingPianPage.prototype.changeJobCate = function () {
        this.changeField("job_cate", "职务", "text");
    };
    MyInfoMingPianPage.prototype.changeOtherCate = function (param) {
        this.clicked_other = param;
        this.changeField("other_cate", "其他社会职务" + (param + 1), "text");
    };
    MyInfoMingPianPage.prototype.changeMobile = function (nIdx) {
        this.changeField("mobile" + nIdx, "手机号码" + nIdx, "phone");
    };
    MyInfoMingPianPage.prototype.changePhone = function (nIdx) {
        this.changeField("phone" + nIdx, "电话号码" + nIdx, "phone");
    };
    MyInfoMingPianPage.prototype.changeCAddress = function () {
        this.changeField("c_address", "地址", "text");
    };
    MyInfoMingPianPage.prototype.changeEmail = function () {
        this.changeField("email", "邮箱", "email");
    };
    MyInfoMingPianPage.prototype.changeHomepage = function () {
        this.changeField("homepage", "网址", "text");
    };
    MyInfoMingPianPage.prototype.changeField = function (field, alertTitle, type) {
        var _this = this;
        var fieldValue = "";
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
            buttons: [
                {
                    text: '取消',
                    handler: function (data) {
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        fieldValue = data.field;
                        switch (field) {
                            case "company":
                                _this.company = fieldValue;
                                break;
                            case "job_cate":
                                _this.job_cate = fieldValue;
                                break;
                            case "other_cate":
                                if (fieldValue) {
                                    _this.other_cate_arr[_this.clicked_other] = fieldValue;
                                    _this.clicked_other++;
                                    if (_this.clicked_other >= _this.other_cate_arr.length) {
                                        _this.other_cate_arr[_this.clicked_other] = "";
                                    }
                                }
                                else {
                                    if (_this.other_cate_arr.length != 1) {
                                        _this.other_cate_arr.splice(_this.clicked_other, 1);
                                    }
                                    else {
                                        _this.other_cate_arr[_this.clicked_other] = "";
                                    }
                                }
                                _this.other_cate = _this.other_cate_arr[0];
                                for (var a = 1; a < _this.other_cate_arr.length; a++) {
                                    if (_this.other_cate_arr[a]) {
                                        _this.other_cate += "--" + _this.other_cate_arr[a];
                                    }
                                }
                                break;
                            case "job_desc":
                                _this.job_desc = fieldValue;
                                break;
                            case "mobile1":
                                _this.mobile1 = fieldValue;
                                break;
                            case "mobile2":
                                _this.mobile2 = fieldValue;
                                break;
                            case "mobile3":
                                _this.mobile3 = fieldValue;
                                break;
                            case "phone1":
                                _this.phone1 = fieldValue;
                                break;
                            case "phone2":
                                _this.phone2 = fieldValue;
                                break;
                            case "phone3":
                                _this.phone3 = fieldValue;
                                break;
                            case "c_address":
                                _this.c_address = fieldValue;
                                break;
                            case "email":
                                _this.email = fieldValue;
                                break;
                            case "homepage":
                                _this.homepage = fieldValue;
                                break;
                            default:
                                break;
                        }
                    }
                }
            ]
        }).present();
    };
    MyInfoMingPianPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-info-ming-pian',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my-info-ming-pian\my-info-ming-pian.html"*/'<!--\n  Generated template for the MyInfoMingPianPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>名片信息</ion-title>\n        <ion-buttons end (click)="saveChanged();">\n            <button ion-button>\n                保管\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-list>\n        <button ion-item class="border-bottom" (click)="changeCompany();">\n          <ion-label class="value-item">单位名称</ion-label>\n          <ion-label class="value-item-time">{{company}}</ion-label>\n        </button>\n        <button ion-item class="border-bottom" (click)="changeJobCate();">\n          <ion-label class="value-item">职务</ion-label>\n          <ion-label class="value-item-time">{{job_cate}}</ion-label>\n        </button>\n        <button ion-item class="border-bottom" *ngFor="let other_item of other_cate_arr; let nIdx = index" (click)="changeOtherCate(nIdx);">\n          <ion-label class="value-item">其他社会职务{{nIdx + 1}}</ion-label>\n          <ion-label class="value-item-time">{{other_item}}</ion-label>\n        </button>\n        <button ion-item class="border-bottom" *ngIf="!other_cate_arr.length" (click)="changeOtherCate(0);">\n          <ion-label class="value-item">其他社会职务1</ion-label>\n          <ion-label class="value-item-time"></ion-label>\n        </button>\n        <button ion-item class="border-bottom">\n          <ion-label class="value-item">我的社会贡献</ion-label>\n        </button>\n        <ion-textarea class="desc_area" [(ngModel)]="job_desc"></ion-textarea>\n        <button ion-item class="border-bottom set_mingpian" (click)="changeMobile(1);">\n          <ion-label class="value-item">手机号码1</ion-label>\n          <ion-label class="value-item-time">{{mobile1}}</ion-label>\n        </button>\n        <button ion-item class="border-bottom" (click)="changeMobile(2);">\n          <ion-label class="value-item">手机号码2</ion-label>\n          <ion-label class="value-item-time">{{mobile2}}</ion-label>\n        </button>\n        <button ion-item class="border-bottom" (click)="changeMobile(3);">\n          <ion-label class="value-item">手机号码3</ion-label>\n          <ion-label class="value-item-time">{{mobile3}}</ion-label>\n        </button>\n        <button ion-item class="border-bottom set_mingpian" (click)="changePhone(1);">\n          <ion-label class="value-item">电话号码1</ion-label>\n          <ion-label class="value-item-time">{{phone1}}</ion-label>\n        </button>\n        <button ion-item class="border-bottom" (click)="changePhone(2);">\n          <ion-label class="value-item">电话号码2</ion-label>\n          <ion-label class="value-item-time">{{phone2}}</ion-label>\n        </button>\n        <button ion-item class="border-bottom" (click)="changePhone(3);">\n          <ion-label class="value-item">电话号码3</ion-label>\n          <ion-label class="value-item-time">{{phone3}}</ion-label>\n        </button>\n        <button ion-item class="border-bottom set_mingpian" (click)="changeCAddress();">\n          <ion-label class="value-item">地址</ion-label>\n          <ion-label class="value-item-time">{{c_address}}</ion-label>\n        </button>\n        <button ion-item class="border-bottom" (click)="changeEmail();">\n          <ion-label class="value-item">邮箱</ion-label>\n          <ion-label class="value-item-time">{{email}}</ion-label>\n        </button>\n        <button ion-item class="border-bottom" (click)="changeHomepage();">\n          <ion-label class="value-item">网址</ion-label>\n          <ion-label class="value-item-time">{{homepage}}</ion-label>\n        </button>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my-info-ming-pian\my-info-ming-pian.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], MyInfoMingPianPage);
    return MyInfoMingPianPage;
}());

//# sourceMappingURL=my-info-ming-pian.js.map

/***/ }),

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyLevelPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyLevelPage = /** @class */ (function () {
    function MyLevelPage(navCtrl, navParams, sanitizer, http, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sanitizer = sanitizer;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.rank = 0;
        this.up_rank = 0;
        this.rank_name = "";
        this.bgs = ["bg1.jpg", "bg2.jpg", "bg3.jpg"];
    }
    MyLevelPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        setTimeout(function () {
            _this.slides.freeMode = true;
            _this.slides.autoplay = 2000;
            _this.slides.speed = 500;
            _this.slides.loop = true;
            _this.slides.autoplayDisableOnInteraction = false;
            _this.slides.startAutoplay();
        }, 1000);
    };
    MyLevelPage.prototype.ionViewWillLeave = function () {
        this.slides.stopAutoplay();
    };
    MyLevelPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.uid = localStorage.getItem('uid');
        var postData = {
            uid: localStorage.getItem('uid')
        };
        this.http.post(this.serverUrl + "/get_member_level.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (data.err == 0) {
                _this.rank = data.rank;
                _this.up_rank = data.rank;
                _this.rank_name = data.rank_name;
            }
            else {
                // uid doesn't exist 
            }
        }, function (err) {
        });
    };
    MyLevelPage.prototype.changeRank = function () {
    };
    MyLevelPage.prototype.pay = function (pay_type) {
        var _this = this;
        if (this.up_rank != this.rank) {
            var money = 0;
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
            }
            if (pay_type == 1) {
                this.alertCtrl.create({
                    title: "",
                    message: "Doesn't provide the Weixin yet",
                    buttons: ["确定"]
                }).present();
            }
            else {
                var postParam = {
                    'pay_item': 'level_up',
                    'uid': localStorage.getItem('uid'),
                    'rank': this.up_rank,
                    'price': money
                };
                this.http.post(this.serverUrl + "/payment/alipay/order.php", JSON.stringify(postParam))
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    var payInfo = _this.unescapeHTML(data.response);
                    cordova.plugins.alipay.payment(payInfo, function (e) {
                        //TODO 支付成功
                        _this.alertCtrl.create({
                            title: "警告",
                            message: '支付成功',
                            buttons: ["确定"]
                        }).present();
                    }, function (e) {
                        //TODO 支付失败                          
                        _this.alertCtrl.create({
                            title: "警告",
                            message: "支付失败" + e.resultStatus + "," + e.memo,
                            buttons: ["确定"]
                        }).present();
                    });
                }, function (err) {
                    _this.alertCtrl.create({
                        title: "警告",
                        message: err,
                        buttons: ["确定"]
                    }).present();
                });
            }
        }
        else {
            this.alertCtrl.create({
                title: "",
                message: "请选择等级",
                buttons: ["确定"]
            }).present();
        }
    };
    MyLevelPage.prototype.slideChanged = function () {
        this.slides.startAutoplay();
    };
    MyLevelPage.prototype.unescapeHTML = function (a) {
        var aNew = "" + a;
        return aNew.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Slides */])
    ], MyLevelPage.prototype, "slides", void 0);
    MyLevelPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-level',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my-level\my-level.html"*/'<!--\n  Generated template for the MyLevelPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>我的等级</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n    <!--img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg"-->\n    <ion-slides class="top-slider" (ionSlideDidChange)="slideChanged()" *ngIf="bgs.length > 1">\n        <ion-slide *ngFor="let name of bgs" [ngStyle]="{\'background-image\': \'url(http://unak.vip/uplus/Resource/plugins/assets/admin/pages/media/bg/\' + name + \')\'}">\n        </ion-slide>\n    </ion-slides>    \n    <div class="center">\n        <p class="c1">会员注册</p>\n        <p class="c2">您目前是{{rank_name}}，我们一起加把劲，共享未来，奔向美丽钱途哟！</p>\n        <div *ngIf="rank >= 5">\n            <p class="c2">您目前是星级最高级别，爵位晋级是以您的共享值自动升级的哟！</p>\n        </div>\n        <div *ngIf="rank < 5">            \n            <ion-item>\n                <ion-label>会员级别:</ion-label>\n                <ion-select interface="popover" placeholder="请选择会员等级" [(ngModel)]="up_rank" (ngModelChange)="changeRank($event)">\n                    <ion-option value="1" *ngIf="rank < 1">VIP会员</ion-option>\n                    <ion-option value="3" *ngIf="rank < 3">广告商</ion-option>\n                    <ion-option value="5" *ngIf="rank < 5">金牌广告商</ion-option>\n                </ion-select>\n            </ion-item>            \n\n            <ion-grid>\n                <ion-row>\n                    <ion-col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6>\n                        <button ion-button color="secondary" outline (click)="pay(1);">\n                            <p class="price">微信支付</p>\n                        </button>\n                    </ion-col>\n                    <ion-col col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6>\n                        <button ion-button color="secondary" outline (click)="pay(2);">\n                            <p class="price">支付宝支付</p>\n                        </button>\n                    </ion-col>                \n                </ion-row>       \n            </ion-grid>\n\n        </div>        \n    </div>\n    <div class="copyright">\n        Copyright ©2006-2021,All Rights Reserved.\n    </div>   \n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my-level\my-level.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], MyLevelPage);
    return MyLevelPage;
}());

//# sourceMappingURL=my-level.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyShopMolePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__my_charge_my_charge__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__provider_userinfo_model__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyShopMolePage = /** @class */ (function () {
    function MyShopMolePage(navCtrl, alertCtrl, navParams, sanitizer) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.sanitizer = sanitizer;
    }
    MyShopMolePage.prototype.ionViewDidLoad = function () {
        this.uid = localStorage.getItem('uid');
        // this.shop_mole_url = this.transform("http://unak.vip/uplus/qr_code/Template/shop/shop_add.php?uid=" + localStorage.getItem('uid'));
        this.shop_mole_url = this.transform("http://unak.vip/uplus/qr_code/n_qr_mole_generate.php?data=" + localStorage.getItem('uid'));
    };
    MyShopMolePage.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    MyShopMolePage.prototype.changeMoleInfo = function () {
        var _this = this;
        var tmp = localStorage.getItem("infoData");
        var userData = new __WEBPACK_IMPORTED_MODULE_4__provider_userinfo_model__["a" /* UserInfoModel */]();
        userData = JSON.parse(tmp);
        if (userData.level >= '5') {
        }
        else {
            this.alertCtrl.create({
                title: '警告',
                message: '注册商家需支付广告费用!',
                buttons: [
                    {
                        text: '确定',
                        handler: function (data) {
                            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__my_charge_my_charge__["a" /* MyChargePage */]);
                        }
                    }
                ]
            }).present();
        }
    };
    MyShopMolePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({ name: 'safe' }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-shop-mole',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my-shop-mole\my-shop-mole.html"*/'<!--\n  Generated template for the MyShopMolePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>我的商家</ion-title>\n        <ion-buttons end (click)="changeMoleInfo()">\n            <button ion-button icon-only>\n                <ion-icon name="create"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <iframe width="100%" height="100%" [src]="shop_mole_url" frameborder="0"></iframe>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my-shop-mole\my-shop-mole.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */]])
    ], MyShopMolePage);
    return MyShopMolePage;
}());

//# sourceMappingURL=my-shop-mole.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__setting_change_password_setting_change_password__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__setting_pay_option_setting_pay_option__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__about_app_about_app__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_save_user_name_save_user_name__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__setting_change_pay_password_setting_change_pay_password__ = __webpack_require__(369);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingPage = /** @class */ (function () {
    function SettingPage(navCtrl, navParams, alertCtrl, loadingCtrl, http, saveUserIDProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.saveUserIDProvider = saveUserIDProvider;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
    }
    SettingPage.prototype.ionViewDidLoad = function () {
    };
    SettingPage.prototype.logout = function () {
        var _this = this;
        this.alertCtrl.create({
            title: "通知",
            message: "确定退出吗？",
            buttons: [
                {
                    text: "是",
                    handler: function () {
                        var loading = _this.loadingCtrl.create();
                        loading.present();
                        var postData = {
                            token: localStorage.getItem("token"),
                            uid: localStorage.getItem('uid'),
                            action: 'logout'
                        };
                        _this.http.post(_this.serverUrl + "/logout.php", JSON.stringify(postData))
                            .map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            loading.dismiss();
                            if (data.error == '0') {
                                localStorage.setItem("uid", "");
                                localStorage.setItem("token", "");
                                localStorage.setItem("infoData", "");
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
                                _this.saveUserIDProvider.removeUID('remove').then(function (result) {
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
                                })
                                    .catch(function (err) {
                                });
                            }
                        });
                    }
                },
                {
                    text: "不",
                    handler: function () {
                    }
                }
            ]
        }).present();
    };
    SettingPage.prototype.gotoChangePassword = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__setting_change_password_setting_change_password__["a" /* SettingChangePasswordPage */]);
    };
    SettingPage.prototype.gotoChangePayPassword = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__setting_change_pay_password_setting_change_pay_password__["a" /* SettingChangePayPasswordPage */]);
    };
    SettingPage.prototype.gotoChangePaymentMethod = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__setting_pay_option_setting_pay_option__["a" /* SettingPayOptionPage */]);
    };
    SettingPage.prototype.gotoAboutApp = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__about_app_about_app__["a" /* AboutAppPage */]);
    };
    SettingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-setting',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\setting\setting.html"*/'<!--\n  Generated template for the SettingPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>设置</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-list>\n        <button ion-item class="border-bottom" (click)="gotoChangePassword();">\n            <ion-icon name="key" item-start></ion-icon>\n            变更密码\n        </button>\n        <button ion-item class="border-bottom" (click)="gotoChangePayPassword();">\n            <ion-icon name="key" item-start ></ion-icon>\n            变更支付密码\n        </button>\n        <button ion-item class="border-bottom" (click)="gotoChangePaymentMethod();">\n            <ion-icon name="card" item-start></ion-icon>\n            更改支付账号\n        </button>\n        <button ion-item class="border-bottom" (click)="gotoAboutApp();">\n            <ion-icon name="information-circle" item-start></ion-icon>\n            关于钱途APP\n        </button>\n    </ion-list>\n    <ion-list>\n        <button ion-item (click)="logout();">\n          <ion-icon name="log-out"></ion-icon>\n            退出\n        </button>\n    </ion-list>\n\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\setting\setting.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_8__providers_save_user_name_save_user_name__["a" /* SaveUserNameProvider */]])
    ], SettingPage);
    return SettingPage;
}());

//# sourceMappingURL=setting.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingChangePasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SettingChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingChangePasswordPage = /** @class */ (function () {
    function SettingChangePasswordPage(navCtrl, navParams, loadingCtrl, alertCtrl, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.serverURL = "http://unak.vip/uplus/Api/mobile";
        this.old_pass = "";
        this.new_pass = "";
        this.new_conf_pass = "";
    }
    SettingChangePasswordPage.prototype.ionViewDidLoad = function () {
    };
    SettingChangePasswordPage.prototype.changePassword = function () {
        var _this = this;
        if (this.new_conf_pass != this.new_pass || this.new_conf_pass == "" || this.new_pass == "") {
            this.alertCtrl.create({
                title: "警告",
                message: "密码不准确",
                buttons: ["确定"]
            }).present();
        }
        else {
            if (this.new_pass.length < 6) {
                this.alertCtrl.create({
                    title: "警告",
                    message: "最少输入6位数",
                    buttons: ["确定"]
                }).present();
            }
            else {
                var postData = {
                    old_pass: this.old_pass,
                    new_pass: this.new_pass,
                    uid: localStorage.getItem("uid"),
                    token: localStorage.getItem("token")
                };
                var loading_1 = this.loadingCtrl.create();
                loading_1.present();
                this.http.post(this.serverURL + "/change_password.php", JSON.stringify(postData))
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    loading_1.dismiss();
                    switch (data.error) {
                        case 1:
                            _this.alertCtrl.create({
                                title: "通知",
                                message: "变更密码成功",
                                buttons: ["确定"]
                            }).present();
                            _this.navCtrl.pop();
                            break;
                        case 2:
                            _this.alertCtrl.create({
                                title: "警告",
                                message: "Your account was logged from another device",
                                buttons: ["确定"]
                            }).present();
                            break;
                        case 3:
                            _this.alertCtrl.create({
                                title: "警告",
                                message: "原密码不正确",
                                buttons: ["确定"]
                            }).present();
                            break;
                        default:
                            break;
                    }
                }, function (err) {
                    loading_1.dismiss();
                });
            }
        }
    };
    SettingChangePasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-setting-change-password',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\setting-change-password\setting-change-password.html"*/'<!--\n  Generated template for the SettingChangePasswordPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>设置密码</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="login-content">\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-list>\n        <ion-item>\n            <ion-label floating>\n                原密码\n            </ion-label>\n            <ion-input type="password" [(ngModel)]="old_pass"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label floating>\n                新密码\n            </ion-label>\n            <ion-input type="password" [(ngModel)]="new_pass"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label floating>\n                确认密码\n            </ion-label>\n            <ion-input type="password" [(ngModel)]="new_conf_pass"></ion-input>\n        </ion-item>\n    </ion-list>\n    <button ion-button block style="height: 50px; margin-top: 50px;" (click)="changePassword();">\n        完成\n    </button>\n\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\setting-change-password\setting-change-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]])
    ], SettingChangePasswordPage);
    return SettingChangePasswordPage;
}());

//# sourceMappingURL=setting-change-password.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingPayOptionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SettingPayOptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingPayOptionPage = /** @class */ (function () {
    function SettingPayOptionPage(navCtrl, navParams, loadingCtrl, alertCtrl, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.serverURL = "http://unak.vip/uplus/Api/mobile";
        this.wechat = "";
        this.alipay = "";
        this.bank = "";
    }
    SettingPayOptionPage.prototype.ionViewDidLoad = function () {
    };
    SettingPayOptionPage.prototype.ionViewWillEnter = function () {
        var tmp = localStorage.getItem("infoData");
        var tmpData = JSON.parse(tmp);
        this.wechat = tmpData.weixin;
        this.alipay = tmpData.alipay;
        this.bank = tmpData.bank;
    };
    SettingPayOptionPage.prototype.savePaymentAccount = function () {
        var _this = this;
        var postData = {
            uid: localStorage.getItem("uid"),
            token: localStorage.getItem("token"),
            wechat: this.wechat,
            alipay: this.alipay,
            bank: this.bank
        };
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.serverURL + "/change_pay_option.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            if (data.error = 1) {
                var tmp = localStorage.getItem("infoData");
                var tmpData = JSON.parse(tmp);
                tmpData.wechat = _this.wechat;
                tmpData.alipay = _this.alipay;
                tmpData.bank = _this.bank;
                localStorage.setItem('infoData', JSON.stringify(tmpData));
                _this.alertCtrl.create({
                    title: "通知",
                    message: "保管成功",
                    buttons: ["确定"]
                }).present();
            }
        }, function (err) {
            loading.dismiss();
        });
    };
    SettingPayOptionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-setting-pay-option',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\setting-pay-option\setting-pay-option.html"*/'<!--\n  Generated template for the SettingPayOptionPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>设置支付账号</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="login-content">\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-list>\n        <ion-item>\n            <ion-label floating>\n                <ion-icon name="chatbubbles" item-start class="text-primary"></ion-icon>\n                微信号\n            </ion-label>\n            <ion-input type="text" [(ngModel)]="wechat"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label floating>\n                <ion-icon name="funnel" item-start class="text-primary"></ion-icon>\n                支付宝\n            </ion-label>\n            <ion-input type="text" [(ngModel)]="alipay"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label floating>\n                <ion-icon name="card" item-start class="text-primary"></ion-icon>\n                运行\n            </ion-label>\n            <ion-input type="text" [(ngModel)]="bank"></ion-input>\n        </ion-item>\n    </ion-list>\n    <button ion-button block style="height: 50px; margin-top: 50px;" (click)="savePaymentAccount();">\n        保管\n    </button>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\setting-pay-option\setting-pay-option.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]])
    ], SettingPayOptionPage);
    return SettingPayOptionPage;
}());

//# sourceMappingURL=setting-pay-option.js.map

/***/ }),

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutAppPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AboutAppPage = /** @class */ (function () {
    function AboutAppPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AboutAppPage.prototype.ionViewDidLoad = function () {
    };
    AboutAppPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about-app',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\about-app\about-app.html"*/'<!--\n  Generated template for the MyInfoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>关于钱途APP</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <div class="center">\n        <p>钱途3.0</p>        \n        <img src="assets/imgs/other/default.png">\n    </div>\n    <div class="footer">\n        <p>Copyright@2016-2021</p>\n        <p>钱途版权所有</p>\n    </div>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\about-app\about-app.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], AboutAppPage);
    return AboutAppPage;
}());

//# sourceMappingURL=about-app.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingChangePayPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SettingChangePayPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingChangePayPasswordPage = /** @class */ (function () {
    function SettingChangePayPasswordPage(navCtrl, navParams, loadingCtrl, alertCtrl, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.serverURL = "http://unak.vip/uplus/Api/mobile";
        this.old_pass = "";
        this.new_pass = "";
        this.new_conf_pass = "";
    }
    SettingChangePayPasswordPage.prototype.ionViewDidLoad = function () {
    };
    SettingChangePayPasswordPage.prototype.changePassword = function () {
        var _this = this;
        if (this.new_conf_pass != this.new_pass || this.new_conf_pass == "" || this.new_pass == "") {
            this.alertCtrl.create({
                title: "警告",
                message: "密码不准确",
                buttons: ["确定"]
            }).present();
        }
        else {
            if (this.new_pass.length < 6) {
                this.alertCtrl.create({
                    title: "警告",
                    message: "最少输入6位数",
                    buttons: ["确定"]
                }).present();
            }
            else {
                var postData = {
                    old_pass: this.old_pass,
                    new_pass: this.new_pass,
                    uid: localStorage.getItem("uid"),
                    token: localStorage.getItem("token")
                };
                var loading_1 = this.loadingCtrl.create();
                loading_1.present();
                this.http.post(this.serverURL + "/change_pay_password.php", JSON.stringify(postData))
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    loading_1.dismiss();
                    switch (data.error) {
                        case 1:
                            _this.alertCtrl.create({
                                title: "通知",
                                message: "变更密码成功",
                                buttons: ["确定"]
                            }).present();
                            _this.navCtrl.pop();
                            break;
                        case 2:
                            _this.alertCtrl.create({
                                title: "警告",
                                message: "Your account was logged from another device",
                                buttons: ["确定"]
                            }).present();
                            break;
                        case 3:
                            _this.alertCtrl.create({
                                title: "警告",
                                message: "原密码不正确",
                                buttons: ["确定"]
                            }).present();
                            break;
                        default:
                            break;
                    }
                }, function (err) {
                    loading_1.dismiss();
                });
            }
        }
    };
    SettingChangePayPasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-setting-change-pay-password',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\setting-change-pay-password\setting-change-pay-password.html"*/'<!--\n  Generated template for the SettingChangePasswordPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>设置支付密码</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="login-content">\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-list>\n        <ion-item>\n            <ion-label floating>\n                原密码\n            </ion-label>\n            <ion-input type="password" [(ngModel)]="old_pass"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label floating>\n                新密码\n            </ion-label>\n            <ion-input type="password" [(ngModel)]="new_pass"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label floating>\n                确认密码\n            </ion-label>\n            <ion-input type="password" [(ngModel)]="new_conf_pass"></ion-input>\n        </ion-item>\n    </ion-list>\n    <button ion-button block style="height: 50px; margin-top: 50px;" (click)="changePassword();">\n      完成\n  </button>\n\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\setting-change-pay-password\setting-change-pay-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]])
    ], SettingChangePayPasswordPage);
    return SettingChangePayPasswordPage;
}());

//# sourceMappingURL=setting-change-pay-password.js.map

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewTicketPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NewTicketPage = /** @class */ (function () {
    function NewTicketPage(navCtrl, navParams, sanitizer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sanitizer = sanitizer;
    }
    NewTicketPage.prototype.ionViewDidLoad = function () {
        this.uid = localStorage.getItem('uid');
        this.add_new_ticket_url = this.transform("http://unak.vip/uplus/qr_code/Template/pay_history/service_center.php?uid=" + localStorage.getItem('uid'));
    };
    NewTicketPage.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    NewTicketPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({ name: 'safe' }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-new-ticket',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\new-ticket\new-ticket.html"*/'<!--\n  Generated template for the NewTicketPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>写信</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <iframe width="100%" height="100%" [src]="add_new_ticket_url" frameborder="0"></iframe>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\new-ticket\new-ticket.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */]])
    ], NewTicketPage);
    return NewTicketPage;
}());

//# sourceMappingURL=new-ticket.js.map

/***/ }),

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpSupportItemViewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the HelpSupportItemViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HelpSupportItemViewPage = /** @class */ (function () {
    function HelpSupportItemViewPage(navCtrl, navParams, http, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.itemID = "";
        this.itemContent = "";
        this.itemAddtime = "";
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
    }
    HelpSupportItemViewPage.prototype.ionViewDidLoad = function () {
    };
    HelpSupportItemViewPage.prototype.ionViewWillEnter = function () {
        var tmpData = this.navParams.get("itemData");
        this.itemID = tmpData.id;
        this.itemContent = tmpData.content;
        this.itemAddtime = tmpData.addtime;
        if (tmpData.readstate == '0') {
            var postData = {
                mID: this.itemID
            };
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.http.post(this.serverUrl + "/read_message.php", JSON.stringify(postData))
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                loading_1.dismiss();
            }, function (err) {
                loading_1.dismiss();
            });
        }
    };
    HelpSupportItemViewPage.prototype.deleteTicket = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        this.alertCtrl.create({
            title: "通知",
            message: "确定删除吗？",
            buttons: [
                {
                    text: "是",
                    handler: function () {
                        loading.present();
                        var postData = {
                            action: 'delete',
                            itemID: _this.itemID
                        };
                        _this.http.post(_this.serverUrl + "/support_help.php", JSON.stringify(postData))
                            .map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            loading.dismiss();
                            if (data.error == 1) {
                                _this.navCtrl.pop();
                            }
                            else {
                                _this.alertCtrl.create({
                                    title: "警告",
                                    message: "网络失败!",
                                    buttons: ["确定"]
                                }).present();
                            }
                        }, function (err) {
                            loading.dismiss();
                        });
                    }
                },
                {
                    text: "不",
                    handler: function () { }
                }
            ]
        }).present();
    };
    HelpSupportItemViewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-help-support-item-view',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\help-support-item-view\help-support-item-view.html"*/'<!--\n  Generated template for the HelpSupportItemViewPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>收件箱</ion-title>\n        <ion-buttons end (click)="deleteTicket();">\n            <button ion-button icon-only>\n            <ion-icon name="trash"></ion-icon>\n        </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <div [innerHTML]="itemContent" class="message_area">\n        <!-- {{itemContent}} -->\n    </div>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\help-support-item-view\help-support-item-view.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], HelpSupportItemViewPage);
    return HelpSupportItemViewPage;
}());

//# sourceMappingURL=help-support-item-view.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyAdvertisePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__my_ads_add_my_ads_add__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__my_ads_item_view_my_ads_item_view__ = __webpack_require__(374);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the MyAdvertisePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyAdvertisePage = /** @class */ (function () {
    function MyAdvertisePage(navCtrl, navParams, http, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.my_ads_list = [];
        this.page_num = 0;
        this.total = 0;
    }
    MyAdvertisePage.prototype.ionViewDidLoad = function () {
    };
    MyAdvertisePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.page_num = 0;
        var postData = {
            action: 'get',
            uid: localStorage.getItem("uid"),
            nIdx: this.page_num
        };
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.serverUrl + "/get_my_ads_list.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            _this.my_ads_list = [];
            for (var index = 0; index < data.data.length; index++) {
                _this.my_ads_list.push(data.data[index]);
                _this.total = data.total;
            }
        }, function (err) {
            loading.dismiss();
        });
    };
    MyAdvertisePage.prototype.doInfinite = function (infiniteScroll) {
        this.page_num++;
        this.getAdsList(this.page_num, infiniteScroll);
    };
    MyAdvertisePage.prototype.getAdsList = function (nIdx, infiniteScroll) {
        var _this = this;
        var postData = {
            action: 'get',
            uid: localStorage.getItem("uid"),
            nIdx: this.page_num
        };
        this.http.post(this.serverUrl + "/get_my_ads_list.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            for (var index = 0; index < data.data.length; index++) {
                _this.my_ads_list.push(data.data[index]);
                _this.total = data.total;
            }
            infiniteScroll.complete();
        });
    };
    MyAdvertisePage.prototype.addNewAds = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__my_ads_add_my_ads_add__["a" /* MyAdsAddPage */]);
    };
    MyAdvertisePage.prototype.showCurrentAds = function (adsID) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__my_ads_item_view_my_ads_item_view__["a" /* MyAdsItemViewPage */], { adsID: adsID });
    };
    MyAdvertisePage.prototype.delAds = function (adsID) {
        var _this = this;
        this.alertCtrl.create({
            title: "通知",
            message: "确定删除吗?",
            buttons: [
                {
                    text: "是",
                    handler: function () {
                        var postData = {
                            action: 'del',
                            uid: localStorage.getItem("uid"),
                            id: adsID
                        };
                        var loading = _this.loadingCtrl.create();
                        loading.present();
                        _this.http.post(_this.serverUrl + "/get_my_ads_list.php", JSON.stringify(postData))
                            .map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            loading.dismiss();
                            _this.my_ads_list = [];
                            for (var index = 0; index < data.data.length; index++) {
                                _this.my_ads_list.push(data.data[index]);
                                _this.total = data.total;
                            }
                        }, function (err) {
                            loading.dismiss();
                        });
                    }
                },
                {
                    text: "不",
                    handler: function () {
                    }
                }
            ]
        }).present();
    };
    MyAdvertisePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-advertise',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my-advertise\my-advertise.html"*/'<!--\n  Generated template for the MyAdvertisePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>广告目录</ion-title>\n        <ion-buttons end (click)="addNewAds();">\n            <button ion-button icon-only>\n          <ion-icon name="add"></ion-icon>\n      </button>\n        </ion-buttons>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-list>\n        <ion-list-header>\n            <font *ngIf="total">{{total}} 个</font>\n            <font *ngIf="!total">没有数据</font>\n        </ion-list-header>\n        <ion-item-sliding *ngFor="let ads of my_ads_list">\n            <ion-item (click)="showCurrentAds(ads.id);">\n                <ion-avatar item-start>\n                    <img src="assets/imgs/other/default.png" *ngIf="!ads.photo">\n                    <img src="http://unak.vip/uplus/Resource/images/ads/images/{{ads.photo}}" *ngIf="ads.photo">\n                </ion-avatar>\n                <h2 style="float: left;">{{ads.req_company}}<br />{{ads.price}}¥</h2>\n                <p style="float: right;">{{ads.reg_date}}</p>\n            </ion-item>\n            <ion-item-options side="right">\n                <button ion-button color="danger" (click)="delAds(ads.id);">\n                  <ion-icon name="trash"></ion-icon>\n                  删除\n              </button>\n            </ion-item-options>\n        </ion-item-sliding>\n    </ion-list>\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my-advertise\my-advertise.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], MyAdvertisePage);
    return MyAdvertisePage;
}());

//# sourceMappingURL=my-advertise.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyAdsAddPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MyAdsAddPage = /** @class */ (function () {
    function MyAdsAddPage(navCtrl, navParams, sanitizer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sanitizer = sanitizer;
    }
    MyAdsAddPage.prototype.ionViewDidLoad = function () {
        this.uid = localStorage.getItem('uid');
        this.ads_add_url = this.transform("http://unak.vip/uplus/qr_code/Template/ads/ads_add.php?uid=" + localStorage.getItem('uid'));
    };
    MyAdsAddPage.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    MyAdsAddPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({ name: 'safe' }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-ads-add',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my-ads-add\my-ads-add.html"*/'<!--\n  Generated template for the MyAdsAddPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>广告申请</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <iframe width="100%" height="100%" [src]="ads_add_url" frameborder="0"></iframe>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my-ads-add\my-ads-add.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */]])
    ], MyAdsAddPage);
    return MyAdsAddPage;
}());

//# sourceMappingURL=my-ads-add.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyAdsItemViewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the MyAdsItemViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyAdsItemViewPage = /** @class */ (function () {
    function MyAdsItemViewPage(navCtrl, navParams, http, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.adsID = "";
        this.adsData = "";
        this.video_url = "";
    }
    MyAdsItemViewPage.prototype.ionViewDidLoad = function () {
    };
    MyAdsItemViewPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.adsID = this.navParams.get('adsID');
        var postData = {
            action: 'item',
            id: this.adsID
        };
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.serverUrl + "/get_my_ads_item.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            if (data.error == 1) {
                _this.adsData = data.data;
                _this.video_url = 'http://unak.vip/uplus/Resource/images/ads/videos/' + _this.adsData.video;
            }
            else {
                _this.alertCtrl.create({
                    title: "通知",
                    message: "不资料存在",
                    buttons: [
                        {
                            text: "确定",
                            handler: function () {
                                _this.navCtrl.pop();
                            }
                        }
                    ]
                }).present();
            }
        }, function (err) {
            loading.dismiss();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('videoPlayer'),
        __metadata("design:type", Object)
    ], MyAdsItemViewPage.prototype, "mVideoPlayer", void 0);
    MyAdsItemViewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-ads-item-view',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my-ads-item-view\my-ads-item-view.html"*/'<!--\n  Generated template for the MyAdsItemViewPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title></ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-list>\n        <ion-item>\n            <video class="ads_video" #videoPlayer playsinline preload="auto" [src]="video_url" controls></video>\n        </ion-item>\n        <ion-item>\n            公司: {{adsData.req_company}}\n        </ion-item>\n        <ion-item>\n            金额 : {{adsData.price}}¥\n        </ion-item>\n        <ion-item>\n            申请日期: {{adsData.reg_date}}\n        </ion-item>\n        <ion-item>\n            相关链接: {{adsData.link}}\n        </ion-item>\n        <ion-item>\n            性别: {{adsData.age_from}} ~ {{adsData.age_to}}\n        </ion-item>\n        <ion-item>\n            地域: {{adsData.price}}\n        </ion-item>\n        <ion-item>\n            广告时间: {{adsData.time_from}} ~ {{adsData.time_to}}\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my-ads-item-view\my-ads-item-view.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], MyAdsItemViewPage);
    return MyAdsItemViewPage;
}());

//# sourceMappingURL=my-ads-item-view.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewVersionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(15);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NewVersionPage = /** @class */ (function () {
    function NewVersionPage(navCtrl, navParams, sanitizer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sanitizer = sanitizer;
    }
    NewVersionPage.prototype.ionViewDidLoad = function () {
        this.new_version_url = this.transform("http://unak.vip/uplus/qr_code/Template/download");
    };
    NewVersionPage.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    NewVersionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({ name: 'safe' }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-new-version',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\new-version\new-version.html"*/'<!--\n  Generated template for the MyShopMolePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>新版本下载</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <iframe width="100%" height="100%" [src]="new_version_url" frameborder="0"></iframe>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\new-version\new-version.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */]])
    ], NewVersionPage);
    return NewVersionPage;
}());

//# sourceMappingURL=new-version.js.map

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyMarketInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__uplus_history_board_uplus_history_board__ = __webpack_require__(377);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the SettingPayOptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyMarketInfoPage = /** @class */ (function () {
    function MyMarketInfoPage(navCtrl, navParams, loadingCtrl, alertCtrl, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.serverURL = "http://unak.vip/uplus/Api/mobile";
        this.title = "";
        this.message = "";
        this.price = "";
    }
    MyMarketInfoPage.prototype.ionViewDidLoad = function () {
    };
    MyMarketInfoPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var postData = {
            uid: localStorage.getItem("uid"),
            action: 'get'
        };
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.serverURL + "/change_market_info.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            if (data.error == 1) {
                _this.title = data.data.title;
                _this.message = data.data.message;
                _this.price = data.data.available;
            }
        }, function (err) {
            loading.dismiss();
        });
        ;
    };
    MyMarketInfoPage.prototype.saveMarketAccount = function () {
        var _this = this;
        var postData = {
            uid: localStorage.getItem("uid"),
            token: localStorage.getItem("token"),
            title: this.title,
            message: this.message,
            action: 'save_info'
        };
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.serverURL + "/change_market_info.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            if (data.error = 1) {
                _this.alertCtrl.create({
                    title: "通知",
                    message: "保管成功",
                    buttons: ["确定"]
                }).present();
            }
        }, function (err) {
            loading.dismiss();
        });
    };
    MyMarketInfoPage.prototype.gotoHistory = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__uplus_history_board_uplus_history_board__["a" /* UplusHistoryBoardPage */]);
    };
    MyMarketInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-market-info',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my-market-info\my-market-info.html"*/'<!--\n  Generated template for the SettingPayOptionPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>设置交易所</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="gotoHistory()">\n                <ion-icon name="add"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding class="login-content">\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-item class="value-area">\n        <p>现金 : ¥{{price}}</p>\n    </ion-item>\n    <div class="market-content">\n        <ion-list>\n            <ion-item>\n                <ion-label floating>\n                    <!-- <ion-icon name="chatbubbles" item-start class="text-primary"></ion-icon> -->\n                    交易所名\n                </ion-label>\n                <ion-input type="text" [(ngModel)]="title"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label floating>\n                    <!-- <ion-icon name="funnel" item-start class="text-primary"></ion-icon> -->\n                    通知栏\n                </ion-label>\n                <ion-input type="text" [(ngModel)]="message"></ion-input>\n            </ion-item>\n        </ion-list>\n        <button ion-button block color="main" style="height: 50px; margin-top: 50px;" (click)="saveMarketAccount();">\n            保管\n        </button>\n    </div>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my-market-info\my-market-info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]])
    ], MyMarketInfoPage);
    return MyMarketInfoPage;
}());

//# sourceMappingURL=my-market-info.js.map

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UplusHistoryBoardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the UplusSellBoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UplusHistoryBoardPage = /** @class */ (function () {
    function UplusHistoryBoardPage(navCtrl, http, alertCtrl, loadingCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.list = [];
        this.page_num = 0;
        this.available = 0;
    }
    UplusHistoryBoardPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UplusSellBoardPage');
    };
    UplusHistoryBoardPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.page_num = 0;
        var postData = {
            nIdx: this.page_num,
            uid: localStorage.getItem('uid')
        };
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.serverUrl + "/get_market_history.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            for (var index = 0; index < data.data.length; index++) {
                _this.list.push(data.data[index]);
            }
            _this.list = data.data;
            _this.available = data.price;
        }, function (err) {
            loading.dismiss();
        });
    };
    UplusHistoryBoardPage.prototype.doInfinite = function (infiniteScroll) {
        this.page_num++;
        this.getMarketList(this.page_num, infiniteScroll);
    };
    UplusHistoryBoardPage.prototype.getMarketList = function (nIdx, infiniteScroll) {
        var _this = this;
        var postData = {
            uid: localStorage.getItem("uid"),
            nIdx: nIdx
        };
        this.http.post(this.serverUrl + "/get_market_history.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            for (var index = 0; index < data.data.length; index++) {
                _this.list.push(data.data[index]);
            }
            infiniteScroll.complete();
        });
    };
    UplusHistoryBoardPage.prototype.rejectRequest = function (id) {
        var _this = this;
        var postParam = {
            action: 'del',
            id: id
        };
        this.http.post(this.serverUrl + "/covert_request_action.php", JSON.stringify(postParam))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.ionViewWillEnter();
        }, function (err) {
        });
    };
    UplusHistoryBoardPage.prototype.acceptRequest = function (id) {
        var _this = this;
        var postParam = {
            action: 'accept',
            id: id
        };
        console.log(postParam);
        this.http.post(this.serverUrl + "/covert_request_action.php", JSON.stringify(postParam))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.ionViewWillEnter();
        }, function (err) {
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Slides */])
    ], UplusHistoryBoardPage.prototype, "slides", void 0);
    UplusHistoryBoardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-uplus-history-board',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\uplus-history-board\uplus-history-board.html"*/'<!--\n  Generated template for the UplusSellBoardPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>积分交易所目录</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-item class="value-area">\n        <ion-label>现金 : ¥{{available}}</ion-label>\n    </ion-item>\n    <ion-list>\n        <ion-item-sliding *ngFor="let item of list">\n            <ion-item>\n                <ion-icon item-start name="information-circle" *ngIf="item.state==\'0\'" class="ico-info"></ion-icon>\n                <ion-icon item-start name="checkmark" *ngIf="item.state==\'1\'" class="ico-check"></ion-icon>\n                <ion-label>\n                    {{item.amount}}\n                </ion-label>\n                <ion-note item-end class="action-date">\n                    {{item.date}}\n                </ion-note>\n            </ion-item>\n            <ion-item-options side="right" *ngIf="item.state==\'0\'">\n                <button ion-button color="secondary" (click)="acceptRequest(item.id);">\n                    <ion-icon name="checkmark"></ion-icon>\n                    同意\n                </button>\n                <button ion-button color="danger" (click)="rejectRequest(item.id);">\n                    <ion-icon name="trash"></ion-icon>\n                    删除\n                </button>\n            </ion-item-options>\n        </ion-item-sliding>\n\n        <!-- <ion-item *ngFor="let item of list">\n            <ion-icon item-start name="information-circle" *ngIf="item.state==\'0\'" class="ico-info"></ion-icon>\n            <ion-icon item-start name="checkmark" *ngIf="item.state==\'1\'" class="ico-check"></ion-icon>\n            <ion-label class="value-item">{{item.amount}}</ion-label>\n            <ion-label class="value-item-time">{{item.date}}</ion-label>\n        </ion-item> -->\n    </ion-list>\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\uplus-history-board\uplus-history-board.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], UplusHistoryBoardPage);
    return UplusHistoryBoardPage;
}());

//# sourceMappingURL=uplus-history-board.js.map

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShopPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shop_mole_item_view_shop_mole_item_view__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ShopPage = /** @class */ (function () {
    function ShopPage(navCtrl, navParams, app, http, loadingCtrl, alertCtrl, actionSheet) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.app = app;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.actionSheet = actionSheet;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.shop_moles = [];
        this.diqu = "";
        this.page_num = 0;
        this.slides = [];
        this.provinces = [];
        this.cities = [];
        this.areas = [];
        this.s_province = "";
        this.s_city = "";
        this.s_area = "";
        this.searchFlag = false;
        this.isValid = true;
    }
    ShopPage.prototype.ionViewDidLoad = function () {
    };
    ShopPage.prototype.showCurrentMole = function (shopID, lat, lng) {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_2__shop_mole_item_view_shop_mole_item_view__["a" /* ShopMoleItemViewPage */], { shop_id: shopID, lat: lat, lng: lng });
    };
    ShopPage.prototype.gotoInternetShopMole = function () {
        this.alertCtrl.create({
            title: "警告",
            message: "网络商城正在建设中，敬请期待",
            buttons: ["确定"]
        }).present();
    };
    ShopPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        setTimeout(function () {
            _this.slides1.freeMode = true;
            _this.slides1.autoplay = 2000;
            _this.slides1.speed = 500;
            _this.slides1.loop = true;
            _this.slides1.startAutoplay();
        }, 1000);
        this.isValid = true;
        this.searchFlag = false;
        for (var index = 1; index < 7; index++) {
            this.slides.push({
                id: index
            });
        }
        this.page_num = 0;
        var postData = {
            action: 'get',
            uid: localStorage.getItem("uid"),
            nIdx: this.page_num
        };
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.serverUrl + "/shop_mole_list_get.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            for (var index = 0; index < data.data.length; index++) {
                _this.shop_moles.push(data.data[index]);
            }
            _this.shop_moles = data.data;
            _this.diqu = data.diqu;
        }, function (err) {
            loading.dismiss();
        });
    };
    ShopPage.prototype.slideChanged = function () {
        // console.log("slide changed.");
        this.slides1.startAutoplay();
    };
    ShopPage.prototype.doInfinite = function (infiniteScroll) {
        this.page_num++;
        this.getMoleList(this.page_num, infiniteScroll);
    };
    ShopPage.prototype.getMoleList = function (nIdx, infiniteScroll) {
        var _this = this;
        var postData;
        if (this.searchFlag) {
            postData = {
                action: 'search',
                uid: localStorage.getItem("uid"),
                nIdx: nIdx,
                sheng: this.s_province,
                shi: this.s_city,
                qu: this.s_area
            };
        }
        else {
            postData = {
                action: 'get',
                uid: localStorage.getItem("uid"),
                nIdx: nIdx
            };
        }
        this.http.post(this.serverUrl + "/shop_mole_list_get.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            for (var index = 0; index < data.data.length; index++) {
                _this.shop_moles.push(data.data[index]);
            }
            infiniteScroll.complete();
        });
    };
    ShopPage.prototype.getProvinceData = function () {
        var _this = this;
        this.s_province = "";
        this.s_city = "";
        this.s_area = "";
        this.http.get("assets/json/dg_province.json")
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.provinces = [];
            for (var index = 0; index < data.length; index++) {
                _this.provinces.push(data[index]);
            }
            var provinceSheet = _this.actionSheet.create({
                title: "省份",
                cssClass: "cus_height",
                buttons: [{
                        text: "搜索",
                        handler: function () {
                            _this.page_num = 0;
                            _this.searchData();
                        }
                    }]
            });
            var _loop_1 = function (index) {
                button = {
                    text: _this.provinces[index].province,
                    handler: function () {
                        _this.s_province = _this.provinces[index].provinceID;
                        _this.inputCityData();
                    }
                };
                provinceSheet.addButton(button);
            };
            var button;
            for (var index = 0; index < _this.provinces.length; index++) {
                _loop_1(index);
            }
            provinceSheet.present();
        });
    };
    ShopPage.prototype.getCityData = function () {
        var _this = this;
        this.http.get("assets/json/dg_city.json")
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.cities = [];
            for (var index = 0; index < data.length; index++) {
                if (data[index].father == _this.s_province) {
                    _this.cities.push(data[index]);
                }
            }
            var citySheet = _this.actionSheet.create({
                title: "城市",
                cssClass: "cus_height",
                buttons: [{
                        text: "搜索",
                        handler: function () {
                            _this.searchData();
                        }
                    }]
            });
            var _loop_2 = function (index) {
                button = {
                    text: _this.cities[index].city,
                    handler: function () {
                        _this.s_city = _this.cities[index].cityID;
                        _this.inputAreaData();
                    }
                };
                citySheet.addButton(button);
            };
            var button;
            for (var index = 0; index < _this.cities.length; index++) {
                _loop_2(index);
            }
            citySheet.present();
        });
    };
    ShopPage.prototype.getAreaData = function () {
        var _this = this;
        this.http.get("assets/json/dg_area.json")
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.areas = [];
            for (var index = 0; index < data.length; index++) {
                if (data[index].father == _this.s_city) {
                    _this.areas.push(data[index]);
                }
            }
            var areaSheet = _this.actionSheet.create({
                title: "地区",
                cssClass: "cus_height",
                buttons: [{
                        text: "搜索",
                        handler: function () {
                            _this.searchData();
                        }
                    }]
            });
            var _loop_3 = function (index) {
                button = {
                    text: _this.areas[index].area,
                    handler: function () {
                        _this.s_area = _this.areas[index].areaID;
                        _this.searchData();
                    }
                };
                areaSheet.addButton(button);
            };
            var button;
            for (var index = 0; index < _this.areas.length; index++) {
                _loop_3(index);
            }
            areaSheet.present();
        });
    };
    ShopPage.prototype.inputProvinceData = function () {
        this.getProvinceData();
    };
    ShopPage.prototype.inputCityData = function () {
        this.getCityData();
    };
    ShopPage.prototype.inputAreaData = function () {
        this.getAreaData();
    };
    ShopPage.prototype.searchData = function () {
        var _this = this;
        var tmp = JSON.parse(localStorage.getItem("infoData"));
        if (tmp.sheng == this.s_province) {
            this.isValid = true;
        }
        else {
            this.isValid = false;
        }
        this.searchFlag = true;
        this.page_num = 0;
        var postData = {
            action: 'search',
            uid: localStorage.getItem("uid"),
            nIdx: this.page_num,
            sheng: this.s_province,
            shi: this.s_city,
            qu: this.s_area
        };
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.serverUrl + "/shop_mole_list_get.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            for (var index = 0; index < data.data.length; index++) {
                _this.shop_moles.push(data.data[index]);
            }
            _this.shop_moles = data.data;
            _this.diqu = data.diqu;
        }, function (err) {
            loading.dismiss();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Slides */])
    ], ShopPage.prototype, "slides1", void 0);
    ShopPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-shop',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\shop\shop.html"*/'<!--\n  Generated template for the ShopPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>城市商城</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <div class="slogan_div" (click)="gotoInternetShopMole()">\n        <!-- <h3>共享富足, 共享快乐</h3> -->\n        <h3>进入网络商城</h3>\n    </div>\n    <ion-searchbar (click)="inputProvinceData()" [placeholder]="" [(ngModel)]="diqu" readonly></ion-searchbar>\n    <ion-slides class="top-slider" (ionSlideDidChange)="slideChanged()" (click)="gotoInternetShopMole()">\n        <ion-slide *ngFor="let slide of slides" [ngStyle]="{\'background-image\': \'url(assets/imgs/other/banner/banner0\' + slide.id + \'.jpg)\'}">\n        </ion-slide>\n    </ion-slides>\n    <ion-list>\n        <ion-list-header>\n            {{diqu}}\n        </ion-list-header>\n        <div *ngIf="isValid">\n            <ion-item *ngFor="let mole of shop_moles" (click)="showCurrentMole(mole.id, mole.lat, mole.lng);">\n                <ion-avatar item-start>\n                    <img src="assets/imgs/other/shop_default.png" *ngIf="!mole.logo">\n                    <img src="http://unak.vip/uplus/Resource/images/proimgs/upload/{{mole.logo}}" *ngIf="mole.logo">\n                </ion-avatar>\n                <h2>{{mole.title}}</h2>\n                <h3>商家地址： {{mole.address}}</h3>\n            </ion-item>\n            <ion-item *ngIf="shop_moles.length == 0">\n                没有商城\n            </ion-item>\n        </div>\n        <p *ngIf="!isValid" style="padding: 5px 10px; color: brown;">\n            目前是2.0版本测试版，只能登录观看注册地，暂不支持此全国浏览功能。\n        </p>\n    </ion-list>\n    <ion-infinite-scroll (ionInfinite)="doInfinite($event)">\n        <ion-infinite-scroll-content></ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\shop\shop.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
    ], ShopPage);
    return ShopPage;
}());

//# sourceMappingURL=shop.js.map

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShopMoleItemViewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ShopMoleItemViewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ShopMoleItemViewPage = /** @class */ (function () {
    function ShopMoleItemViewPage(navCtrl, navParams, http, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.mole_data = "";
        this.realname = "";
        this.mobile = "";
        this.diqu = "";
        this.options = {
            centerAndZoom: {
                lat: this.navParams.get("lat"),
                lng: this.navParams.get("lng"),
                zoom: 14
            },
            enableKeyboard: true
        };
        this.markers = [
            {
                point: {
                    lat: this.navParams.get("lat"),
                    lng: this.navParams.get("lng"),
                }
            }
        ];
    }
    ShopMoleItemViewPage.prototype.ionViewDidLoad = function () {
    };
    ShopMoleItemViewPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var shopID = this.navParams.get("shop_id");
        var postData = {
            action: 'get',
            shop_id: shopID
        };
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.serverUrl + "/shop_mole_item_get.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            _this.mole_data = data.mole;
            _this.realname = data.realname;
            _this.mobile = data.mobile;
            _this.diqu = data.diqu;
            // this.options = {
            //   centerAndZoom: {
            //     lat: this.mole_data.lat,
            //     lng: this.mole_data.lng,
            //     zoom: 16
            //   },
            //   enableKeyboard: true
            // }
        }, function (err) {
            loading.dismiss();
        });
    };
    ShopMoleItemViewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-shop-mole-item-view',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\shop-mole-item-view\shop-mole-item-view.html"*/'<!--\n  Generated template for the ShopMoleItemViewPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>商家信息</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <div class="slogan_div">\n        <h3>共享富足, 共享快乐</h3>\n    </div>\n    <ion-item>\n        <ion-avatar item-start>\n            <img src="assets/imgs/other/shop_default.png" *ngIf="!mole_data.logo">\n            <img src="http://unak.vip/uplus/Resource/images/proimgs/upload/{{mole_data.logo}}" *ngIf="mole_data.logo">\n        </ion-avatar>\n        <h2 style="color: red;">{{mole_data.title}}</h2>\n        <!-- <h3>{{realname}} : {{mobile}}</h3> -->\n    </ion-item>\n    <p class="main-info">商城地址: </p>\n    <p class="desc_area">{{diqu}} {{ mole_data.address }}</p>\n    <p class="main-info">活动介绍: </p>\n    <p class="desc_area">{{ mole_data.action }}</p>\n    <p class="main-info">营业时间: </p>\n    <p class="desc_area">{{ mole_data.open_time }}</p>\n    <p class="main-info">商城介绍</p>\n    <div [innerHTML]="mole_data.description" class="desc_area"></div>\n    <baidu-map [options]="options" style="display: block; width: 550px; height: 350px;">\n        <marker *ngFor="let marker of markers" [point]="marker.point"></marker>\n    </baidu-map>\n    <div id="allmap"></div>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\shop-mole-item-view\shop-mole-item-view.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */]])
    ], ShopMoleItemViewPage);
    return ShopMoleItemViewPage;
}());

//# sourceMappingURL=shop-mole-item-view.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ads_list_ads_list__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_save_user_name_save_user_name__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__forgot_password_forgot_password__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__signup_signup__ = __webpack_require__(385);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, http, alertCtrl, loadingCtrl, saveIDProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.saveIDProvider = saveIDProvider;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.username = "";
        this.password = "";
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        navigator.geolocation.getCurrentPosition(function (pos) {
        });
    };
    LoginPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var loading = this.loadingCtrl.create();
        loading.present();
        var token = localStorage.getItem("token");
        if (token == undefined || token == "") {
            loading.dismiss();
        }
        else {
            var postData = {
                token: token,
                uid: localStorage.getItem('uid'),
                action: 'validate'
            };
            this.http.post(this.serverUrl + "/token_validate.php", JSON.stringify(postData))
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                loading.dismiss();
                switch (data.error) {
                    case 1:
                        localStorage.setItem("uid", data.uid);
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("province", data.province);
                        localStorage.setItem("city", data.city);
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                        //this.navCtrl.push(AdsListPage);
                        // this.saveIDProvider.saveUID({"userID": data.uid}).then( result => {
                        //   this.navCtrl.setRoot(HomePage);
                        // })
                        // .catch( err => {
                        // });
                        break;
                    case 2:
                        _this.alertCtrl.create({
                            title: "警告",
                            message: "这个帐户已经登录了另一个手机",
                            buttons: [{
                                    text: '确定',
                                    handler: function () {
                                        localStorage.setItem("uid", "");
                                        localStorage.setItem("token", "");
                                        localStorage.setItem("infoData", "");
                                    }
                                }]
                        });
                        break;
                    case 3:
                        _this.alertCtrl.create({
                            title: "警告",
                            message: "您的账号已禁止使用，请向客服咨询。",
                            buttons: ["确定"]
                        });
                        break;
                    default:
                        break;
                }
            }, function (err) {
                loading.dismiss();
                _this.alertCtrl.create({
                    title: "警告",
                    message: "网络失败!",
                    buttons: ["确定"]
                }).present();
            });
        }
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        if (this.username.trim() != "" && this.password.trim() != "") {
            var postParam = {
                'username': this.username,
                'password': this.password,
                'action': 'login'
            };
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.http.post(this.serverUrl + "/login.php", JSON.stringify(postParam))
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                loading_1.dismiss();
                switch (data.error) {
                    case 1:
                        localStorage.setItem("uid", data.uid);
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("province", data.province);
                        localStorage.setItem("city", data.city);
                        _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__ads_list_ads_list__["a" /* AdsListPage */]);
                        // this.saveIDProvider.saveUID({"userID": data.uid}).then( result => {
                        //   this.navCtrl.setRoot(HomePage);
                        // })
                        // .catch( err => {
                        // });
                        break;
                    case 2:
                        _this.alertCtrl.create({
                            title: "警告",
                            message: "您的账号信息不准确。",
                            buttons: ["确定"]
                        }).present();
                        break;
                    case 3:
                        _this.alertCtrl.create({
                            title: "警告",
                            message: "这个帐户已经登录了另一个手机。还要登陆吗？",
                            buttons: [
                                {
                                    text: '不同意',
                                    handler: function () {
                                    }
                                },
                                {
                                    text: '同意',
                                    handler: function () {
                                        _this.forceLogin();
                                    }
                                }
                            ]
                        }).present();
                        /*this.alertCtrl.create({
                          title: "警告",
                          message: "这个帐户已经登录了另一个手机。",
                          buttons: ['同意']
                        }).present();*/
                        break;
                    default:
                        break;
                }
            }, function (err) {
                loading_1.dismiss();
            });
        }
        else {
            this.alertCtrl.create({
                title: "警告",
                message: "请输入会员帐号和密码。",
                buttons: ["确定"]
            }).present();
        }
    };
    LoginPage.prototype.gotosignup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__signup_signup__["a" /* SignupPage */]);
    };
    LoginPage.prototype.forceLogin = function () {
        var _this = this;
        var forceParam = {
            action: 'force',
            username: this.username,
            password: this.password
        };
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.serverUrl + "/login.php", JSON.stringify(forceParam))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            localStorage.setItem("uid", data.uid);
            localStorage.setItem("token", data.token);
            localStorage.setItem("province", data.province);
            localStorage.setItem("city", data.city);
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
            //this.navCtrl.push(AdsListPage);
            // this.saveIDProvider.saveUID({"userID": data.uid}).then( result => {
            //   this.navCtrl.setRoot(HomePage);
            // })
            // .catch( err => {
            // });
        });
    };
    LoginPage.prototype.forgotPassword = function () {
        console.log("forgot password");
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__forgot_password_forgot_password__["a" /* ForgotPasswordPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\login\login.html"*/'<ion-content class="login-content" padding>\n    <ion-row class="logo-row">\n        <ion-col></ion-col>\n        <ion-col width-67>\n            <img src="assets/imgs/login/logo-white.png" alt="">\n        </ion-col>\n        <ion-col></ion-col>\n    </ion-row>\n    <div class="login-box">\n        <ion-row>\n            <ion-col>\n                <ion-list>\n                    <ion-item>\n                        <ion-label floating>\n                            <ion-icon name="person" item-start class="text-primary"></ion-icon>\n                            会员编号\n                        </ion-label>\n                        <ion-input type="text" [(ngModel)]="username"></ion-input>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label floating>\n                            <ion-icon name="lock" item-start class="text-primary"></ion-icon>\n                            密码\n                        </ion-label>\n                        <ion-input type="password" [(ngModel)]="password"></ion-input>\n                    </ion-item>\n                </ion-list>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col class="login-col">\n                <button ion-button class="forgot-btn" full clear (click)="forgotPassword();">忘记密码或会员编号?</button>\n                <button ion-button class="login-btn" full color="danger" (click)="login();">登录</button>\n                <button ion-button class="login-btn" full color="danger" (click)="gotosignup();">注册</button>\n            </ion-col>\n        </ion-row>\n    </div>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__providers_save_user_name_save_user_name__["a" /* SaveUserNameProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyContactListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__my_friend_info_my_friend_info__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__my_contact_find_my_contact_find__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__chat_chat__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_call_number__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_contact_popover_contact_popover__ = __webpack_require__(382);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









/**
 * Generated class for the MyContactListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyContactListPage = /** @class */ (function () {
    function MyContactListPage(navCtrl, navParams, loadingCtrl, alertCtrl, http, app, popoverCtrl, callNumber) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.app = app;
        this.popoverCtrl = popoverCtrl;
        this.callNumber = callNumber;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.my_contacts = [];
        this.my_requests = "";
        this.chatNoti = "";
        this.notiData = [];
    }
    MyContactListPage.prototype.ionViewDidLoad = function () {
    };
    MyContactListPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.my_contacts = [];
        this.my_requests = [];
        var loading = this.loadingCtrl.create();
        loading.present();
        var postData = {
            action: 'get',
            uid: localStorage.getItem('uid')
        };
        this.http.post(this.serverUrl + "/contact_list.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            if (data.error == 1) {
                if (data.data != null) {
                    _this.my_contacts = data.data;
                }
                _this.my_requests = data.request;
            }
            else {
                loading.dismiss();
                _this.customAlert('警告', '网络失败!');
            }
        }, function (err) {
            loading.dismiss();
        });
        this.getChatNotiy();
        // let __this = this;
        // this.chatNoti = setInterval(function() {
        //   __this.getChatNotiy();
        // }, 1000);
    };
    MyContactListPage.prototype.ionViewWillLeave = function () {
        // clearInterval(this.chatNoti);
    };
    MyContactListPage.prototype.getChatNotiy = function () {
        var _this = this;
        var postData = {
            uid: localStorage.getItem('uid')
        };
        this.http.post(this.serverUrl + "/chat_notify.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.notiData = data.list;
        }, function (err) {
        });
    };
    MyContactListPage.prototype.gotoFriendInfo = function (c_id, nickname) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__my_friend_info_my_friend_info__["a" /* MyFriendInfoPage */], { cID: c_id, nick: nickname });
    };
    MyContactListPage.prototype.rejectRequest = function (id) {
        var _this = this;
        var postData = {
            action: 'reject',
            itemID: id
        };
        this.http.post(this.serverUrl + "/contact_list.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (data.error == 1) {
                _this.ionViewWillEnter();
            }
            else {
                _this.customAlert('警告', '网络失败!');
            }
        }, function (err) {
        });
    };
    MyContactListPage.prototype.acceptRequest = function (id) {
        var _this = this;
        var postData = {
            action: 'add',
            itemID: id
        };
        this.http.post(this.serverUrl + "/contact_list.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (data.error == 1) {
                _this.ionViewWillEnter();
            }
            else {
                _this.customAlert('警告', '网络失败!');
            }
        }, function (err) {
        });
    };
    MyContactListPage.prototype.callContact = function (phoneNumber) {
        this.callNumber.callNumber(phoneNumber, true)
            .then(function (res) {
        })
            .catch(function (err) {
        });
    };
    MyContactListPage.prototype.deleteContact = function (id) {
        var _this = this;
        this.alertCtrl.create({
            title: "通知",
            message: "确定删除吗？",
            buttons: [
                {
                    text: "是",
                    handler: function () {
                        var postData = {
                            action: 'delete',
                            itemID: id
                        };
                        _this.http.post(_this.serverUrl + "/contact_list.php", JSON.stringify(postData))
                            .map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            if (data.error == 1) {
                                _this.ionViewWillEnter();
                            }
                            else {
                                _this.customAlert('警告', '网络失败!');
                            }
                        }, function (err) {
                        });
                    }
                },
                {
                    text: "不",
                    handler: function () { }
                }
            ]
        }).present();
    };
    MyContactListPage.prototype.customAlert = function (title, message) {
        this.alertCtrl.create({
            title: title,
            message: message,
            buttons: ["确定"]
        }).present();
    };
    MyContactListPage.prototype.presentPopover = function (myEvent) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_8__components_contact_popover_contact_popover__["a" /* ContactPopoverComponent */]);
        popover.present({
            ev: myEvent
        });
        popover.onDidDismiss(function (data) {
            switch (data) {
                case 'new_contact':
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__my_contact_find_my_contact_find__["a" /* MyContactFindPage */]);
                    break;
                case 'single-chat':
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__chat_chat__["a" /* ChatPage */]);
                    //this.customAlert("通知", "暂不支持此功能");
                    break;
                case 'group-chat':
                    _this.customAlert("通知", "暂不支持此功能");
                    break;
                default:
                    break;
            }
        });
    };
    MyContactListPage.prototype.changeNickname = function (id, nickname) {
        var _this = this;
        this.alertCtrl.create({
            title: "NickName",
            inputs: [
                {
                    name: 'field',
                    placeholder: "NickName",
                    type: "text",
                    value: nickname
                },
            ],
            buttons: [
                {
                    text: '取消',
                    handler: function (data) {
                    }
                },
                {
                    text: '确定',
                    handler: function (data) {
                        var newNick = data.field;
                        var postData = {
                            uid: localStorage.getItem('uid'),
                            cid: id,
                            nick: newNick,
                            action: 'nick_change'
                        };
                        _this.http.post(_this.serverUrl + "/contact_list.php", JSON.stringify(postData))
                            .map(function (res) { return res.json(); })
                            .subscribe(function (data) {
                            _this.ionViewWillEnter();
                        }, function (err) {
                        });
                    }
                }
            ]
        }).present();
    };
    MyContactListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-contact-list',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my-contact-list\my-contact-list.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>我的名片目录</ion-title>\n        <ion-buttons end (click)="presentPopover($event);">\n            <button ion-button icon-only>\n              <ion-icon name="person-add"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-list *ngIf="my_requests.length">\n        <ion-list-header>\n            新名片\n        </ion-list-header>\n        <ion-item-sliding *ngFor="let person of my_requests">\n            <ion-item>\n                <ion-thumbnail item-start>\n                    <img src="assets/imgs/other/default.png" *ngIf="!person.photo">\n                    <img src="{{person.photo}}" *ngIf="person.photo">\n                </ion-thumbnail>\n                <h2>{{person.realname}}</h2>\n                <p>会员帐号： {{person.username}}</p>\n                <button ion-button clear item-end (click)="acceptRequest(person.id);">同意</button>\n            </ion-item>\n            <ion-item-options side="right">\n                <button ion-button color="danger" (click)="rejectRequest(person.id);">\n                    <!-- <ion-icon name="trash"></ion-icon> -->\n                    保留\n                </button>\n            </ion-item-options>\n        </ion-item-sliding>\n    </ion-list>\n\n    <ion-list>\n        <ion-list-header>\n            我的名片\n        </ion-list-header>\n        <ion-item *ngIf="my_contacts.length == 0">\n            <p style="text-align: center;">没有名片</p>\n        </ion-item>\n        <ion-item-sliding *ngFor="let user of my_contacts">\n            <ion-item (click)="gotoFriendInfo(user.username, user.nickname);">\n                <ion-avatar item-start>\n                    <img src="assets/imgs/other/default.png" *ngIf="!user.photo">\n                    <img src="{{serverUrl}}/profile_imgs/{{user.photo}}" *ngIf="user.photo">\n                </ion-avatar>\n                <h2 *ngIf="user.nickname">{{user.nickname}}</h2>\n                <h2 *ngIf="!user.nickname">{{user.realname}}</h2>\n                <h3>会员帐号： {{user.username}}</h3>\n                <ion-badge color="danger" *ngIf="notiData[user.username] != 0">{{notiData[user.username]}}</ion-badge>\n                <!-- <p>I\'ve had a pretty messed up day. If we just...</p> -->\n            </ion-item>\n            <ion-item-options side="right">\n                <button ion-button color="secondary" (click)="changeNickname(user.id, user.nickname);">\n                    <ion-icon name="document"></ion-icon>\n                    昵称输入\n                </button>\n                <button ion-button color="danger" (click)="deleteContact(user.id);">\n                    <ion-icon name="trash"></ion-icon>\n                    删除\n                </button>\n            </ion-item-options>\n        </ion-item-sliding>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my-contact-list\my-contact-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_call_number__["a" /* CallNumber */]])
    ], MyContactListPage);
    return MyContactListPage;
}());

//# sourceMappingURL=my-contact-list.js.map

/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyFriendInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__chat_chat__ = __webpack_require__(117);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the MyFriendInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyFriendInfoPage = /** @class */ (function () {
    function MyFriendInfoPage(navCtrl, navParams, http, loadingCtrl, callNumber) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.callNumber = callNumber;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.friendData = "";
        this.photo = "";
        this.realname = "";
        this.nickname = "";
        this.other_cate = [];
    }
    MyFriendInfoPage.prototype.ionViewDidLoad = function () {
    };
    MyFriendInfoPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var friendID = this.navParams.get('cID');
        this.nickname = this.navParams.get('nick');
        var postData = {
            uid: friendID,
            action: 'get'
        };
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.serverUrl + "/get_user_mingpian.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            if (data.error == 1) {
                _this.photo = data.data.photo;
                _this.realname = data.data.realname;
                if (data.data.mingpian) {
                    _this.friendData = data.data.mingpian;
                    _this.other_cate = _this.friendData.other_cate.split("--");
                }
            }
            else {
                _this.navCtrl.pop();
            }
        }, function (err) {
            loading.dismiss();
        });
    };
    MyFriendInfoPage.prototype.callFriend = function (phoneNumber) {
        this.callNumber.callNumber(phoneNumber, true)
            .then(function (res) {
        })
            .catch(function (err) {
        });
    };
    MyFriendInfoPage.prototype.chatWithFriend = function () {
        var cID = this.friendData.username;
        var cName = (this.nickname) ? this.nickname : this.realname;
        var cPhoto = (this.photo) ? this.serverUrl + "/profile_imgs/" + this.photo : "assets/imgs/other/default.png";
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__chat_chat__["a" /* ChatPage */], { cid: cID, cname: cName, cphoto: cPhoto });
    };
    MyFriendInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-friend-info',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my-friend-info\my-friend-info.html"*/'<!--\n  Generated template for the MyFriendInfoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title></ion-title>\n        <ion-buttons end (click)="chatWithFriend()">\n            <button ion-button icon-only>\n          <ion-icon name="chatbubbles"></ion-icon>\n        </button>\n        </ion-buttons>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-card class="card{{friendData.card_style}}">\n        <div class="cover-layer"></div>\n        <div class="card-top{{friendData.card_style}}"></div>\n        <div class="card-bottom{{friendData.card_style}}"></div>\n        <ion-card-content>\n            <ion-grid>\n                <ion-row>\n                    <ion-col>\n                        <h1>{{friendData.c_name}}</h1>\n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col col-6 class="user-img">\n                        <img src="assets/imgs/other/default.png" *ngIf="!photo">\n                        <img src="{{serverUrl}}/profile_imgs/{{photo}}" *ngIf="photo">\n                        <h2 style="color: #ecdd44 !important; font-weight: 800 !important;" *ngIf="nickname">{{nickname}}</h2>\n                        <h2 style="color: #ecdd44 !important; font-weight: 800 !important;" *ngIf="!nickname">{{realname}}</h2>\n                    </ion-col>\n                    <ion-col col-6>\n                        <h2>{{realname}}</h2>\n                        <h3>{{friendData.job_cate}}</h3>\n                        <button ion-button icon-start small color="light" clear *ngIf="friendData.mobile1" (click)="callFriend(friendData.mobile1)">\n                            <ion-icon name="call"></ion-icon>\n                            {{friendData.mobile1}}\n                        </button>\n                        <button ion-button icon-start small color="light" clear *ngIf="friendData.mobile2" (click)="callFriend(friendData.mobile2)">\n                            <ion-icon name="call"></ion-icon>\n                            {{friendData.mobile2}}\n                        </button>\n                        <button ion-button icon-start small color="light" clear *ngIf="friendData.mobile3" (click)="callFriend(friendData.mobile3)">\n                            <ion-icon name="call"></ion-icon>\n                            {{friendData.mobile3}}\n                        </button>\n                        <button ion-button icon-start small color="light" clear *ngIf="friendData.phone1" (click)="callFriend(friendData.phone1)">\n                            <ion-icon name="phone-portrait"></ion-icon>\n                            {{friendData.phone1}}\n                        </button>\n                        <button ion-button icon-start small color="light" clear *ngIf="friendData.phone2" (click)="callFriend(friendData.phone2)">\n                            <ion-icon name="phone-portrait"></ion-icon>\n                            {{friendData.phone2}}\n                        </button>\n                        <button ion-button icon-start small color="light" clear *ngIf="friendData.phone3" (click)="callFriend(friendData.phone3)">\n                            <ion-icon name="phone-portrait"></ion-icon>\n                            {{friendData.phone3}}\n                        </button>\n                        <!-- <p *ngFor="let cate of other_cate; let nIdx = index"><u>其他社会职务{{nIdx + 1}}:</u><br>{{cate}}</p> -->\n                        <!-- <p *ngIf="friendData.other_cate"><u>其他社会职务:</u></p>\n                        <p *ngIf="friendData.other_cate">{{friendData.other_cate}}</p> -->\n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col>\n                        <p *ngFor="let cate of other_cate; let nIdx = index"><u>其他社会职务{{nIdx + 1}}: </u>{{cate}}</p>\n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col *ngIf="friendData.job_desc">\n                        <p><u>社会贡献:</u></p>\n                        <p>{{friendData.job_desc}}</p>\n                    </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col>\n                        <p *ngIf="friendData.c_address"><u>地址:</u> {{friendData.c_address}}</p>\n                        <p *ngIf="friendData.email"><u>邮箱:</u> {{friendData.email}}</p>\n                        <p *ngIf="friendData.homepage"><u>网址:</u> {{friendData.homepage}}</p>\n                    </ion-col>\n                </ion-row>\n            </ion-grid>\n        </ion-card-content>\n        <!-- <ion-row>\n            <ion-col>\n                <button ion-button icon-start clear small (click)="callFriend(friendData.mobile)">\n                    <ion-icon name="call"></ion-icon>\n                    <div>{{friendData.mobile}}</div>\n                </button>\n            </ion-col>\n        </ion-row> -->\n    </ion-card>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my-friend-info\my-friend-info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_call_number__["a" /* CallNumber */]])
    ], MyFriendInfoPage);
    return MyFriendInfoPage;
}());

//# sourceMappingURL=my-friend-info.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPopoverComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ContactPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ContactPopoverComponent = /** @class */ (function () {
    function ContactPopoverComponent(viewCtrl) {
        this.viewCtrl = viewCtrl;
        console.log('Hello ContactPopoverComponent Component');
        this.text = 'Hello World';
    }
    ContactPopoverComponent.prototype.itemClick = function (item) {
        this.viewCtrl.dismiss(item);
    };
    ContactPopoverComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'contact-popover',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\components\contact-popover\contact-popover.html"*/'<ion-list>\n    <ion-item (click)="itemClick(\'new_contact\');" class="border-bottom">\n        <ion-icon name="person-add" item-start></ion-icon>\n        新名片\n    </ion-item>\n    <ion-item (click)="itemClick(\'single-chat\');" class="border-bottom">\n        <ion-icon name="chatbubbles" item-start></ion-icon>\n        聊天窗口\n    </ion-item>\n    <ion-item (click)="itemClick(\'group-chat\');">\n        <ion-icon name="logo-snapchat" item-start></ion-icon>\n        群聊天\n    </ion-item>\n</ion-list>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\components\contact-popover\contact-popover.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ViewController */]])
    ], ContactPopoverComponent);
    return ContactPopoverComponent;
}());

//# sourceMappingURL=contact-popover.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__forgot_password_change_forgot_password_change__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ForgotPasswordPage = /** @class */ (function () {
    function ForgotPasswordPage(navCtrl, http, loadingCtrl, alertCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.sms_btn_caption = "获取验证码";
        this.sms_timer_hasStarted = false;
        this.sms_secondsRemaining = 25;
        this.mobile = "";
        this.sms = "";
    }
    ForgotPasswordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ForgotPasswordPage');
    };
    ForgotPasswordPage.prototype.sendSMS = function () {
        if (this.sms_timer_hasStarted)
            return;
        //call sms service
        var postParam = {
            'mobile': this.mobile
        };
        this.http.post(this.serverUrl + "/send_sms.php", JSON.stringify(postParam))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
        }, function (err) {
        });
        this.sms_timer_hasStarted = true;
        this.timerTick();
    };
    ForgotPasswordPage.prototype.timerTick = function () {
        var _this = this;
        setTimeout(function () {
            _this.sms_secondsRemaining--;
            _this.sms_btn_caption = _this.sms_secondsRemaining;
            if (_this.sms_secondsRemaining > 0) {
                _this.timerTick();
            }
            else {
                _this.sms_timer_hasStarted = false;
                _this.sms_secondsRemaining = 25;
                _this.sms_btn_caption = "获取验证码";
            }
        }, 1000);
    };
    ForgotPasswordPage.prototype.valid = function () {
        var _this = this;
        if (this.sms_secondsRemaining == 25) {
            this.alertCtrl.create({
                title: "警告",
                message: "超过了短信代码的有效时间",
                buttons: ["确定"]
            }).present();
            return;
        }
        if (this.mobile == "" || this.sms == "") {
            this.alertCtrl.create({
                title: "通知",
                message: "请输入手机号码和验证码。",
                buttons: ["确定"]
            }).present();
        }
        else {
            var postData = {
                mobile: this.mobile,
                sms: this.sms,
                action: 'valid_user'
            };
            var loading_1 = this.loadingCtrl.create();
            loading_1.present();
            this.http.post(this.serverUrl + "/forgot_password.php", JSON.stringify(postData))
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                loading_1.dismiss();
                if (data.error == 1) {
                    _this.alertCtrl.create({
                        title: "通知",
                        message: "您的会员编号是" + data.data + "。",
                        buttons: [
                            {
                                text: '忘记密码',
                                handler: function () {
                                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__forgot_password_change_forgot_password_change__["a" /* ForgotPasswordChangePage */], { uid: data.data });
                                }
                            },
                            {
                                text: '确定',
                                handler: function () {
                                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
                                }
                            }
                        ]
                    }).present();
                }
                else if (data.error == 2) {
                    _this.alertCtrl.create({
                        title: "警告",
                        message: "您输入的验证码不一致。" + data.data,
                        buttons: ["确定"]
                    }).present();
                }
                else {
                    _this.alertCtrl.create({
                        title: "警告",
                        message: "您的手机号码不存在。",
                        buttons: ["确定"]
                    }).present();
                }
            }, function (err) {
                loading_1.dismiss();
                _this.alertCtrl.create({
                    title: "通知",
                    message: "网路失败！",
                    buttons: ["确定"]
                }).present();
            });
        }
    };
    ForgotPasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-forgot-password',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\forgot-password\forgot-password.html"*/'<!--\n  Generated template for the ForgotPasswordPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>恢复用户名</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="login-content" padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <div class="login-box">\n        <ion-row>\n            <ion-col>\n                <ion-list>\n                    <ion-item>\n                        <ion-label floating>\n                            <ion-icon name="phone-portrait" item-start class="text-primary"></ion-icon>\n                            输入手机号\n                        </ion-label>\n                        <ion-input type="text" [(ngModel)]="mobile"></ion-input>                        \n                    </ion-item>\n                    <ion-item>\n                        <ion-label floating>\n                            <ion-icon name="mail-open" item-start class="text-primary"></ion-icon>\n                            输入验证码\n                        </ion-label>\n                        <ion-input type="text" [(ngModel)]="sms"></ion-input>                                               \n                        <button ion-button class="sms-btn" item-end color="danger" (click)="sendSMS();">{{sms_btn_caption}}</button>                        \n                    </ion-item>\n                </ion-list>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col class="signup-col">\n                <button ion-button class="login-btn" full color="danger" (click)="valid();">下一个</button>\n            </ion-col>\n        </ion-row>\n    </div>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\forgot-password\forgot-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], ForgotPasswordPage);
    return ForgotPasswordPage;
}());

//# sourceMappingURL=forgot-password.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPasswordChangePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ForgotPasswordChangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ForgotPasswordChangePage = /** @class */ (function () {
    function ForgotPasswordChangePage(navCtrl, http, loadingCtrl, alertCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.username = "";
        this.password = "";
        this.conf_password = "";
    }
    ForgotPasswordChangePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ForgotPasswordChangePage');
    };
    ForgotPasswordChangePage.prototype.ionViewWillEnter = function () {
        this.username = this.navParams.get('uid');
        if (this.username == null || this.username == "") {
            this.navCtrl.pop();
        }
    };
    ForgotPasswordChangePage.prototype.changePassword = function () {
        var _this = this;
        if (this.password.length < 6) {
            this.alertCtrl.create({
                title: "警告",
                message: "最少输入6位数",
                buttons: ["确定"]
            }).present();
        }
        else {
            if (this.password != this.conf_password) {
                this.alertCtrl.create({
                    title: "警告",
                    message: "密码不准确",
                    buttons: ["确定"]
                }).present();
            }
            else {
                var postData = {
                    action: 'change_password',
                    username: this.username,
                    password: this.password
                };
                var loading_1 = this.loadingCtrl.create();
                loading_1.present();
                this.http.post(this.serverUrl + "/forgot_password.php", JSON.stringify(postData))
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    loading_1.dismiss();
                    if (data.error == 1) {
                        _this.alertCtrl.create({
                            title: "通知",
                            message: "变更密码成功",
                            buttons: ["确定"]
                        }).present();
                    }
                    else {
                        _this.alertCtrl.create({
                            title: "通知",
                            message: "变更失败！",
                            buttons: ["确定"]
                        }).present();
                    }
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
                }, function (err) {
                    loading_1.dismiss();
                    _this.alertCtrl.create({
                        title: "通知",
                        message: "网路失败！",
                        buttons: ["确定"]
                    }).present();
                    _this.navCtrl.pop();
                });
            }
        }
    };
    ForgotPasswordChangePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-forgot-password-change',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\forgot-password-change\forgot-password-change.html"*/'<!--\n  Generated template for the ForgotPasswordChangePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title></ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="login-content" padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <div class="login-box">\n        <ion-row>\n            <ion-col>\n                <ion-list>\n                    <ion-item>\n                        <ion-label floating>\n                            <ion-icon name="lock" item-start class="text-primary"></ion-icon>\n                            新密码\n                        </ion-label>\n                        <ion-input type="password" [(ngModel)]="password"></ion-input>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label floating>\n                            <ion-icon name="lock" item-start class="text-primary"></ion-icon>\n                            确认密码\n                        </ion-label>\n                        <ion-input type="password" [(ngModel)]="conf_password"></ion-input>\n                    </ion-item>\n                </ion-list>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col class="signup-col">\n                <button ion-button class="login-btn" full color="danger" (click)="changePassword();">密码变更</button>\n            </ion-col>\n        </ion-row>\n    </div>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\forgot-password-change\forgot-password-change.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], ForgotPasswordChangePage);
    return ForgotPasswordChangePage;
}());

//# sourceMappingURL=forgot-password-change.js.map

/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_save_user_name_save_user_name__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SignupPage = /** @class */ (function () {
    function SignupPage(navCtrl, navParams, http, alertCtrl, loadingCtrl, saveIDProvider, actionSheet) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.saveIDProvider = saveIDProvider;
        this.actionSheet = actionSheet;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.sms_btn_caption = "获取验证码";
        this.sms_timer_hasStarted = false;
        this.sms_secondsRemaining = 25;
        this.realname = "";
        this.mobile = "";
        this.sms = "";
        this.pwd = "";
        this.repwd = "";
        this.tjrname = "";
        this.diqu = "";
        this.provinces = [];
        this.cities = [];
        this.areas = [];
        this.s_provinceID = "";
        this.s_cityID = "";
        this.s_areaID = "";
        this.s_province = "";
        this.s_city = "";
    }
    SignupPage.prototype.ionViewDidLoad = function () {
        navigator.geolocation.getCurrentPosition(function (pos) {
        });
    };
    SignupPage.prototype.ionViewWillEnter = function () {
    };
    SignupPage.prototype.sendSMS = function () {
        if (this.sms_timer_hasStarted)
            return;
        //call sms service
        var postParam = {
            'mobile': this.mobile
        };
        this.http.post(this.serverUrl + "/send_sms.php", JSON.stringify(postParam))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
        }, function (err) {
        });
        this.sms_timer_hasStarted = true;
        this.timerTick();
    };
    SignupPage.prototype.timerTick = function () {
        var _this = this;
        setTimeout(function () {
            _this.sms_secondsRemaining--;
            _this.sms_btn_caption = _this.sms_secondsRemaining;
            if (_this.sms_secondsRemaining > 0) {
                _this.timerTick();
            }
            else {
                _this.sms_timer_hasStarted = false;
                _this.sms_secondsRemaining = 25;
                _this.sms_btn_caption = "获取验证码";
            }
        }, 1000);
    };
    SignupPage.prototype.signup = function () {
        var _this = this;
        if (this.sms_secondsRemaining == 25) {
            this.alertCtrl.create({
                title: "警告",
                message: "超过了短信代码的有效时间",
                buttons: ["确定"]
            }).present();
            return;
        }
        if (this.pwd.trim() != "" && this.pwd != this.repwd) {
            this.alertCtrl.create({
                title: "警告",
                message: "密码不一致",
                buttons: ["确定"]
            }).present();
        }
        else {
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
                var loading_1 = this.loadingCtrl.create();
                loading_1.present();
                this.http.post(this.serverUrl + "/signup.php", JSON.stringify(postParam))
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    loading_1.dismiss();
                    switch (data.error) {
                        case 1:
                            _this.alertCtrl.create({
                                title: "成功",
                                message: "您的会员编号是" + data.uid,
                                buttons: [{
                                        text: '确定',
                                        handler: function () {
                                            _this.navCtrl.pop();
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
                            _this.alertCtrl.create({
                                title: "警告",
                                message: data.message,
                                buttons: ["确定"]
                            }).present();
                            break;
                        default:
                            break;
                    }
                }, function (err) {
                    loading_1.dismiss();
                });
            }
            else {
                this.alertCtrl.create({
                    title: "警告",
                    message: "请输入会员帐号和密码。",
                    buttons: ["确定"]
                }).present();
            }
        }
    };
    SignupPage.prototype.getProvinceData = function () {
        var _this = this;
        this.s_province = "";
        this.s_city = "";
        this.http.get("assets/json/dg_province.json")
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.provinces = [];
            for (var index = 0; index < data.length; index++) {
                _this.provinces.push(data[index]);
            }
            var provinceSheet = _this.actionSheet.create({
                title: "省份",
                cssClass: "cus_height"
            });
            var _loop_1 = function (index) {
                button = {
                    text: _this.provinces[index].province,
                    handler: function () {
                        _this.s_provinceID = _this.provinces[index].provinceID;
                        _this.s_province = _this.provinces[index].province;
                        _this.inputCityData();
                    }
                };
                provinceSheet.addButton(button);
            };
            var button;
            for (var index = 0; index < _this.provinces.length; index++) {
                _loop_1(index);
            }
            provinceSheet.present();
        });
    };
    SignupPage.prototype.getCityData = function () {
        var _this = this;
        this.http.get("assets/json/dg_city.json")
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.cities = [];
            for (var index = 0; index < data.length; index++) {
                if (data[index].father == _this.s_provinceID) {
                    _this.cities.push(data[index]);
                }
            }
            var citySheet = _this.actionSheet.create({
                title: "城市",
                cssClass: "cus_height",
                buttons: [{
                        text: "---",
                        handler: function () {
                            _this.diqu = _this.s_province;
                        }
                    }]
            });
            var _loop_2 = function (index) {
                button = {
                    text: _this.cities[index].city,
                    handler: function () {
                        _this.s_cityID = _this.cities[index].cityID;
                        _this.s_city = _this.cities[index].city;
                        _this.inputAreaData();
                    }
                };
                citySheet.addButton(button);
            };
            var button;
            for (var index = 0; index < _this.cities.length; index++) {
                _loop_2(index);
            }
            citySheet.present();
        });
    };
    SignupPage.prototype.getAreaData = function () {
        var _this = this;
        this.http.get("assets/json/dg_area.json")
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.areas = [];
            for (var index = 0; index < data.length; index++) {
                if (data[index].father == _this.s_cityID) {
                    _this.areas.push(data[index]);
                }
            }
            var areaSheet = _this.actionSheet.create({
                title: "地区",
                cssClass: "cus_height"
            });
            var _loop_3 = function (index) {
                button = {
                    text: _this.areas[index].area,
                    handler: function () {
                        _this.s_areaID = _this.areas[index].areaID;
                        _this.diqu = _this.s_province + "/" + _this.s_city + "/" + _this.areas[index].area;
                    }
                };
                areaSheet.addButton(button);
            };
            var button;
            for (var index = 0; index < _this.areas.length; index++) {
                _loop_3(index);
            }
            areaSheet.present();
        });
    };
    SignupPage.prototype.inputProvinceData = function () {
        this.getProvinceData();
    };
    SignupPage.prototype.inputCityData = function () {
        this.getCityData();
    };
    SignupPage.prototype.inputAreaData = function () {
        this.getAreaData();
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\signup\signup.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>会员注册</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content class="signup-content" padding>       \n    <div class="signup-box">\n        <ion-row>\n            <ion-col>\n                <ion-list>                    \n                    <ion-item>\n                        <ion-label floating>\n                            <ion-icon name="person" item-start class="text-primary"></ion-icon>\n                            会员姓名\n                        </ion-label>\n                        <ion-input type="text" [(ngModel)]="realname"></ion-input>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label floating>\n                            <ion-icon name="call" item-start class="text-primary"></ion-icon>\n                            输入手机号\n                        </ion-label>\n                        <ion-input type="text" [(ngModel)]="mobile"></ion-input>                        \n                    </ion-item>\n                    <ion-item>\n                        <ion-label floating>\n                            <ion-icon name="mail-open" item-start class="text-primary"></ion-icon>\n                            输入验证码\n                        </ion-label>\n                        <ion-input type="text" [(ngModel)]="sms"></ion-input>                                               \n                        <button ion-button class="sms-btn" item-end color="danger" (click)="sendSMS();">{{sms_btn_caption}}</button>                        \n                    </ion-item>\n                    <ion-item>\n                        <ion-label floating>\n                            <ion-icon name="lock" item-start class="text-primary"></ion-icon>\n                            密码\n                        </ion-label>\n                        <ion-input type="password" [(ngModel)]="pwd"></ion-input>\n                    </ion-item>\n                    <ion-item>\n                        <ion-label floating>\n                            <ion-icon name="lock" item-start class="text-primary"></ion-icon>\n                            确认密码\n                        </ion-label>\n                        <ion-input type="password" [(ngModel)]="repwd"></ion-input>\n                    </ion-item>\n                    <ion-item>  \n                        <ion-label floating>\n                            <ion-icon name="compass" item-start class="text-primary"></ion-icon>\n                            省份，城市，地区\n                        </ion-label>\n                        <ion-input type="text" [(ngModel)]="diqu" (click)="inputProvinceData()" readonly></ion-input>                                              \n                    </ion-item>                    \n                    <ion-item>\n                        <ion-label floating>\n                            <ion-icon name="people" item-start class="text-primary"></ion-icon>\n                            推荐人编号\n                        </ion-label>\n                        <ion-input type="text" [(ngModel)]="tjrname"></ion-input>                        \n                    </ion-item>\n                </ion-list>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col class="signup-col">                \n                <button ion-button class="signup-btn" full color="danger" (click)="signup();">注册</button>\n            </ion-col>\n        </ion-row>\n    </div>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\signup\signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_save_user_name_save_user_name__["a" /* SaveUserNameProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdsDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ads_list_ads_list__ = __webpack_require__(58);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AdsDetailPage = /** @class */ (function () {
    function AdsDetailPage(navCtrl, navParams, sanitizer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sanitizer = sanitizer;
        this.adsIdx = Array();
        for (var index = 0; index < 22; index++) {
            this.adsIdx[index] = index + 1;
        }
    }
    AdsDetailPage.prototype.ionViewDidLoad = function () {
        this.uid = localStorage.getItem('uid');
        this.uplus_site_url = this.transform("http://unak.vip/qiantu");
    };
    AdsDetailPage.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    AdsDetailPage.prototype.showAdsList = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__ads_list_ads_list__["a" /* AdsListPage */]);
    };
    AdsDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({ name: 'safe' }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ads-detail',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\ads-detail\ads-detail.html"*/'<!--\n  Generated template for the AdsDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>钱途介绍</ion-title>\n        <ion-buttons end (click)="showAdsList();">\n            <button ion-button icon-only>\n                <ion-icon name="desktop"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <!-- <iframe width="100%" height="100%" [src]="uplus_site_url" frameborder="0"></iframe> -->\n    <img *ngFor="let index of adsIdx" src="assets/imgs/ads/{{index}}.png" alt="" style="margin: 10px 0; width: 100%;">\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\ads-detail\ads-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */]])
    ], AdsDetailPage);
    return AdsDetailPage;
}());

//# sourceMappingURL=ads-detail.js.map

/***/ }),

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmojiProvider; });
var EmojiProvider = /** @class */ (function () {
    function EmojiProvider() {
    }
    EmojiProvider.prototype.getEmojis = function () {
        var EMOJIS = "😀 😃 😄 😁 😆 😅 😂 🤣 ☺️ 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 🤡 🤠 😏 😒 😞 😔 😟 😕 🙁" +
            " ☹️ 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 🤤 😭 😓 😪 😴 🙄 🤔 🤥 😬 🤐 🤢 🤧 😷 🤒 🤕 😈 👿" +
            " 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 🤝 👍 👎 👊 ✊ 🤛 🤜 🤞 ✌️ 🤘 👌 👈 👉 👆 👇 ☝️ ✋ 🤚" +
            " 🖐 🖖 👋 🤙 💪 🖕 ✍️ 🤳 💅 🖖 💄 💋 👄 👅 👂 👃 👣 👁 👀 🗣 👤 👥 👶 👦 👧 👨 👩 👱‍♀️ 👱 👴 👵 👲 👳‍♀️ 👳 👮‍♀️ 👮 👷‍♀️ 👷" +
            " 💂‍♀️ 💂 🕵️‍♀️ 🕵️ 👩‍⚕️ 👨‍⚕️ 👩‍🌾 👨‍🌾 👩‍🍳 👨‍🍳 👩‍🎓 👨‍🎓 👩‍🎤 👨‍🎤 👩‍🏫 👨‍🏫 👩‍🏭 👨‍🏭 👩‍💻 👨‍💻 👩‍💼 👨‍💼 👩‍🔧 👨‍🔧 👩‍🔬 👨‍🔬" +
            " 👩‍🎨 👨‍🎨 👩‍🚒 👨‍🚒 👩‍✈️ 👨‍✈️ 👩‍🚀 👨‍🚀 👩‍⚖️ 👨‍⚖️ 🤶 🎅 👸 🤴 👰 🤵 👼 🤰 🙇‍♀️ 🙇 💁 💁‍♂️ 🙅 🙅‍♂️ 🙆 🙆‍♂️ 🙋 🙋‍♂️ 🤦‍♀️ 🤦‍♂️ 🤷‍♀" +
            "️ 🤷‍♂️ 🙎 🙎‍♂️ 🙍 🙍‍♂️ 💇 💇‍♂️ 💆 💆‍♂️ 🕴 💃 🕺 👯 👯‍♂️ 🚶‍♀️ 🚶 🏃‍♀️ 🏃 👫 👭 👬 💑 👩‍❤️‍👩 👨‍❤️‍👨 💏 👩‍❤️‍💋‍👩 👨‍❤️‍💋‍👨 👪 👨‍👩‍👧" +
            " 👨‍👩‍👧‍👦 👨‍👩‍👦‍👦 👨‍👩‍👧‍👧 👩‍👩‍👦 👩‍👩‍👧 👩‍👩‍👧‍👦 👩‍👩‍👦‍👦 👩‍👩‍👧‍👧 👨‍👨‍👦 👨‍👨‍👧 👨‍👨‍👧‍👦 👨‍👨‍👦‍👦 👨‍👨‍👧‍👧 👩‍👦 👩‍👧" +
            " 👩‍👧‍👦 👩‍👦‍👦 👩‍👧‍👧 👨‍👦 👨‍👧 👨‍👧‍👦 👨‍👦‍👦 👨‍👧‍👧 👚 👕 👖 👔 👗 👙 👘 👠 👡 👢 👞 👟 👒 🎩 🎓 👑 ⛑ 🎒 👝 👛 👜 💼 👓" +
            " 🕶 🌂 ☂️";
        var EmojiArr = EMOJIS.split(' ');
        var groupNum = Math.ceil(EmojiArr.length / (24));
        var items = [];
        for (var i = 0; i < groupNum; i++) {
            items.push(EmojiArr.slice(i * 24, (i + 1) * 24));
        }
        return items;
    };
    return EmojiProvider;
}());

//# sourceMappingURL=emoji.js.map

/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(410);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_shake__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_transfer__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_file_path__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_camera__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_component__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_login_login__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_signup_signup__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_home_home__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_ads_ads__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_ads_detail_ads_detail__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_my_my__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_my_info_my_info__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_my_level_my_level__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_my_advertise_my_advertise__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_my_ads_add_my_ads_add__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_my_ads_item_view_my_ads_item_view__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_my_shop_mole_my_shop_mole__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_my_contact_list_my_contact_list__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_my_friend_info_my_friend_info__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_my_contact_find_my_contact_find__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_my_info_ming_pian_my_info_ming_pian__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_my_ming_pian_my_ming_pian__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_my_wallet_my_wallet__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_my_wallet_coin_my_wallet_coin__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_my_wallet_price_my_wallet_price__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_my_wallet_uplus_my_wallet_uplus__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_my_wallet_shop_my_wallet_shop__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_my_wallet_outpu_my_wallet_outpu__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_my_wallet_uplus_out_my_wallet_uplus_out__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_my_charge_my_charge__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_my_wallet_charge_my_wallet_charge__ = __webpack_require__(358);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_shop_shop__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_shop_mole_item_view_shop_mole_item_view__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_shop_pay_screen_shop_pay_screen__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_setting_setting__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_setting_change_password_setting_change_password__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_setting_change_pay_password_setting_change_pay_password__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_setting_pay_option_setting_pay_option__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_my_info_more_my_info_more__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_my_info_qr_code_my_info_qr_code__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pages_help_support_help_support__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__pages_new_ticket_new_ticket__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__pages_help_support_item_view_help_support_item_view__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__components_normall_popover_normall_popover__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__components_contact_popover_contact_popover__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__providers_save_user_name_save_user_name__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__ionic_native_call_number__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55_angular2_baidu_map__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__ionic_native_barcode_scanner__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__pages_qr_code_scanner_qr_code_scanner__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__pages_forgot_password_forgot_password__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__pages_forgot_password_change_forgot_password_change__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__pages_uplus_sell_board_uplus_sell_board__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__pages_uplus_my_board_uplus_my_board__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__pages_chat_chat__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__pages_about_app_about_app__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__providers_emoji__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__providers_chat_service__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__providers_WechatPlugin__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__components_emoji_picker_emoji_picker_module__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__angular_common_http__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__pipes_relative_time__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__pages_new_version_new_version__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__pages_ads_list_ads_list__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72__pages_ads_item_detail_ads_item_detail__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_73__pages_my_wallet_coin_out_my_wallet_coin_out__ = __webpack_require__(357);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74__pages_my_market_info_my_market_info__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_75__pages_uplus_history_board_uplus_history_board__ = __webpack_require__(377);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












































































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_13__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_62__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_63__pages_about_app_about_app__["a" /* AboutAppPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_ads_ads__["a" /* AdsPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_ads_detail_ads_detail__["a" /* AdsDetailPage */],
                __WEBPACK_IMPORTED_MODULE_71__pages_ads_list_ads_list__["a" /* AdsListPage */],
                __WEBPACK_IMPORTED_MODULE_72__pages_ads_item_detail_ads_item_detail__["a" /* AdsItemDetailPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_my_my__["a" /* MyPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_my_info_my_info__["a" /* MyInfoPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_my_info_more_my_info_more__["a" /* MyInfoMorePage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_my_info_qr_code_my_info_qr_code__["a" /* MyInfoQrCodePage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_my_level_my_level__["a" /* MyLevelPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_my_advertise_my_advertise__["a" /* MyAdvertisePage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_my_ads_add_my_ads_add__["a" /* MyAdsAddPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_my_ads_item_view_my_ads_item_view__["a" /* MyAdsItemViewPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_my_shop_mole_my_shop_mole__["a" /* MyShopMolePage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_my_contact_list_my_contact_list__["a" /* MyContactListPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_my_friend_info_my_friend_info__["a" /* MyFriendInfoPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_my_contact_find_my_contact_find__["a" /* MyContactFindPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_my_info_ming_pian_my_info_ming_pian__["a" /* MyInfoMingPianPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_my_ming_pian_my_ming_pian__["a" /* MyMingPianPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_my_wallet_my_wallet__["a" /* MyWalletPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_my_wallet_coin_my_wallet_coin__["a" /* MyWalletCoinPage */],
                __WEBPACK_IMPORTED_MODULE_73__pages_my_wallet_coin_out_my_wallet_coin_out__["a" /* MyWalletCoinOutPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_my_wallet_price_my_wallet_price__["a" /* MyWalletPricePage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_my_wallet_uplus_my_wallet_uplus__["a" /* MyWalletUplusPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_my_wallet_shop_my_wallet_shop__["a" /* MyWalletShopPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_my_wallet_outpu_my_wallet_outpu__["a" /* MyWalletOutpuPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_my_wallet_uplus_out_my_wallet_uplus_out__["a" /* MyWalletUplusOutPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_my_wallet_charge_my_wallet_charge__["a" /* MyWalletChargePage */],
                __WEBPACK_IMPORTED_MODULE_74__pages_my_market_info_my_market_info__["a" /* MyMarketInfoPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_my_charge_my_charge__["a" /* MyChargePage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_shop_shop__["a" /* ShopPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_shop_pay_screen_shop_pay_screen__["a" /* ShopPayScreenPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_shop_mole_item_view_shop_mole_item_view__["a" /* ShopMoleItemViewPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_setting_setting__["a" /* SettingPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_setting_change_password_setting_change_password__["a" /* SettingChangePasswordPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_setting_change_pay_password_setting_change_pay_password__["a" /* SettingChangePayPasswordPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_setting_pay_option_setting_pay_option__["a" /* SettingPayOptionPage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_help_support_help_support__["a" /* HelpSupportPage */],
                __WEBPACK_IMPORTED_MODULE_49__pages_new_ticket_new_ticket__["a" /* NewTicketPage */],
                __WEBPACK_IMPORTED_MODULE_50__pages_help_support_item_view_help_support_item_view__["a" /* HelpSupportItemViewPage */],
                __WEBPACK_IMPORTED_MODULE_51__components_normall_popover_normall_popover__["a" /* NormallPopoverComponent */],
                __WEBPACK_IMPORTED_MODULE_52__components_contact_popover_contact_popover__["a" /* ContactPopoverComponent */],
                __WEBPACK_IMPORTED_MODULE_57__pages_qr_code_scanner_qr_code_scanner__["a" /* QrCodeScannerPage */],
                __WEBPACK_IMPORTED_MODULE_58__pages_forgot_password_forgot_password__["a" /* ForgotPasswordPage */],
                __WEBPACK_IMPORTED_MODULE_59__pages_forgot_password_change_forgot_password_change__["a" /* ForgotPasswordChangePage */],
                __WEBPACK_IMPORTED_MODULE_60__pages_uplus_sell_board_uplus_sell_board__["a" /* UplusSellBoardPage */],
                __WEBPACK_IMPORTED_MODULE_61__pages_uplus_my_board_uplus_my_board__["a" /* UplusMyBoardPage */],
                __WEBPACK_IMPORTED_MODULE_69__pipes_relative_time__["a" /* RelativeTime */],
                __WEBPACK_IMPORTED_MODULE_70__pages_new_version_new_version__["a" /* NewVersionPage */],
                __WEBPACK_IMPORTED_MODULE_75__pages_uplus_history_board_uplus_history_board__["a" /* UplusHistoryBoardPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_55_angular2_baidu_map__["a" /* BaiduMapModule */].forRoot({ ak: 'tVdy4eXUm05dBXTC9mR7mDjlgUR9GeeV' }),
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_68__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_67__components_emoji_picker_emoji_picker_module__["a" /* EmojiPickerComponentModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */], { statusbarPadding: true }, {
                    links: []
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_13__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_62__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_63__pages_about_app_about_app__["a" /* AboutAppPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_ads_ads__["a" /* AdsPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_ads_detail_ads_detail__["a" /* AdsDetailPage */],
                __WEBPACK_IMPORTED_MODULE_71__pages_ads_list_ads_list__["a" /* AdsListPage */],
                __WEBPACK_IMPORTED_MODULE_72__pages_ads_item_detail_ads_item_detail__["a" /* AdsItemDetailPage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_my_my__["a" /* MyPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_my_info_my_info__["a" /* MyInfoPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_my_info_more_my_info_more__["a" /* MyInfoMorePage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_my_info_qr_code_my_info_qr_code__["a" /* MyInfoQrCodePage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_my_level_my_level__["a" /* MyLevelPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_my_advertise_my_advertise__["a" /* MyAdvertisePage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_my_ads_add_my_ads_add__["a" /* MyAdsAddPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_my_ads_item_view_my_ads_item_view__["a" /* MyAdsItemViewPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_my_shop_mole_my_shop_mole__["a" /* MyShopMolePage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_my_contact_list_my_contact_list__["a" /* MyContactListPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_my_info_ming_pian_my_info_ming_pian__["a" /* MyInfoMingPianPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_my_ming_pian_my_ming_pian__["a" /* MyMingPianPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_my_friend_info_my_friend_info__["a" /* MyFriendInfoPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_my_contact_find_my_contact_find__["a" /* MyContactFindPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_my_wallet_my_wallet__["a" /* MyWalletPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_my_wallet_coin_my_wallet_coin__["a" /* MyWalletCoinPage */],
                __WEBPACK_IMPORTED_MODULE_73__pages_my_wallet_coin_out_my_wallet_coin_out__["a" /* MyWalletCoinOutPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_my_wallet_price_my_wallet_price__["a" /* MyWalletPricePage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_my_wallet_uplus_my_wallet_uplus__["a" /* MyWalletUplusPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_my_wallet_shop_my_wallet_shop__["a" /* MyWalletShopPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_my_wallet_outpu_my_wallet_outpu__["a" /* MyWalletOutpuPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_my_wallet_uplus_out_my_wallet_uplus_out__["a" /* MyWalletUplusOutPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_my_wallet_charge_my_wallet_charge__["a" /* MyWalletChargePage */],
                __WEBPACK_IMPORTED_MODULE_74__pages_my_market_info_my_market_info__["a" /* MyMarketInfoPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_my_charge_my_charge__["a" /* MyChargePage */],
                __WEBPACK_IMPORTED_MODULE_39__pages_shop_shop__["a" /* ShopPage */],
                __WEBPACK_IMPORTED_MODULE_41__pages_shop_pay_screen_shop_pay_screen__["a" /* ShopPayScreenPage */],
                __WEBPACK_IMPORTED_MODULE_40__pages_shop_mole_item_view_shop_mole_item_view__["a" /* ShopMoleItemViewPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_setting_setting__["a" /* SettingPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_setting_change_password_setting_change_password__["a" /* SettingChangePasswordPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_setting_change_pay_password_setting_change_pay_password__["a" /* SettingChangePayPasswordPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_setting_pay_option_setting_pay_option__["a" /* SettingPayOptionPage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_help_support_help_support__["a" /* HelpSupportPage */],
                __WEBPACK_IMPORTED_MODULE_49__pages_new_ticket_new_ticket__["a" /* NewTicketPage */],
                __WEBPACK_IMPORTED_MODULE_50__pages_help_support_item_view_help_support_item_view__["a" /* HelpSupportItemViewPage */],
                __WEBPACK_IMPORTED_MODULE_51__components_normall_popover_normall_popover__["a" /* NormallPopoverComponent */],
                __WEBPACK_IMPORTED_MODULE_52__components_contact_popover_contact_popover__["a" /* ContactPopoverComponent */],
                __WEBPACK_IMPORTED_MODULE_57__pages_qr_code_scanner_qr_code_scanner__["a" /* QrCodeScannerPage */],
                __WEBPACK_IMPORTED_MODULE_58__pages_forgot_password_forgot_password__["a" /* ForgotPasswordPage */],
                __WEBPACK_IMPORTED_MODULE_59__pages_forgot_password_change_forgot_password_change__["a" /* ForgotPasswordChangePage */],
                __WEBPACK_IMPORTED_MODULE_60__pages_uplus_sell_board_uplus_sell_board__["a" /* UplusSellBoardPage */],
                __WEBPACK_IMPORTED_MODULE_61__pages_uplus_my_board_uplus_my_board__["a" /* UplusMyBoardPage */],
                __WEBPACK_IMPORTED_MODULE_70__pages_new_version_new_version__["a" /* NewVersionPage */],
                __WEBPACK_IMPORTED_MODULE_75__pages_uplus_history_board_uplus_history_board__["a" /* UplusHistoryBoardPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_shake__["a" /* Shake */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_in_app_browser__["a" /* InAppBrowser */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_transfer__["a" /* Transfer */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_file_path__["a" /* FilePath */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_53__providers_save_user_name_save_user_name__["a" /* SaveUserNameProvider */],
                __WEBPACK_IMPORTED_MODULE_54__ionic_native_call_number__["a" /* CallNumber */],
                __WEBPACK_IMPORTED_MODULE_56__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
                __WEBPACK_IMPORTED_MODULE_64__providers_emoji__["a" /* EmojiProvider */],
                __WEBPACK_IMPORTED_MODULE_65__providers_chat_service__["a" /* ChatService */],
                __WEBPACK_IMPORTED_MODULE_66__providers_WechatPlugin__["a" /* WechatPlugin */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, app, alertCtrl, splashScreen) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        // rootPage: any = MyChargePage;
        this.showedFlag = false;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.   
            statusBar.styleDefault();
            // statusBar.backgroundColorByHexString('#f44336');
            statusBar.backgroundColorByHexString('#488aff');
            splashScreen.hide();
            platform.registerBackButtonAction(function () {
                if (_this.nav.length() >= 2) {
                    _this.nav.pop();
                }
                if (_this.nav.length() == 1) {
                    if (_this.showedFlag == false) {
                        _this.confirmExitApp();
                    }
                }
            }, 0);
        });
    }
    MyApp.prototype.confirmExitApp = function () {
        var _this = this;
        this.showedFlag = true;
        var confirmAlert = this.alertCtrl.create({
            title: "通知",
            message: "您确定退出吗？",
            buttons: [
                {
                    text: '是',
                    handler: function () {
                        _this.platform.exitApp();
                    }
                },
                {
                    text: '否',
                    role: 'cancel',
                    handler: function () {
                        _this.showedFlag = false;
                    }
                }
            ]
        });
        confirmAlert.present().then(function () {
            // this.showedFlag = true;
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 463:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 230,
	"./af.js": 230,
	"./ar": 231,
	"./ar-dz": 232,
	"./ar-dz.js": 232,
	"./ar-kw": 233,
	"./ar-kw.js": 233,
	"./ar-ly": 234,
	"./ar-ly.js": 234,
	"./ar-ma": 235,
	"./ar-ma.js": 235,
	"./ar-sa": 236,
	"./ar-sa.js": 236,
	"./ar-tn": 237,
	"./ar-tn.js": 237,
	"./ar.js": 231,
	"./az": 238,
	"./az.js": 238,
	"./be": 239,
	"./be.js": 239,
	"./bg": 240,
	"./bg.js": 240,
	"./bm": 241,
	"./bm.js": 241,
	"./bn": 242,
	"./bn.js": 242,
	"./bo": 243,
	"./bo.js": 243,
	"./br": 244,
	"./br.js": 244,
	"./bs": 245,
	"./bs.js": 245,
	"./ca": 246,
	"./ca.js": 246,
	"./cs": 247,
	"./cs.js": 247,
	"./cv": 248,
	"./cv.js": 248,
	"./cy": 249,
	"./cy.js": 249,
	"./da": 250,
	"./da.js": 250,
	"./de": 251,
	"./de-at": 252,
	"./de-at.js": 252,
	"./de-ch": 253,
	"./de-ch.js": 253,
	"./de.js": 251,
	"./dv": 254,
	"./dv.js": 254,
	"./el": 255,
	"./el.js": 255,
	"./en-SG": 256,
	"./en-SG.js": 256,
	"./en-au": 257,
	"./en-au.js": 257,
	"./en-ca": 258,
	"./en-ca.js": 258,
	"./en-gb": 259,
	"./en-gb.js": 259,
	"./en-ie": 260,
	"./en-ie.js": 260,
	"./en-il": 261,
	"./en-il.js": 261,
	"./en-nz": 262,
	"./en-nz.js": 262,
	"./eo": 263,
	"./eo.js": 263,
	"./es": 264,
	"./es-do": 265,
	"./es-do.js": 265,
	"./es-us": 266,
	"./es-us.js": 266,
	"./es.js": 264,
	"./et": 267,
	"./et.js": 267,
	"./eu": 268,
	"./eu.js": 268,
	"./fa": 269,
	"./fa.js": 269,
	"./fi": 270,
	"./fi.js": 270,
	"./fo": 271,
	"./fo.js": 271,
	"./fr": 272,
	"./fr-ca": 273,
	"./fr-ca.js": 273,
	"./fr-ch": 274,
	"./fr-ch.js": 274,
	"./fr.js": 272,
	"./fy": 275,
	"./fy.js": 275,
	"./ga": 276,
	"./ga.js": 276,
	"./gd": 277,
	"./gd.js": 277,
	"./gl": 278,
	"./gl.js": 278,
	"./gom-latn": 279,
	"./gom-latn.js": 279,
	"./gu": 280,
	"./gu.js": 280,
	"./he": 281,
	"./he.js": 281,
	"./hi": 282,
	"./hi.js": 282,
	"./hr": 283,
	"./hr.js": 283,
	"./hu": 284,
	"./hu.js": 284,
	"./hy-am": 285,
	"./hy-am.js": 285,
	"./id": 286,
	"./id.js": 286,
	"./is": 287,
	"./is.js": 287,
	"./it": 288,
	"./it-ch": 289,
	"./it-ch.js": 289,
	"./it.js": 288,
	"./ja": 290,
	"./ja.js": 290,
	"./jv": 291,
	"./jv.js": 291,
	"./ka": 292,
	"./ka.js": 292,
	"./kk": 293,
	"./kk.js": 293,
	"./km": 294,
	"./km.js": 294,
	"./kn": 295,
	"./kn.js": 295,
	"./ko": 296,
	"./ko.js": 296,
	"./ku": 297,
	"./ku.js": 297,
	"./ky": 298,
	"./ky.js": 298,
	"./lb": 299,
	"./lb.js": 299,
	"./lo": 300,
	"./lo.js": 300,
	"./lt": 301,
	"./lt.js": 301,
	"./lv": 302,
	"./lv.js": 302,
	"./me": 303,
	"./me.js": 303,
	"./mi": 304,
	"./mi.js": 304,
	"./mk": 305,
	"./mk.js": 305,
	"./ml": 306,
	"./ml.js": 306,
	"./mn": 307,
	"./mn.js": 307,
	"./mr": 308,
	"./mr.js": 308,
	"./ms": 309,
	"./ms-my": 310,
	"./ms-my.js": 310,
	"./ms.js": 309,
	"./mt": 311,
	"./mt.js": 311,
	"./my": 312,
	"./my.js": 312,
	"./nb": 313,
	"./nb.js": 313,
	"./ne": 314,
	"./ne.js": 314,
	"./nl": 315,
	"./nl-be": 316,
	"./nl-be.js": 316,
	"./nl.js": 315,
	"./nn": 317,
	"./nn.js": 317,
	"./pa-in": 318,
	"./pa-in.js": 318,
	"./pl": 319,
	"./pl.js": 319,
	"./pt": 320,
	"./pt-br": 321,
	"./pt-br.js": 321,
	"./pt.js": 320,
	"./ro": 322,
	"./ro.js": 322,
	"./ru": 323,
	"./ru.js": 323,
	"./sd": 324,
	"./sd.js": 324,
	"./se": 325,
	"./se.js": 325,
	"./si": 326,
	"./si.js": 326,
	"./sk": 327,
	"./sk.js": 327,
	"./sl": 328,
	"./sl.js": 328,
	"./sq": 329,
	"./sq.js": 329,
	"./sr": 330,
	"./sr-cyrl": 331,
	"./sr-cyrl.js": 331,
	"./sr.js": 330,
	"./ss": 332,
	"./ss.js": 332,
	"./sv": 333,
	"./sv.js": 333,
	"./sw": 334,
	"./sw.js": 334,
	"./ta": 335,
	"./ta.js": 335,
	"./te": 336,
	"./te.js": 336,
	"./tet": 337,
	"./tet.js": 337,
	"./tg": 338,
	"./tg.js": 338,
	"./th": 339,
	"./th.js": 339,
	"./tl-ph": 340,
	"./tl-ph.js": 340,
	"./tlh": 341,
	"./tlh.js": 341,
	"./tr": 342,
	"./tr.js": 342,
	"./tzl": 343,
	"./tzl.js": 343,
	"./tzm": 344,
	"./tzm-latn": 345,
	"./tzm-latn.js": 345,
	"./tzm.js": 344,
	"./ug-cn": 346,
	"./ug-cn.js": 346,
	"./uk": 347,
	"./uk.js": 347,
	"./ur": 348,
	"./ur.js": 348,
	"./uz": 349,
	"./uz-latn": 350,
	"./uz-latn.js": 350,
	"./uz.js": 349,
	"./vi": 351,
	"./vi.js": 351,
	"./x-pseudo": 352,
	"./x-pseudo.js": 352,
	"./yo": 353,
	"./yo.js": 353,
	"./zh-cn": 354,
	"./zh-cn.js": 354,
	"./zh-hk": 355,
	"./zh-hk.js": 355,
	"./zh-tw": 356,
	"./zh-tw.js": 356
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 463;

/***/ }),

/***/ 464:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_normall_popover_normall_popover__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__help_support_help_support__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__my_contact_find_my_contact_find__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ads_detail_ads_detail__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__qr_code_scanner_qr_code_scanner__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










/**
 * Generated class for the AdsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AdsPage = /** @class */ (function () {
    function AdsPage(navCtrl, navParams, http, popoverCtrl, app) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.popoverCtrl = popoverCtrl;
        this.app = app;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.top = "";
        this.center = "";
        this.bottom = "";
        this.flag = "";
        this.slide = "";
        // color: string = "#ff9000";
        this.color = "#666fb2";
    }
    AdsPage.prototype.ionViewDidLoad = function () {
    };
    AdsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var postData = {
            uid: localStorage.getItem('uid')
        };
        this.http.post(this.serverUrl + "/get_n_ads.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (data.error == 1) {
                _this.flag = data.error;
                _this.top = data.top;
                _this.center = data.center;
                _this.bottom = data.bottom;
                _this.color = data.color;
                _this.slide = data.slide;
                if (_this.slide == '1') {
                    setTimeout(function () {
                        if (_this.center && _this.center.length > 0) {
                            _this.slides.freeMode = true;
                            _this.slides.autoplay = 2000;
                            _this.slides.speed = 500;
                            _this.slides.loop = true;
                            _this.slides.autoplayDisableOnInteraction = false;
                            _this.slides.startAutoplay();
                        }
                    }, 1000);
                }
            }
            else {
                _this.top = "";
                _this.center = "";
                _this.bottom = "";
                _this.flag = "";
                _this.slide = "";
                _this.color = "#ff9000";
            }
        });
    };
    AdsPage.prototype.ionViewWillLeave = function () {
        this.slides.stopAutoplay();
    };
    AdsPage.prototype.slideChanged = function () {
        // console.log("slide changed.");
        this.slides.startAutoplay();
    };
    AdsPage.prototype.presentPopover = function (myEvent) {
        var _this = this;
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_4__components_normall_popover_normall_popover__["a" /* NormallPopoverComponent */]);
        popover.present({
            ev: myEvent
        });
        popover.onDidDismiss(function (data) {
            switch (data) {
                case 'new_contact':
                    _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_6__my_contact_find_my_contact_find__["a" /* MyContactFindPage */]);
                    break;
                case 'scan':
                    _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_8__qr_code_scanner_qr_code_scanner__["a" /* QrCodeScannerPage */]);
                    break;
                case 'help':
                    _this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_5__help_support_help_support__["a" /* HelpSupportPage */]);
                    break;
                default:
                    break;
            }
        });
    };
    AdsPage.prototype.gotoDetailPage = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_7__ads_detail_ads_detail__["a" /* AdsDetailPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Slides */])
    ], AdsPage.prototype, "slides", void 0);
    AdsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ads',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\ads\ads.html"*/'<!--\n  Generated template for the AdsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>广告</ion-title>\n        <!-- <ion-buttons end (click)="presentPopover($event);">\n            <button ion-button icon-only>\n        <ion-icon name="add"></ion-icon>\n      </button>\n        </ion-buttons> -->\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding [ngStyle]="{\'background-color\': color}" (click)="gotoDetailPage();">\n    <div class="img_area" *ngIf="flag == \'\'">\n        <img src="assets/imgs/other/ads_top.png" alt="" />\n        <img src="assets/imgs/other/ads_new.png" alt="" />\n        <img src="assets/imgs/other/ads_bottom.png" alt="" />\n    </div>\n    <div class="img_area" *ngIf="flag == \'1\'">\n        <img src="http://unak.vip/uplus/qr_code/Template/ads/img/{{top}}" alt="" />\n        <img src="http://unak.vip/uplus/qr_code/Template/ads/img/{{center}}" alt="" *ngIf="slide != \'1\'" />\n        <ion-slides class="top-slider" (ionSlideDidChange)="slideChanged()" *ngIf="center.length > 1">\n            <ion-slide *ngFor="let s_bg of center" [ngStyle]="{\'background-image\': \'url(http://unak.vip/uplus/qr_code/Template/ads/img/\' + s_bg + \')\'}">\n            </ion-slide>\n        </ion-slides>\n        <img src="http://unak.vip/uplus/qr_code/Template/ads/img/{{bottom}}" alt="" />\n    </div>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\ads\ads.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* PopoverController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */]])
    ], AdsPage);
    return AdsPage;
}());

//# sourceMappingURL=ads.js.map

/***/ }),

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyWalletShopPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__provider_userinfo_model__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__my_wallet_outpu_my_wallet_outpu__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the MyWalletShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyWalletShopPage = /** @class */ (function () {
    function MyWalletShopPage(navCtrl, navParams, http, app, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.app = app;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.historyData = [];
        this.price_shop = "";
        this.out_price_shop = "";
        this.savedData = false;
    }
    MyWalletShopPage.prototype.ionViewDidLoad = function () {
    };
    MyWalletShopPage.prototype.getSavedData = function () {
        var tmp_price = localStorage.getItem("shopPriceData");
        if (tmp_price == undefined || tmp_price == "") {
            return false;
        }
        else {
            this.savedData = true;
            var shopPriceData = JSON.parse(tmp_price);
            this.historyData = shopPriceData.historyData;
            this.price_shop = shopPriceData.other;
            this.out_price_shop = shopPriceData.out_price;
            var tmp = localStorage.getItem("infoData");
            var userData = new __WEBPACK_IMPORTED_MODULE_2__provider_userinfo_model__["a" /* UserInfoModel */]();
            userData = JSON.parse(tmp);
            userData.price_shop = this.price_shop;
            localStorage.setItem("infoData", JSON.stringify(userData));
            return true;
        }
    };
    MyWalletShopPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.savedData = this.getSavedData();
        var uid = localStorage.getItem("uid");
        var token = localStorage.getItem("token");
        var postData = {
            action: 'shop_history',
            uid: uid,
            token: token
        };
        var loading = this.loadingCtrl.create();
        if (!this.savedData) {
            loading.present();
        }
        this.http.post(this.serverUrl + "/get_pay_history.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            if (!_this.savedData) {
                loading.dismiss();
            }
            switch (data.error) {
                case 1:
                    localStorage.setItem("shopPriceData", JSON.stringify(data));
                    _this.historyData = data.historyData;
                    _this.price_shop = data.other;
                    _this.out_price_shop = data.out_price;
                    var tmp = localStorage.getItem("infoData");
                    var userData = new __WEBPACK_IMPORTED_MODULE_2__provider_userinfo_model__["a" /* UserInfoModel */]();
                    userData = JSON.parse(tmp);
                    userData.price_shop = _this.price_shop;
                    localStorage.setItem("infoData", JSON.stringify(userData));
                    break;
                case 2:
                    _this.alertCtrl.create({
                        title: '警告',
                        message: 'Another User logged',
                        buttons: ["确定"]
                    }).present();
                    break;
                default:
                    break;
            }
        }, function (err) {
            if (!_this.savedData) {
                loading.dismiss();
            }
        });
    };
    MyWalletShopPage.prototype.gotoBack = function () {
        this.app.getRootNav().pop();
    };
    MyWalletShopPage.prototype.gotoOutPut = function () {
        this.app.getRootNav().push(__WEBPACK_IMPORTED_MODULE_3__my_wallet_outpu_my_wallet_outpu__["a" /* MyWalletOutpuPage */], { action: 'price_shop' });
    };
    MyWalletShopPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-wallet-shop',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my-wallet-shop\my-wallet-shop.html"*/'<!--\n  Generated template for the MyWalletShopPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-navbar>\n        <ion-buttons start class="back-button-custom">\n            <button ion-button icon-only (click)="gotoBack()">\n                <ion-icon name="arrow-back"></ion-icon>\n            </button>\n        </ion-buttons>\n        <ion-title>商家现金包</ion-title>\n        <ion-buttons end>\n            <button ion-button icon-only (click)="gotoOutPut()">\n                <ion-icon name="add"></ion-icon>\n            </button>\n        </ion-buttons>\n    </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-item class="value-area">\n        <p>商家现金 : ¥{{price_shop}}</p>\n        <p>已提现 : ¥{{out_price_shop}}</p>\n    </ion-item>\n    <ion-list>\n        <ion-item *ngFor="let item of historyData">\n            <ion-label class="value-item">{{item.state}} {{item.price}}</ion-label>\n            <ion-label class="value-item-time">{{item.date}}</ion-label>\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my-wallet-shop\my-wallet-shop.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
    ], MyWalletShopPage);
    return MyWalletShopPage;
}());

//# sourceMappingURL=my-wallet-shop.js.map

/***/ }),

/***/ 467:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ChatMessage */
/* unused harmony export UserInfo */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(388);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ChatMessage = /** @class */ (function () {
    function ChatMessage() {
    }
    return ChatMessage;
}());

var UserInfo = /** @class */ (function () {
    function UserInfo() {
    }
    return UserInfo;
}());

var ChatService = /** @class */ (function () {
    function ChatService(http, events) {
        this.http = http;
        this.events = events;
    }
    ChatService.prototype.mockNewMsg = function (msg) {
        var _this = this;
        var mockMsg = {
            messageId: Date.now().toString(),
            userId: '210000198410281948',
            userName: 'Hancock',
            userAvatar: './assets/to-user.jpg',
            toUserId: '140000198202211138',
            time: Date.now(),
            message: msg.message,
            status: 'success'
        };
        setTimeout(function () {
            _this.events.publish('chat:received', mockMsg, Date.now());
        }, Math.random() * 1800);
    };
    // getMsgList(): Observable<ChatMessage[]> {
    //   const msgListUrl = './assets/mock/msg-list.json';
    //   return this.http.get<any>(msgListUrl)
    //   .pipe(map(response => response.array));
    // }
    ChatService.prototype.getMsgList = function (id) {
        var data = localStorage.getItem(id);
        var msgList;
        if (data == "" || data == null || data == undefined) {
            msgList = [];
        }
        else {
            msgList = JSON.parse(data);
        }
        return msgList;
    };
    ChatService.prototype.sendMsg = function (msg) {
        var _this = this;
        return new Promise(function (resolve) { return setTimeout(function () { return resolve(msg); }, Math.random() * 1000); })
            .then(function () { return _this.mockNewMsg(msg); });
    };
    ChatService.prototype.getUserInfo = function () {
        var userInfo = {
            id: '140000198202211138',
            name: 'Luff',
            avatar: './assets/user.jpg'
        };
        return new Promise(function (resolve) { return resolve(userInfo); });
    };
    ChatService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Events */]])
    ], ChatService);
    return ChatService;
}());

//# sourceMappingURL=chat-service.js.map

/***/ }),

/***/ 473:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WechatPlugin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var WechatPlugin = /** @class */ (function () {
    function WechatPlugin() {
    }
    WechatPlugin.isInstalled = function () {
        return new Promise(function (resolve, reject) {
            Wechat.isInstalled(function (result) {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
    };
    WechatPlugin.sendPaymentRequest = function (params) {
        return new Promise(function (resolve, reject) {
            Wechat.sendPaymentRequest(params, function (result) {
                resolve(result);
            }, function (error) {
                reject(error);
            });
        });
    };
    WechatPlugin = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], WechatPlugin);
    return WechatPlugin;
}());

//# sourceMappingURL=WechatPlugin.js.map

/***/ }),

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmojiPickerComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__emoji_picker__ = __webpack_require__(475);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var EmojiPickerComponentModule = /** @class */ (function () {
    function EmojiPickerComponentModule() {
    }
    EmojiPickerComponentModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__emoji_picker__["a" /* EmojiPickerComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__emoji_picker__["a" /* EmojiPickerComponent */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__emoji_picker__["a" /* EmojiPickerComponent */]
            ]
        })
    ], EmojiPickerComponentModule);
    return EmojiPickerComponentModule;
}());

//# sourceMappingURL=emoji-picker.module.js.map

/***/ }),

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export EMOJI_PICKER_VALUE_ACCESSOR */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmojiPickerComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_emoji__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EMOJI_PICKER_VALUE_ACCESSOR = {
    provide: __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* NG_VALUE_ACCESSOR */],
    useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* forwardRef */])(function () { return EmojiPickerComponent; }),
    multi: true
};
var EmojiPickerComponent = /** @class */ (function () {
    function EmojiPickerComponent(emojiProvider) {
        this.emojiArr = [];
        this.emojiArr = emojiProvider.getEmojis();
    }
    EmojiPickerComponent.prototype.writeValue = function (obj) {
        this._content = obj;
    };
    EmojiPickerComponent.prototype.registerOnChange = function (fn) {
        this._onChanged = fn;
        this.setValue(this._content);
    };
    EmojiPickerComponent.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    EmojiPickerComponent.prototype.setValue = function (val) {
        this._content += val;
        if (this._content) {
            this._onChanged(this._content);
        }
    };
    EmojiPickerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'emoji-picker',
            providers: [EMOJI_PICKER_VALUE_ACCESSOR],template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\components\emoji-picker\emoji-picker.html"*/'<!-- Generated template for the EmojiPickerComponent component -->\n<div class="emoji-picker">\n  <div class="emoji-items">\n    <ion-slides pager>\n\n      <ion-slide *ngFor="let items of emojiArr">\n        <span class="emoji-item"\n              (click)="setValue(item)"\n              *ngFor="let item of items">\n          {{item}}\n        </span>\n      </ion-slide>\n\n    </ion-slides>\n  </div>\n</div>\n'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\components\emoji-picker\emoji-picker.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__providers_emoji__["a" /* EmojiProvider */]])
    ], EmojiPickerComponent);
    return EmojiPickerComponent;
}());

//# sourceMappingURL=emoji-picker.js.map

/***/ }),

/***/ 476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RelativeTime; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_date_fns_distance_in_words_to_now__ = __webpack_require__(477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_date_fns_distance_in_words_to_now___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_date_fns_distance_in_words_to_now__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var RelativeTime = /** @class */ (function () {
    function RelativeTime() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    RelativeTime.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __WEBPACK_IMPORTED_MODULE_1_date_fns_distance_in_words_to_now___default()(new Date(value), { addSuffix: true });
    };
    RelativeTime = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["S" /* Pipe */])({
            name: 'relativeTime',
        })
    ], RelativeTime);
    return RelativeTime;
}());

//# sourceMappingURL=relative-time.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SaveUserNameProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SaveUserNameProvider = /** @class */ (function () {
    function SaveUserNameProvider() {
    }
    SaveUserNameProvider.prototype.saveUID = function (arg1) {
        return;
    };
    SaveUserNameProvider.prototype.removeUID = function (arg1) {
        return;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], SaveUserNameProvider.prototype, "saveUID", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], SaveUserNameProvider.prototype, "removeUID", null);
    SaveUserNameProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["g" /* Plugin */])({
            pluginName: "SaveUserID",
            plugin: "cordova-plugin-saveuserid",
            pluginRef: "SaveUserID",
            repo: "https://github.com/webstar1987923/SaveUserID.git",
            platforms: ['Android', 'iOS']
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], SaveUserNameProvider);
    return SaveUserNameProvider;
}());

//# sourceMappingURL=save-user-name.js.map

/***/ }),

/***/ 58:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdsListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ads_item_detail_ads_item_detail__ = __webpack_require__(219);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AdsListPage = /** @class */ (function () {
    function AdsListPage(navCtrl, navParams, http, loadingCtrl, alertCtrl, actionSheet) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.actionSheet = actionSheet;
        this.serverUrl = "http://unak.vip/uplus/Api";
        this.ads_list = [];
        this.total = 0;
        this.provinces = [];
        this.cities = [];
        this.page_num = 0;
        this.s_province = "";
        this.s_city = "";
        this.diqu = "";
        this.searchFlag = false;
        this.isValid = true;
    }
    AdsListPage.prototype.ionViewDidLoad = function () {
        this.uid = localStorage.getItem('uid');
    };
    AdsListPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var postData = {
            action: 'get',
            uid: localStorage.getItem("uid"),
            province: localStorage.getItem("province"),
            city: localStorage.getItem("city"),
            loc_type: 'str'
        };
        this.diqu = localStorage.getItem("province") + "/" + localStorage.getItem("city");
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.serverUrl + "/adsmanage.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            _this.s_province = data.provinceID;
            _this.s_city = data.cityID;
            _this.ads_list = [];
            for (var index = 0; index < data.highlight.length; index++) {
                _this.ads_list.push(data.highlight[index]);
                _this.total = data.total;
            }
        }, function (err) {
            loading.dismiss();
        });
    };
    AdsListPage.prototype.itemDetail = function (index) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__ads_item_detail_ads_item_detail__["a" /* AdsItemDetailPage */], { items: this.ads_list, index: index });
    };
    //dialog
    AdsListPage.prototype.inputProvinceData = function () {
        this.getProvinceData();
    };
    AdsListPage.prototype.inputCityData = function () {
        this.getCityData();
    };
    AdsListPage.prototype.getProvinceData = function () {
        var _this = this;
        this.http.get("assets/json/dg_province.json")
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.provinces = [];
            for (var index = 0; index < data.length; index++) {
                _this.provinces.push(data[index]);
            }
            var provinceSheet = _this.actionSheet.create({
                title: "省份",
                cssClass: "cus_height",
                buttons: [{
                        text: "搜索",
                        handler: function () {
                            /*this.page_num = 0;
                            this.searchData();*/
                        }
                    }]
            });
            var _loop_1 = function (index) {
                button = {
                    text: _this.provinces[index].province,
                    handler: function () {
                        _this.s_province = _this.provinces[index].provinceID;
                        _this.inputCityData();
                    }
                };
                provinceSheet.addButton(button);
            };
            var button;
            for (var index = 0; index < _this.provinces.length; index++) {
                _loop_1(index);
            }
            provinceSheet.present();
        });
    };
    AdsListPage.prototype.getCityData = function () {
        var _this = this;
        this.http.get("assets/json/dg_city.json")
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.cities = [];
            for (var index = 0; index < data.length; index++) {
                if (data[index].father == _this.s_province) {
                    _this.cities.push(data[index]);
                }
            }
            var citySheet = _this.actionSheet.create({
                title: "城市",
                cssClass: "cus_height",
                buttons: [{
                        text: "搜索",
                        handler: function () {
                            _this.searchData();
                        }
                    }]
            });
            var _loop_2 = function (index) {
                button = {
                    text: _this.cities[index].city,
                    handler: function () {
                        _this.s_city = _this.cities[index].cityID;
                        _this.searchData();
                    }
                };
                citySheet.addButton(button);
            };
            var button;
            for (var index = 0; index < _this.cities.length; index++) {
                _loop_2(index);
            }
            citySheet.present();
        });
    };
    AdsListPage.prototype.searchData = function () {
        var _this = this;
        var postData = {
            action: 'get',
            uid: localStorage.getItem("uid"),
            province: this.s_province,
            city: this.s_city,
            loc_type: 'number'
        };
        var loading = this.loadingCtrl.create();
        loading.present();
        this.http.post(this.serverUrl + "/adsmanage.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            loading.dismiss();
            _this.diqu = data.diqu;
            _this.ads_list = [];
            for (var index = 0; index < data.highlight.length; index++) {
                _this.ads_list.push(data.highlight[index]);
                _this.total = data.total;
            }
        }, function (err) {
            loading.dismiss();
        });
    };
    AdsListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ads-list',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\ads-list\ads-list.html"*/'<!--\n  Generated template for the AdsDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n    <ion-navbar>\n        <ion-title>广告介绍</ion-title>\n    </ion-navbar>\n    <ion-toolbar>\n        <ion-searchbar (click)="inputProvinceData()" placeholder="省/市" [(ngModel)]="diqu" readonly></ion-searchbar>\n    </ion-toolbar>\n</ion-header>\n\n<ion-content padding>\n    <img src="assets/imgs/other/setting_BG.jpg" alt="" class="one-way-bg">\n    <ion-list>\n        <ion-grid>\n            <ion-row>\n                <ion-col col-6 size-sm *ngFor="let ads of ads_list; let i = index" (click)="itemDetail(i);">\n                    <div>\n                        <img src="assets/imgs/other/default.png" *ngIf="!ads.thumb">\n                        <img src="http://unak.vip/uplus{{ads.thumb}}" *ngIf="ads.thumb">\n                    </div>\n                </ion-col>\n            </ion-row>\n        </ion-grid>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\ads-list\ads-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */]])
    ], AdsListPage);
    return AdsListPage;
}());

//# sourceMappingURL=ads-list.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QrCodeScannerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shop_pay_screen_shop_pay_screen__ = __webpack_require__(227);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




// import { DomSanitizer} from '@angular/platform-browser';
/**
 * Generated class for the QrCodeScannerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// @Pipe({ name: 'safe' })
var QrCodeScannerPage = /** @class */ (function () {
    function QrCodeScannerPage(navCtrl, barcodeScanner, 
        // private sanitizer: DomSanitizer,
        alertCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.barcodeScanner = barcodeScanner;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.data = {};
        this.qr_data = "";
    }
    QrCodeScannerPage.prototype.ionViewDidLoad = function () {
    };
    QrCodeScannerPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log('qr code scanner working...');
        this.option = {
            prompt: ""
        };
        this.barcodeScanner.scan(this.option).then(function (barcodeData) {
            _this.data = barcodeData;
            _this.qr_data = barcodeData.text;
            // this.qr_data = "uplus_dGVzdA==";
            var tmp = _this.qr_data.split("_");
            var prefix = tmp[0];
            var c_data = tmp[1];
            if (prefix == 'uplus') {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__shop_pay_screen_shop_pay_screen__["a" /* ShopPayScreenPage */], { data: c_data });
            }
            else {
                _this.alertCtrl.create({
                    title: "警告",
                    message: "无法识别二维码",
                    buttons: [
                        {
                            text: '确定',
                            handler: function (data) {
                                _this.navCtrl.pop();
                            }
                        }
                    ]
                }).present();
            }
        }).catch(function (err) {
            console.log(err);
        });
    };
    QrCodeScannerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-qr-code-scanner',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\qr-code-scanner\qr-code-scanner.html"*/'<!--\n  Generated template for the QrCodeScannerPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>二维码</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <!-- <iframe *ngIf="pay_uplus_url != \'\'" width="100%" height="100%" [src]="pay_uplus_url" frameborder="0"></iframe> -->\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\qr-code-scanner\qr-code-scanner.html"*/,
        })
        // export class QrCodeScannerPage implements PipeTransform {
        ,
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_barcode_scanner__["a" /* BarcodeScanner */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
    ], QrCodeScannerPage);
    return QrCodeScannerPage;
}());

//# sourceMappingURL=qr-code-scanner.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyContactFindPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_shake__ = __webpack_require__(213);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyContactFindPage = /** @class */ (function () {
    // lat: any = "";
    // lng: any = "";
    function MyContactFindPage(navCtrl, navParams, shake, alertCtrl, http, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.shake = shake;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.shakeFlag = false;
        this.serverUrl = "http://unak.vip/uplus/Api/mobile";
        this.persons = "";
    }
    MyContactFindPage.prototype.ionViewDidLoad = function () {
    };
    MyContactFindPage.prototype.ionViewWillEnter = function () {
        // navigator.geolocation.getCurrentPosition(pos => {
        //   this.lat = pos.coords.latitude;
        //   this.lng = pos.coords.longitude;
        // });
        var _this = this;
        var watch = this.shake.startWatch(20).subscribe(function () {
            _this.shakeFlag = true;
            document.getElementById("shake-bottom-img").classList.add('animation-sliding');
            var loading = _this.loadingCtrl.create();
            loading.present();
            var postData = {
                action: 'shake',
                uid: localStorage.getItem('uid'),
            };
            _this.http.post(_this.serverUrl + "/shake.php", JSON.stringify(postData))
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                loading.dismiss();
                document.getElementById("shake-bottom-img").classList.remove('animation-sliding');
                if (data.error == 1) {
                    _this.persons = data.data;
                }
                else {
                    _this.alertCtrl.create({
                        title: "警告",
                        message: "网络失败!",
                        buttons: ["确定"]
                    }).present();
                }
            }, function (err) {
                loading.dismiss();
                document.getElementById("shake-bottom-img").classList.remove('animation-sliding');
            });
        });
        // watch.unsubscribe();
    };
    MyContactFindPage.prototype.ionViewWillLeave = function () {
        var postData = {
            action: 'delete',
            uid: localStorage.getItem('uid')
        };
        this.http.post(this.serverUrl + "/shake.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
        }, function (err) {
        });
    };
    MyContactFindPage.prototype.sendAddRequest = function (personID) {
        var _this = this;
        var postData = {
            action: 'request',
            from: localStorage.getItem('uid'),
            to: personID
        };
        this.http.post(this.serverUrl + "/shake.php", JSON.stringify(postData))
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.alertCtrl.create({
                title: "通知",
                message: "发送成功",
                buttons: ["确定"]
            }).present();
        }, function (err) {
            _this.alertCtrl.create({
                title: "警告",
                message: "网络失败!",
                buttons: ["确定"]
            }).present();
        });
    };
    MyContactFindPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-my-contact-find',template:/*ion-inline-start:"F:\OnSite\chol\uplus-app\src\pages\my-contact-find\my-contact-find.html"*/'<!--\n  Generated template for the MyContactFindPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-title>摇一摇</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <img src="assets/imgs/other/shake_bg.png" alt="" class="shake-bg">\n    <div class="shake-area">\n        <img src="assets/imgs/other/shake_top.png" alt="" class="shake-img">\n        <!-- <img src="assets/imgs/other/shake_bottom.png" alt="" class="shake-img shake-bottom" [ngClass]="{\'animation-sliding\': shakeFlag}"> -->\n        <img src="assets/imgs/other/shake_bottom.png" alt="" id="shake-bottom-img" class="shake-img shake-bottom">\n    </div>\n    <ion-list class="contact-list">\n        <ion-item *ngFor="let person of persons">\n            <ion-thumbnail item-start>\n                <img src="assets/imgs/other/default.png" *ngIf="!person.photo">\n                <img src="{{person.photo}}" *ngIf="person.photo">\n            </ion-thumbnail>\n            <h2>{{person.realname}}</h2>\n            <p>会员帐号： {{person.username}}</p>\n            <button ion-button clear item-end (click)="sendAddRequest(person.username);">添加</button>\n        </ion-item>\n    </ion-list>\n</ion-content>'/*ion-inline-end:"F:\OnSite\chol\uplus-app\src\pages\my-contact-find\my-contact-find.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_shake__["a" /* Shake */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* LoadingController */]])
    ], MyContactFindPage);
    return MyContactFindPage;
}());

//# sourceMappingURL=my-contact-find.js.map

/***/ })

},[389]);
//# sourceMappingURL=main.js.map