import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css', 
    './styles/plan.component.css', 
    './styles/user-info.component.css'
  ]
})

export class AppComponent implements OnInit{
  
    userInfoForm: FormGroup
    step = 1

    // Step 2 - Plans propreties

    public plans = [
      {name: 'Arcade', priceMonth: '9', priceYear: '90', icon: '../assets/images/icon-arcade.svg'},
      {name: 'Advanced', priceMonth: '12', priceYear: '120', icon: '../assets/images/icon-advanced.svg'},
      {name: 'Pro', priceMonth: '15', priceYear: '150', icon: '../assets/images/icon-pro.svg'},
    ]
  
    @Input()  planMode = 'monthly'
  
    onSwitchPlanMode() {
      if (this.planMode === 'monthly') {
        this.planMode = 'yearly'
      }else {
        this.planMode = 'monthly'
  
      }
    }

    constructor() {

    }

    ngOnInit(): void {
      this.userInfoForm = new FormGroup({
        name: new FormControl(null),
        email: new FormControl(null),
        number: new FormControl(null),
        plan: new FormControl(null),
        isPaymentYearly: new FormControl(null),
        adds: new FormControl(null),
      })
    }

    onStepClick() {
      this.step = this.step + 1
    }

    onGoBack() {
      this.step = this.step - 1
    }
    
    onSubmit() {
      console.log(this.userInfoForm)
    }
}
