import { MessageService } from './../../../../services/message/message.service';
import { LegalisationService } from './../../../../services/legalisation/legalisation.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-legalisation-liste',
  templateUrl: './legalisation-liste.page.html',
  styleUrls: ['./legalisation-liste.page.scss'],
})
export class LegalisationListePage implements OnInit {

  allDemande: any;
  constructor(
    private router: Router,
    private storage: Storage,
    private legalistationSrv: LegalisationService,
    private message: MessageService
  ) { }

  ngOnInit() {
    this.getAlldemande();
  }

  ionViewWillEnter(){
    this.getAlldemande();
  }

  getAlldemande(){
    this.storage.get("lega_iduser").then(
      (val) =>{
        this.legalistationSrv.getAllDemande(val)
          .subscribe(
            (data) => {
              if(data['status']){
                this.allDemande = data['data'];
              }
            },
            (err) => {
              this.message.proConnexion();
            }
          );
      }
    )
    
  }

  addLegalisation(){
    this.router.navigateByUrl('/menu/legalisation');
  }

}
