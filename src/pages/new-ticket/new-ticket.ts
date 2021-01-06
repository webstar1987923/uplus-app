import { Component, Pipe, PipeTransform } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({ name: 'safe' })

@Component({
  selector: 'page-new-ticket',
  templateUrl: 'new-ticket.html',
})
export class NewTicketPage implements PipeTransform {

  uid: any;
  add_new_ticket_url: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sanitizer: DomSanitizer) {
  }

  ionViewDidLoad() {
    this.uid = localStorage.getItem('uid');
    this.add_new_ticket_url = this.transform("http://unak.vip/uplus/qr_code/Template/pay_history/service_center.php?uid=" + localStorage.getItem('uid'));
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
