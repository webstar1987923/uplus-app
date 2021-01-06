import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the NormallPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'normall-popover',
  templateUrl: 'normall-popover.html'
})
export class NormallPopoverComponent {

  text: string;

  constructor(public viewCtrl: ViewController) {
    this.text = 'Hello World';
  }

  itemClick(item) {
    this.viewCtrl.dismiss(item);
  }

}
