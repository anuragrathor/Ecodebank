import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http:HttpClient,private router:Router) {  

  }

  goTo(page:any) {
    this.router.navigate([page]);
  }

  get(url:any) {
    return this.http.get(environment.url+url);
  }

  post(url:any, data:any) {
    return this.http.post(environment.url+url, data);
  }

  postFormData(url:any, data:any) {
    return this.http.post(environment.url+url, data);
  }


}
