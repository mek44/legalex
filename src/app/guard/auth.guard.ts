import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private storage: Storage
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return true;
      this.storage.get('lega_token').then(
        val => {
          if(val){
            return true;
          }
        },
        err =>{
          console.log(err);
        }
      )
      
      // not logged in so redirect to login page with the return url
      this.navCtrl.navigateRoot('/login');
      return false;
  }
}
