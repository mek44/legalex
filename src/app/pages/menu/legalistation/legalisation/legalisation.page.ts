import { TransactionService } from './../../../../services/transaction/transaction.service';
import { Storage } from '@ionic/storage';
import { StockageService } from './../../../../services/stockage/stockage.service';
import { LegalisationService } from './../../../../services/legalisation/legalisation.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message/message.service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer/ngx';
import {  FormBuilder, FormGroup, Validators} from '@angular/forms';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LegalisationModel } from 'src/app/model/legalisation';
import { LoadingController, NavController } from '@ionic/angular';
import { EnvService } from 'src/app/services/env/env.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-legalisation',
  templateUrl: './legalisation.page.html',
  styleUrls: ['./legalisation.page.scss'],
})
export class LegalisationPage implements OnInit {
  mediaFiles: any;
  type_doc: any;
  filePatho: any; 
  legalisation: LegalisationModel;
  err: any;
  pathImgSendUpload: any;

  legaform : FormGroup;
  submitted = false;

  constructor(
    private legalisationSrv: LegalisationService,
    private message: MessageService,
    private loadingController:LoadingController,
    private  formBuilder: FormBuilder,
    private webview: WebView,
    private camera: Camera,
    private transaction: TransactionService,
    private nav: NavController,
    private env: EnvService,
    private transfer: FileTransfer,
    private storage: Storage,
    private datePipe: DatePipe
  ) { 
    this.legalisation = {
      idUser: "",
      idTypeDoc: "",
      nombre: "1",
      nomImage: "",
    }

    this.legaform = this.formBuilder.group({
      idTypeDoc: ['', Validators.required],
      nombre: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.storage.get("lega_iduser")
          .then((val)=>{
              this.legalisation.idUser = val;
          });

    this.legalisationSrv.gettypedoc().subscribe(
      data => {
        this.type_doc = data['data']
      },
      error => {
        this.message.afficheToast(error.message, 'danger');
      }
    );
  }

  captureImage(){

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.FILE_URI
    }
    
    this.camera.getPicture(options).then((imageData) => {
      this.filePatho = this.pathForImage(imageData); 
      this.pathImgSendUpload = imageData;
    }, (err) => {
     console.log(err);
    });
  }

  get f() { return this.legaform.controls; }

  /**
   * Function de demande de légalisation
   * @param filepath 
   */

  async sendDemandeLega(filepath){
    this.submitted = true;  

    const loading = await this.loadingController.create({
      message: 'Patientez svp ...',
      backdropDismiss: false,
      spinner: 'bubbles',
      duration: 5000
    });

    loading.present();

    if (this.legaform.invalid) 
    {
      loading.dismiss();
      return;
    }

    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: "file",
      fileName: filepath.substr(0, filepath.lastIndexOf('/')),
      mimeType: "image/jpeg",
      chunkedMode: false,
      headers: {}
    }
    /**
     * Création de la transaction
     */
  
    this.transaction.createTransaction(this.legalisation.idUser,"legalisation",this.legalisation.nombre );
    if(!this.transaction.valider)
              return;

    fileTransfer.upload(filepath, this.env.API_URL+'legalisation/uploadFile/images', options)
      .then((data) => {
        
        this.err = JSON.parse(data['response']);
        let dataret = JSON.parse(data['response']);
        if(dataret.status){

          this.legalisation.nomImage = dataret.data.upload_data.file_name;
          this.legalisationSrv.addDemandeLega(this.legalisation).subscribe(
            (data) => {
              loading.dismiss();
              if(data['status']){
                this.message.afficheToast(data['message'], 'success');
                this.nav.navigateRoot('menu/legalisation-liste');
              }else
                this.message.afficheToast(data['message'], 'danger');
            },
            (err) => {
              loading.dismiss();
              this.err = err;
              this.message.proConnexion();
            }
          );
        }else{
          this.message.afficheToast(dataret.message, 'danger');
        }
        
      }, (err) => {
        console.log(err);
        loading.dismiss();
        this.err = err;
        this.message.afficheToast(err.message, 'danger');
      });
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

}
