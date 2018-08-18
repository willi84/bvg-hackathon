import { RequestsPage } from './../requests/requests';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  public navigateToOtherPage(): void {
    this.navCtrl.push(RequestsPage);
 }
  

}
