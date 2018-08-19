import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-requests',
  templateUrl: 'requests.html',
})
export class RequestsPage {
  pickups: any = [];
  stations: any = [];
  interval: any;
  users = [];
  loadUsers: boolean = false;
  activeUserUuid = [];
  registeredUsers = [];

  apiUrl = '/api'; 
  apiUsers = '/users';
  stationsUrl = '/assets/245_sample.json';
  items = [
    {
      title: 'Courgette daikon',
      content: 'Parsley amaranth tigernut silver beet maize fennel spinach. Ricebean black-eyed pea maize scallion green bean spinach cabbage jícama bell pepper carrot onion corn plantain garbanzo. Sierra leone bologi komatsuna celery peanut swiss chard silver beet squash dandelion maize chicory burdock tatsoi dulse radish wakame beetroot.',
      icon: 'calendar',
      time: {subtitle: '4/16/2013', title: '21:30'}
    },
    {
      title: 'Courgette daikon',
      content: 'Parsley amaranth tigernut silver beet maize fennel spinach. Ricebean black-eyed pea maize scallion green bean spinach cabbage jícama bell pepper carrot onion corn plantain garbanzo. Sierra leone bologi komatsuna celery peanut swiss chard silver beet squash dandelion maize chicory burdock tatsoi dulse radish wakame beetroot.',
      icon: 'calendar',
      time: {subtitle: 'January', title: '29'}
    },
    {
      title: 'Courgette daikon',
      content: 'Parsley amaranth tigernut silver beet maize fennel spinach. Ricebean black-eyed pea maize scallion green bean spinach cabbage jícama bell pepper carrot onion corn plantain garbanzo. Sierra leone bologi komatsuna celery peanut swiss chard silver beet squash dandelion maize chicory burdock tatsoi dulse radish wakame beetroot.',
      icon: 'calendar',
      time: {title: 'Short Text'}
    }
  ]
  constructor(public http: HttpClient, public navCtrl: NavController, public navParams: NavParams) {
    //  this.getUsers();
     
  }
 

  ionViewDidLoad() {
  }
  getStations(){
    // return new Promise(resolve => {
      this.http.get(this.stationsUrl).subscribe(data => {
        this.stations = data['nodes'];
        this.loadUsers = true;
        for(let i=0; i < this.stations.length; i++){
          this.stations[i]['users'] = [];
        }
      }, err => {
      });
    // });
  }
  getUsers() {
    this.http.get('https://randomuser.me/api/?results=50').subscribe(data => {
      // this.stations = data['nodes'];
    }, err => {
    });
    
    
  }
  ngOnInit() {
    this.getStations();
  }
  ngAfterViewInit(){
    this.refreshData();
    this.interval = setInterval(() => { 
        this.refreshData(); 
    }, 5000);

  }

refreshData(){
  if(!this.loadUsers){
    return;
  }
  let random = Math.floor(Math.random() * 5);
  this.http.get('https://randomuser.me/api/?results='+ random).subscribe(data => {
    // this.stations = data['nodes'];
    const newUsers = data['results'];
    for(let i=0; i < newUsers.length; i++){
      let pictureId = newUsers[i].picture.thumbnail.match(/\/(\d*)\.jpg/);
      let newUuid = pictureId[1];
      if(this.activeUserUuid.indexOf(newUuid) === -1){
        this.activeUserUuid.push(newUuid)
        let randomStation = Math.floor(Math.random() * this.stations.length);
        newUsers[i]['distance'] = Math.floor(Math.random() * 150);
        this.stations[randomStation]['users'].push(newUsers[i]);
        this.users.push(newUsers[i]);
      } else {
      }
    }
    // this.users = this.users.concat(data['results']);
  }, err => {
  });
}

}
