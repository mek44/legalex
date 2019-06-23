import { Injectable } from '@angular/core';
import {LoadingController, ToastController, AlertController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  toast: any;
  loading: any;
  ouinon: any;
  ouinonResultat: boolean;

  constructor(private toastController: ToastController,
              private loadingController: LoadingController,
              private alertController: AlertController) {
    this.ouinonResultat = false;
  }


  async afficheLoadingBloquant(pMsg: string) {
    this.loading = await this.loadingController.create({
      message: pMsg,
      backdropDismiss: false,
      spinner: 'bubbles',
      duration: 5000
    });

    return this.loading.present();
  }

  async masquerLoading() {
    this.loading.dismiss();
  }

  async afficheToast(pMsg: string, typeToast: string) {
    this.toast = await this.toastController.create({
      message: pMsg,
      showCloseButton: false,
      position: 'top',
      color: typeToast,
      duration: 3000
    });

    return this.toast.present();

  }


  async afficheOuiNon(pMsg: string) {
    this.ouinon = await this.alertController.create({
      header: 'KEHILA',
      message: pMsg,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            this.ouinonResultat = false;
          }
        }, {
          text: 'Oui',
          cssClass: 'bouton-jaune',
          handler: () => {
            this.ouinonResultat = true;
          }
        }
      ]
    });

    return this.ouinon.present();

  }


  async proConnexion(){
    this.toast = await this.toastController.create({
      message: "Problème de connexion",
      showCloseButton: false,
      position: 'top',
      color: 'danger',
      duration: 3000
    });

    return this.toast.present();
  }
}
