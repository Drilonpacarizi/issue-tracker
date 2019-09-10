import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  

  constructor(
    private router: Router
  ) { }

  email: ''
  firstName: ''
  lastName: ''
  password: ''
  confirmPassword: ''

  emailLogin: ''
  passwordLogin: ''

  url = 'http://localhost:3000/';
  ngOnInit() {
  }

  createUser(){

      let user = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword

      }
      axios.post(this.url + 'user', user).then(res => {
        console.log(res.data);
        this.email = '';
        this.firstName = '';
        this.lastName = '';
        this.password = '';
        this.confirmPassword = '';
        alert("You registered Succesfully")
      })
        .catch(err => {
          console.log(err);
        });
    
  }
  logIn(){
    let user = {
      email: this.emailLogin,
      password: this.passwordLogin
    }
    axios.post(this.url + 'user/login', user).then(res => {
      console.log(res.data.loggedIn);
      if(res.data.loggedIn){
        this.router.navigate(['/issues'])
      }
      else {
        alert("Incorrect Password or email")
      }
    })
    .catch(err => {
      console.log(err);
    });
  }



}
