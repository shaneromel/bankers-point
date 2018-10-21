import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { Student } from '../../models/student';

import { AuthService } from '../../services/auth.service';
import { StudentService } from '../../services/student.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private authService:AuthService, private studentService:StudentService, private router:Router, private http:HttpClient) { }

  ngOnInit() {
    this.authService.afAuth.auth.onAuthStateChanged(user=>{
      if(user){
        this.router.navigate(['/dashboard/'+user.uid+"/my-courses"]);
      }
    });
  }

  signUp(){
    if(this.student.email!=''&&this.student.name!=''&&this.student.phone!=''){
      if(this.pass==this.passConfirm){
        this.authService.register(this.student,this.pass).then(()=>{
          this.studentService.addStudent(this.student);
          firebase.firestore().doc("welcome_template/welcome_template").get().then(doc=>{
            var body={
              content:doc.data().welcome_template,
              address:this.student.email,
              subject:doc.data().subject
            }
            this.http.post("https://bankerspoint.org/mail.php", body);
          })
        })
      }else{
        $("#signup-error-alert").text("Passwords do not match").show();
      }
    }else{
      $("#signup-error-alert").text("All fields are compulsory").show();
    }
  }

}
