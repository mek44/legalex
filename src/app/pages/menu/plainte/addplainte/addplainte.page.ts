import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addplainte',
  templateUrl: './addplainte.page.html',
  styleUrls: ['./addplainte.page.scss'],
})
export class AddplaintePage implements OnInit {

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  goback(){
    this.navCtrl.navigateRoot('/menu/plainte');
  }

}
