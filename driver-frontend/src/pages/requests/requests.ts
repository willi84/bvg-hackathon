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
  templateUrl: 'requests.html'
})
export class RequestsPage {
  pickups: any = [];
  stations: any = [];
  interval: any;
  users = [];
  hasUnicorn: boolean = false;
  loadUsers: boolean = true;
  activeUserUuid = [];
  registeredUsers = [];
  public getData: boolean = false; 
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
        var starttime = 1534669866 ;
        for(let i=0; i < this.stations.length; i++){
          this.stations[i]['users'] = [];
          starttime = (i !== 0 ) ? this.stations[i-1]['time'] + 60*60*5 * Math.floor(Math.random() * 5 +1) : starttime;
          this.stations[i]['time'] = starttime;
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

    this.interval = setInterval(() => { 
      for(let i=0; i < this.users.length; i++){
        if(this.users[i]['distance'] >=  0){
          this.users[i]['distance'] -= (2 *this.users[i]['speed']) ;

        } else {

        }
          // this.rereshData(); 
      }
      }, 1000);
  }
  ngAfterViewInit(){
    this.refreshData();
    this.interval = setInterval(() => { 
      if(this.getData){
        this.refreshData(); 
      }
    }, 5000);

  }
  public startApp(): void{
    this.getData = !this.getData;
    
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
        this.activeUserUuid.push(newUuid);
        console.log(newUsers[i]);
        let randomStation = Math.floor(Math.random() * this.stations.length);
        newUsers[i]['distance'] = Math.floor(Math.random() * 150);
        newUsers[i]['speed'] = Math.floor(Math.random() * 2 + 1);
        this.stations[randomStation]['users'].push(newUsers[i]);
        this.users.push(newUsers[i]);
        // this.interval = setInterval(() => { 
           
        //     newUsers[i]['distance'] -= (2 *newUsers[i]['speed']) ;
        //     // this.refreshData(); 

        // }, 1000);
      } else {
      }
    }
    // this.users = this.users.concat(data['results']);
  }, err => {
  });
if(!this.hasUnicorn){

  this.http.get(this.apiUrl+"?tourId=3").subscribe(data => {
    // this.stations = data['nodes'];
    let pickups = data['pickups'];
    if(pickups.length > 0){
      this.hasUnicorn = true;
      console.log(pickups[0])
      // user.id image name
      // this.users.push(pickups[0])
      //picture.thumbnail
      // let randomStation = Math.floor(Math.random() * this.stations.length);
      // this.activeUserUuid.push(newUuid);
      // login.uuid
        // newUsers[i]['distance'] = Math.floor(Math.random() * 150);
        // newUsers[i]['speed'] = Math.floor(Math.random() * 2);
        // this.stations[randomStation]['users'].push(newUsers[i]);
        // this.users.push(newUsers[i]);
        this.stations[2]['users'].push({
          'distance': 51,
          'speed': 1,
          'name': {
            'first': '',
            'last': ''
          },
          'picture': {
            'thumbnail': '/assets/imgs/unicorn.gif'
          }, 
          'login': {
            'uuid': '2343'
          }
        });
        
    }
  }, err => {
  });
}
}

}
