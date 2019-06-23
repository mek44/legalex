import { MessageService } from './../../../services/message/message.service';
import { LoginMOdel } from './../../../model/login';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import {  FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginform : FormGroup;
  submitted = false;

  loginModel: LoginMOdel;
  data: any;

  constructor(
    private navCtrl:NavController,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private message: MessageService,
    private storage: Storage,
    private loadingController: LoadingController
  ) 
  { 

    this.loginModel = {
      username: '',
      password: ''
    }
    this.loginform = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.storage.get('lega_token').then(
      (val) => {
        if(val != ""){
          this.navCtrl.navigateRoot('/home');
        }
      }
    );
  }

  get f() { return this.loginform.controls; }

  async login() 
  {
    this.submitted = true;  
    const loading = await this.loadingController.create({
      message: 'Patientez svp ...',
      backdropDismiss: false,
      spinner: 'bubbles',
      duration: 5000
    });

    loading.present();

    if (this.loginform.invalid) {
      loading.dismiss();
      return;
    }
    this.authService.login(this.loginModel).subscribe(
      data => {
        if(data['status'])
        {
          loading.dismiss();
          this.alertService.presentToast(data['message'], 'success');
          this.storage.set('lega_iduser', data['data'].idUser);
          this.storage.set('lega_nom', data['data'].nom);
          this.storage.set('lega_prenoms', data['data'].prenoms );
          this.storage.set('lega_contact', data['data'].contact);
          this.storage.set('lega_adresse', data['data'].adresse);
          this.storage.set('lega_email', data['data'].email);
          this.storage.set('lega_profession', data['data'].profession);
          this.storage.set('lega_dateNaissance', data['data'].dateNaissance);
          this.storage.set('lega_lieuNaissance', data['data'].lieuNaissance);
          this.storage.set('lega_username', data['data'].username);
          this.storage.set('lega_token', data['data'].token);
          this.navCtrl.navigateRoot('/home');
        }else
        {
          loading.dismiss();
          this.alertService.presentToast(data['message'], 'danger');
        }
      },
      error => {
        loading.dismiss();
        this.message.proConnexion();
      }
    );
  }

  inscription(){
    this.router.navigateByUrl('/register');
  }
}
