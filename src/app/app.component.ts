import { Component, QueryList, ViewChildren } from '@angular/core';

import { Platform, ModalController, AlertController, NavController, LoadingController, IonRouterOutlet } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  
  pages = [
    {
      title: 'Légalisation des documents',
      url: '/menu/legalisation-liste',
      icon: 'document'
    },
    {
      title: 'Déposer une plainte',
      url: '/menu/plainte',
      icon: 'clipboard'
    },
    {
      title: 'Retrait des documents administratifs',
      url: '/menu/retraitdoc',
      icon: 'document'
    },
    {
      title: 'Liste des documents administratifs et les pièces constitutives',
      url: '/menu/listedoc',
      icon: 'document'
    },
    {
      title: 'Déclaration de perte',
      url: '/menu/perte',
      icon: 'locate'
    },
    {
      title: 'Rédaction et relecture de contrat',
      url: '/menu/contrat',
      icon: 'clipboard'
    },
    {
      title: 'Liste des hommes de lois',
      url: '/menu/professionnel-loi',
      icon: 'man'
    },
    
    // {
    //   title: 'Liste des hommes de lois',
    //   children: [
    //     {
    //       title: 'Avocats',
    //       url: '/menu/professionnel-loi/avocats',
    //       icon: 'man'
    //     },
    //     {
    //       title: 'Hussier',
    //       url: '/menu/professionnel-loi/hussiers',
    //       icon: 'man'
    //     },
    //     {
    //       title: 'Notaires',
    //       url: '/menu/professionnel-loi/notaires',
    //       icon: 'man'
    //     },
    //   ]
    // }
    // {
    //   title: 'Cool Frameworks',
    //   children: [
    //     {
    //       title: 'Ionic',
    //       url: '/menu/ionic',
    //       icon: ''
    //     },
    //     {
    //       title: 'Flutter',
    //       url: '/menu/flutter',
    //       icon: 'logo-google'
    //     },
    //   ]
    // }
  ];

  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  loading: any;
  alert: any;

    @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor(
    private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        public modalCtrl: ModalController,
        private alertController: AlertController,
        private router: Router,
        private navCtrl: NavController,
        public loadingController: LoadingController
  ) {
    this.initializeApp();
    this.backButtonEvent();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  backButtonEvent() {
    document.addEventListener("backbutton", () => { 
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
            outlet.pop();
            this.navCtrl.pop();
        } else if (
          this.router.url === '/menu/legalisation-liste' || 
          this.router.url === '/menu/plainte' || 
          this.router.url === '/menu/contrat' || 
          this.router.url === '/menu/professionnel-loi' || 
          this.router.url === '/menu/perte' || 
          this.router.url === '/menu/listedoc' || 
          this.router.url === '/menu/retraitdoc' || 
          this.router.url === '/home' || 
                    this.router.url === '/login') {
          if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {

            navigator['app'].exitApp(); //Exit from app
            
          } else {
            this.presentAlertConfirm();
            this.lastTimeBackPress = new Date().getTime();
          }
          // navigator['app'].exitApp(); // work for ionic 4
        }else if (this.router.url === '/collecte' || this.router.url === '/livraison-liste' || this.router.url === '/compte') {
          this.router.navigateByUrl('/home');
        }
      });
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      // header: 'Confirm!',
      message: 'Êtes-vous sûre de vouloir quitter?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Fermer',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });

    await alert.present();
  }
}
