import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // check API command json-server --watch db.json

  constructor( private http: HttpClient ) { }

  postProduct(data:any){
    return this.http.post<any>("http://localhost:3000/productList/",data)
  }

    getProduct(){
    return this.http.get<any>("http://localhost:3000/productList/")
  }
}
