import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class EnvService {
  URL_BASE = "http://legalex.afriqiyagroup.com/";

  API_URL = this.URL_BASE + 'api/';

  TRANSACTION_URL =  this.URL_BASE + 'payement/new/';

  COMPAR_URL = this.URL_BASE + 'payement/callback_url/';

  COMPAR_URL_TRANS_SUCCESS = this.URL_BASE + 'payement/callback_url2/';
  
  constructor() { }
}