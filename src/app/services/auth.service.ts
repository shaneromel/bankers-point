import { Injectable, ViewContainerRef } from '@angular/core';

import { Observable } from 'rxjs/Observable'
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

import { Student } from '../models/student';
import { AngularFireAuth } from '@angular/fire/auth';

declare var $:any;

@Injectable()
export class AuthService {

  constructor(public afAuth:AngularFireAuth, private router:Router) {
    afAuth.auth.onAuthStateChanged(user=>{
      if(user){
        user.getIdToken().then(token=>{
          firebase.firestore().collection("user_tokens").doc(user.uid).set({token:token});
        })
        
      }
    })  
  }

  login(email,password){
      this.afAuth.auth.signInWithEmailAndPassword(email,password).then((user)=>{
        this.router.navigate(['/dashboard/'+user.user.uid+"/my-courses"]);
      }).catch(err=>{
        $("#signin-error-alert").text(err).show();
      })
  }

  getUser(){
    return this.afAuth;
  }

  async register(student:Student,password:string){
    try{
      const result=await this.afAuth.auth.createUserWithEmailAndPassword(student.email,password);
      console.log(result);
      this.router.navigate(['/course-listings']);
    }
    catch(e){
      $("#signup-error-alert").text(e).show();
    }
  }

  isLoggedIn(){
    return this.afAuth.auth.currentUser;
  }

  changePassword(oldPass:string,newPass:string){
    var user=this.afAuth.auth.currentUser;
    var credential=firebase.auth.EmailAuthProvider.credential(user.email,oldPass);

    user.reauthenticateWithCredential(credential).then(()=>{
      this.afAuth.auth.currentUser.updatePassword(newPass).then(()=>{
        document.getElementById("edit-password").style.display="block";
      }).catch(err=>{
        alert(err);
      });
    }).catch(err=>{
      alert(err);
    });

  }

  editProfile(student:Student){
    var user=this.afAuth.auth.currentUser;
    user.updateProfile({
      displayName:student.name,
      photoURL:student.image
    }).then(()=>{
      console.log(user.displayName);

    }).catch(err=>{
      console.log(err);
    })
  }

  logout(){
    return this.afAuth.auth.signOut();
  }

}
