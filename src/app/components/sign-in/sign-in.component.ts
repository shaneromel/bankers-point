import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

declare var $:any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  email:string;
  password:string;

  resetEmail:string;
  resetError:string;

  constructor(private authService:AuthService, private router:Router) {
    this.resetEmail="";
   }

  ngOnInit() {
    this.authService.afAuth.auth.onAuthStateChanged(user=>{
      if(user){
        this.router.navigate(['course-listings']);
      }
    });
  }

  login(){
    this.authService.login(this.email,this.password);
  }

  resetPass(){
    if(this.resetEmail!=""){
      var actionCodesettings={
        url:"http://localhost:4200/signin"
      }
      this.authService.afAuth.auth.sendPasswordResetEmail(this.resetEmail,actionCodesettings).then(()=>{
        $("#reset-alert").show();
        $("#reset-error-alert").hide();
      }).catch((err)=>{
        this.resetError=err;
        $("#reset-alert").hide();
        $("#reset-error-alert").text(err).show();
      });
    }
  }

}
