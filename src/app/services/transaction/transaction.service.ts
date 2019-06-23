import { MessageService } from './../message/message.service';
import { EnvService } from 'src/app/services/env/env.service';
import { Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { TransactionModel } from 'src/app/model/transaction';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { $$ } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  rMessage;
  valider: Boolean = false;
  transaction: TransactionModel;
  constructor(
    private iab: InAppBrowser,
    private env: EnvService,
    private message: MessageService,
    public loadingController: LoadingController,
  ) {
    this.transaction = {
      id: "",
      message: "",
      status: ""
    };
   }

  async createTransaction(idUser: any, operation: any, nombre: number){
    
    const loading = await this.loadingController.create({
      message: 'Patientez svp...',
      duration: 5000
    });
    await loading.present();
    
    const browser = this.iab.create(
      this.env.TRANSACTION_URL + idUser + "/" + operation + "/" + nombre);
    
    browser.on('loadstart').subscribe((event) => {

      console.log(event);

      if(event.url && event.url.includes(this.env.COMPAR_URL_TRANS_SUCCESS)){
        

        let url = event.url.split('?')[0];
      
        this.transaction.id = event.url.split('?')[1].split('&')[0].replace('id=','');
        this.transaction.status = event.url.split('?')[1].split('&')[1].replace('status=','').replace('_',' ');

        if(this.transaction.id === "-1"){
          browser.close();
          this.message.afficheToast(this.transaction.status, 'danger');
          return;
        }else{
          browser.close();
          this.message.afficheToast(this.transaction.status, 'success');
          this.valider = true;
          return;
        }
      }
    }, err => {
      console.error(err);
      this.rMessage = err.message;
      browser.close();
      this.message.afficheToast(err.message, 'danger');
      return;
    });


   

  }

  async openPDF(url: string){
    const loading = await this.loadingController.create({
      message: 'Patientez svp...',
      duration: 5000
    });
    await loading.present();
    
    const browser = this.iab.create(url);

    browser.on('exit').subscribe((event) => {
      this.message.afficheToast("Opération Annulée", 'danger');
      return;
    });
  }
}
