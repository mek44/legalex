import { MessageService } from './../../../services/message/message.service';
import { RegisterModel } from './../../../model/register';
import { Storage } from '@ionic/storage';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerform : FormGroup;
  registerModel: RegisterModel;
  submitted: boolean = false;
  data: any;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private message: MessageService,
    private storage: Storage,
    private loadingController: LoadingController
  ) 
  { 
    this.registerModel = {
      nom: '',
      prenoms: '',
      contact: '',
      adresse: '',
      email: '',
      profession: '',
      dateNaissance: '',
      lieuNaissance: '',
      username: '',
      password: ''
    }
    this.registerform = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      nom: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.maxLength(70), 
        Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), 
        Validators.required])],
      prenoms: ['', Validators.required],
      contact: ['', Validators.required],
    });
  }

  ngOnInit() {
  }
  get f() { return this.registerform.controls; }
  async register() 
  {
    this.submitted = true;  
    const loading = await this.loadingController.create({
      message: 'Patientez svp ...',
      backdropDismiss: false,
      spinner: 'bubbles',
      duration: 5000
    });

    loading.present();

    if (this.registerform.invalid) {
      loading.dismiss();
      return;
    }
    
    this.authService.register(this.registerModel).subscribe(
      data => {
        if(data['status'])
        {
          loading.dismiss();
          this.alertService.presentToast(data['message'], 'success');
          this.navCtrl.navigateRoot('/login');
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

  connexion(){
    this.navCtrl.navigateRoot('/login');
  }

}
