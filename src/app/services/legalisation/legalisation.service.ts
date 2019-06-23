import { EnvService } from './../env/env.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LegalisationService {

  constructor(
    private http: HttpClient,
    private env: EnvService,
  ) { }

  gettypedoc() {
    return this.http.get(this.env.API_URL + 'legalisation/get_type_doc')
  }

  addDemandeLega(data: any){
    return this.http.post(this.env.API_URL + 'legalisation/addDemandeLega',
      {data: data}
    )
  }


  getAllDemande(idUser: any){
    return this.http.post(this.env.API_URL + 'legalisation/getAllDemandeLega',
      {idUser: idUser}
    )
  }
}
