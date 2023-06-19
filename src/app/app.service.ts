import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})



export class AppService {

  constructor (private http: HttpClient) {}

  postData(user: any) {
    const body = JSON.stringify(user)
    this.http.post('https://angular-practice-ff96d-default-rtdb.firebaseio.com/data.json', body)
  }
}
