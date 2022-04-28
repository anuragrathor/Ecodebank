import { Component, OnInit } from '@angular/core';
// import { AbstractControl, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {FormBuilder, Validators} from '@angular/forms';
//import Validation from './utils/Validation';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
 signup:any;
 submitted = false;
  
  constructor(private formBuilder: FormBuilder) { 
    
  }
  
  ngOnInit(): void {
    this.signup = this.formBuilder.group(
      {
        fullname: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      });
    
  }


  get f(){
    return this.signup.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.signup.invalid) {
      return;
    }
    console.log(JSON.stringify(this.signup.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.signup.reset();
  }



}
