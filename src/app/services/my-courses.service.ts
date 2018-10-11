import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

import { AuthService } from '../services/auth.service';

@Injectable()
export class MyCoursesService {
  myCourseBundles:string[];

  constructor(private authService:AuthService) {
    this.myCourseBundles=new Array();
    authService.afAuth.auth.onAuthStateChanged(user=>{
      if(user){
        firebase.firestore().doc("students/"+user.uid).collection("my_course_bundles").get().then(querySnapshot=>{
          querySnapshot.forEach(doc=>{
            this.myCourseBundles.push(doc.id);
          })
        })
      }
    })
   }

   getMyCourseBundles(){
     return this.myCourseBundles;
   }

}
