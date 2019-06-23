import { EnvService } from './../env/env.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlainteService {

  constructor(
    private http: HttpClient,
    private env: EnvService,
  ) { }

  addPlaintePreRediger(data: any){
    return this.http.post(this.env.API_URL + 'plainte/addPlaintePreRediger',
      {data: data}
    )
  }

  getPlaintePreRediger(idUser: any){
    return this.http.post(this.env.API_URL + 'plainte/getPlaintePreRediger',
      {idUser: idUser}
    )
  }
}
