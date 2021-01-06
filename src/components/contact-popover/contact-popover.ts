import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the ContactPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'contact-popover',
  templateUrl: 'contact-popover.html'
})
export class ContactPopoverComponent {

  text: string;

  constructor(public viewCtrl: ViewController) {
    console.log('Hello ContactPopoverComponent Component');
    this.text = 'Hello World';
  }

  itemClick(item) {
    this.viewCtrl.dismiss(item);
  }

}
