import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StockageService {

  value: string;
  constructor(
    private storage: Storage
  ) { }


  getidUser(){
    this.storage.get("lega_iduser")
                .then(val=>{
                  return this.value = val;
                })
  }

  getToken(){
    this.storage.get("lega_token")
                .then(val=>{
                  return val;
                })
  }
}
