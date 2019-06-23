import { TransactionService } from './../../../../services/transaction/transaction.service';
import { PlainteService } from './../../../../services/plainte/plainte.service';
import { Storage } from '@ionic/storage';
import { EnvService } from 'src/app/services/env/env.service';
import { MessageService } from './../../../../services/message/message.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { DatePipe } from '@angular/common';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Component({
  selector: 'app-plainte',
  templateUrl: './plainte.page.html',
  styleUrls: ['./plainte.page.scss'],
})
export class PlaintePage implements OnInit {

  err: any;

  plaintePreRediger: any = {
    idUser: "",
    fichier: ""
  };

  plaintesPreRediger: any;

  constructor(
    private router: Router,
    private nav: NavController,
    public actionSheetController: ActionSheetController,
    private filechooser: FileChooser,
    private message: MessageService,
    private transfer: FileTransfer,
    private env: EnvService,
    private datePipe: DatePipe,
    private storage: Storage,
    private plainte: PlainteService,
    private transaction: TransactionService,
    private document: DocumentViewer,
    private fileOpener: FileOpener
  ) {
    this.plaintePreRediger = {
      idUser: "",
      fichier: ""
    };
   }

  ngOnInit() {
    this.storage.get("lega_iduser")
      .then((val)=>{
          this.plaintePreRediger.idUser = val;

          this.plainte.getPlaintePreRediger(val)
                .subscribe(
                  (data) => {
                    if(data['status']){
                      this.plaintesPreRediger = data['data'];
                    }
                  },
                  (err) => {
                    this.message.proConnexion();
                  }
                );
      });
  }

  async addPlainte(){
      const actionSheet = await this.actionSheetController.create({
        header: 'Plainte',
        buttons: [{
          text: 'Document déjà rédigé ? ',
          icon: 'paper',
          handler: () => {
            this.filechooser.open() 
              .then(uri =>{
                // Vérification de l'extension du fichier
                this.err = uri.split('.');
                if(this.err[this.err.length-1] != 'pdf'){
                  this.message.afficheToast("Le type de ficier est invalide", 'danger');
                  return;
                }
                /**
                 * Création de la transaction
                 */
              
                this.transaction.createTransaction(this.plaintePreRediger.idUser,"plainte",1);
                this.err = this.transaction.rMessage;

                if(!this.transaction.valider)
                          return;
              
                /**
                 * Upload file
                 */
                const fileTransfer: FileTransferObject = this.transfer.create();
                let date = new Date();
                let options: FileUploadOptions = {
                  fileKey: 'file',
                  fileName: this.datePipe.transform(date, 'yyyy-MM-dd_HH:mm:ss') + '.pdf',
                  headers: {}
                }
              
                fileTransfer.upload(uri, this.env.API_URL+'legalisation/uploadFile/files', options)
                  .then((data) => {
                    this.err = JSON.parse(data['response']);
                    let dataret = JSON.parse(data['response']);
                    this.plaintePreRediger.fichier = dataret.data.upload_data.file_name;

                    this.plainte.addPlaintePreRediger(this.plaintePreRediger).subscribe(
                      (data) =>{
                        if(data['status']){
                          this.message.afficheToast(data['message'], 'success');
                          this.nav.navigateRoot('menu/plainte');
                        }else{
                          this.message.afficheToast(data['message'], 'danger');
                        }
                      },
                      (error) => {
                        this.message.proConnexion();
                      }
                    )
                  }, (err) => {
                    this.err = err;
                    this.message.afficheToast(err.message, 'danger');
                  });

              })
              .catch(e => console.log(e));
          }
        },{
          text: 'Document pas encore rédigé ?',
          icon: 'document',
          handler: () => {
            this.router.navigateByUrl('/menu/plainte/addplainte');
          }
        }, {
          text: 'Annuler',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }]
      });
    
      await actionSheet.present();
    
  }

  view(fichier: any){
    this.fileOpener.open(fichier, 'application/pdf')
      .then((data) => {this.message.afficheToast(JSON.stringify(data)+fichier, 'success')})
      .catch(e => {
        this.message.afficheToast(fichier, 'danger');
        console.log(e);
      });

    console.log(fichier);

  }

}
