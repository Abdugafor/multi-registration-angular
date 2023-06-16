import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})



export class AppService {
  public userInfo = {
    name: '',
    email: '',
    number: '',
    plan: '',
    add: []
  }

  constructor() { }

  sendUserInfo(props: any) {
    this.userInfo.name = props.name
    this.userInfo.email = props.email
    this.userInfo.number = props.number
  }

  getUserInfo() {
    return this.userInfo
  }
}
