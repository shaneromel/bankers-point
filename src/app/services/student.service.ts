import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { MyCourse } from '../models/mycourses';

import { Observable } from 'rxjs/Observable';

import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

declare var $:any;

@Injectable()
export class StudentService {
  studentCollection:AngularFirestoreCollection<Student>;

  students:Observable<Student[]>;
  studentCourses:Observable<MyCourse[]>

  studentDoc:AngularFirestoreDocument<Student>;

  constructor(public af:AngularFirestore, private authService:AuthService) { 
    this.studentCollection=this.af.collection('students');

    this.students=this.studentCollection.snapshotChanges().map(changes=>{
      return changes.map(a=>{
        const data=a.payload.doc.data() as Student;
        data.id=a.payload.doc.id;
        return data;
      })
    });

  }

  addStudent(student:Student){
    this.authService.afAuth.auth.onAuthStateChanged(user=>{
      if(user){

        user.updateProfile({
          displayName:student.name,
          photoURL:student.image
        }).then(()=>{
            var uid=user.uid;
            this.studentCollection.doc(uid).set(student).then(()=>{
            $("#edit-message").show();
          });
        }).catch(err=>{
          alert(err);
        });
      }
    });
  }

  // getStudentbyId(id:string){
  //   var getStudent
  //   var studentSubscription=this.students.subscribe(students=>{
  //     students.forEach(student=>{
  //       if(student.id===id){
  //         getStudent=student
  //       }
  //     })
  //   });
  //   return getStudent;
  // }

  getStudentById(id:string){
    return this.af.doc("students/"+id).snapshotChanges().map(student=>{
      const data=student.payload.data() as Student;
      data.id=student.payload.id;
      return data;
    })
  }

  getStudentCourses(id:string){
    var courseCollection:AngularFirestoreCollection<MyCourse>
    courseCollection=this.af.doc("students/"+id).collection("my_courses");
    this.studentCourses=courseCollection.snapshotChanges().map(changes=>{
      return changes.map(a=>{
        const data=a.payload.doc.data() as MyCourse;
        data.id=a.payload.doc.id;
        return data;
      })
    });

    return this.studentCourses;

  }

  getStudent(){
    return this.students;
  }

}