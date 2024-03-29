import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css', 
    './styles/plan.component.css', 
    './styles/user-info.component.css',
    './styles/adds.component.css'
  ]
})

export class AppComponent implements OnInit{

 
  // Create Reactive From
    userInfoForm: FormGroup

    // Installing current step 
    step = 1

    totalPrice = 0

    planPayment = []

    planPrice = {
      yearly: 0,
      monthly: 0
    }

    steps =  [
      {number: 1, title: 'YOUR INFO'},
      {number: 2, title: 'SELECT PLAN'},
      {number: 3, title: 'ADD-ONS'},
      {number: 4, title: 'SUMMARY'},
    ]

    userInfo = {
      name: '',
      email: '',
      number: '',
      plan: '',
      isPaymentYearly: false,
      onlineService: false,
      largerStorage: false,
      customProfile: false,
    }

    @Input()  planMode = 'monthly'

    
    // Step 2 - Plans propreties

    public plans = [
      {name: 'Arcade', priceMonth: '9', priceYear: '90', icon: '../assets/images/icon-arcade.svg'},
      {name: 'Advanced', priceMonth: '12', priceYear: '120', icon: '../assets/images/icon-advanced.svg'},
      {name: 'Pro', priceMonth: '15', priceYear: '150', icon: '../assets/images/icon-pro.svg'},
    ]
  
    constructor(private httpService: AppService) {

    }
  
    onSwitchPlanMode() {
      if (this.planMode === 'monthly') {
        this.planMode = 'yearly'
      }else {
        this.planMode = 'monthly'
  
      }
    }


    ngOnInit(): void {
      this.userInfoForm = new FormGroup({
        name: new FormControl(null),
        email: new FormControl(null),
        number: new FormControl(null),
        plan: new FormControl('Arcade'),
        isPaymentYearly: new FormControl(false),
        onlineService: new FormControl(false),
        largerStorage: new FormControl(false),
        customProfile: new FormControl(false),
      })

    }

    onStepClick() {
      this.step = this.step + 1
    }

    onGoBack() {
      this.step = this.step - 1
    }
  
    onBackToPlan() {
      this.step = this.step - 2
    }

    onNavClick(navNumber) {
      this.step = Math.floor(navNumber)
    }

    onSubmit() {
      const user = this.userInfoForm.value
      this.step = this.step + 1

      this.userInfo.name = user.name
      this.userInfo.email = user.email
      this.userInfo.number = user.number
      this.userInfo.plan = user.plan
      this.userInfo.isPaymentYearly = user.isPaymentYearly
      this.userInfo.onlineService = user.onlineService
      this.userInfo.largerStorage = user.largerStorage
      this.userInfo.customProfile = user.customProfile

      this.planPayment = this.plans.filter(plan => user.plan === plan.name)

      this.planPrice = {
        monthly: this.planPayment[0].priceMonth,
        yearly: this.planPayment[0].priceYear
      }

      this.totalPrice = Math.floor(this.userInfo.isPaymentYearly ? this.planPrice.yearly : this.planPrice.monthly)

      if  (this.userInfo.isPaymentYearly) {
        if (this.userInfo.onlineService) {
          this.totalPrice += 10
        }
        
        if (this.userInfo.largerStorage) {
          this.totalPrice += 20
        }

        if (this.userInfo.customProfile) {
          this.totalPrice += 20
        }
      }else  {
        if (this.userInfo.onlineService) {
          this.totalPrice += 1
        }
        
        if (this.userInfo.largerStorage) {
          this.totalPrice += 2
        }

        if (this.userInfo.customProfile) {
          this.totalPrice += 2
        }
      }

      this.httpService.postData(this.userInfoForm.value)
    }


}
