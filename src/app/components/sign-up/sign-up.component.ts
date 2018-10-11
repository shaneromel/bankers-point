import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user';
import { Student } from '../../models/student';

import { AuthService } from '../../services/auth.service';
import { StudentService } from '../../services/student.service';

declare var $:any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  passConfirm:string;
  pass:string;

  student:Student={
    bio:'',
    email:'',
    image:'http://www.cdn.innesvienna.net//Content/user-default.png',
    name:'',
    phone:'',
    id:'',
    wishlist:new Array()
  };

  constructor(private authService:AuthService, private studentService:StudentService, private router:Router) { }

  ngOnInit() {
    this.authService.afAuth.auth.onAuthStateChanged(user=>{
      if(user){
        this.router.navigate(['course-listings']);
      }
    });
  }

  signUp(){
    if(this.student.email!=''&&this.student.name!=''&&this.student.phone!=''){
      if(this.pass==this.passConfirm){
        this.authService.register(this.student,this.pass).then(()=>{
          this.studentService.addStudent(this.student);
        })
      }else{
        $("#signup-error-alert").text("Passwords do not match").show();
      }
    }else{
      $("#signup-error-alert").text("All fields are compulsory").show();
    }
  }

}
