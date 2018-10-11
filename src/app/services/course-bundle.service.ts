import { Injectable } from '@angular/core';

import { CourseBundle } from '../models/coursebundle';

import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class CourseBundleService {
  courseBundles:Observable<CourseBundle[]>;
  courseBundleCollection:AngularFirestoreCollection<CourseBundle>;
  courseBundleCourseCollection:AngularFirestoreCollection<CourseBundleCourse>;

  constructor(private af:AngularFirestore) {

    this.courseBundleCollection=this.af.collection("course_bundle", ref=>ref.where("is_active","==",true));

    this.courseBundles=this.courseBundleCollection.snapshotChanges().map(changes=>{
      return changes.map(a=>{
        const data=a.payload.doc.data() as CourseBundle;
        data.id=a.payload.doc.id;
        return data;
      });
    });

   }

   getCourseBundle(){
     return this.courseBundles;
   }

   getCourseBundleCourses(id:string){
    this.courseBundleCourseCollection=this.af.collection("course_bundle").doc(id).collection("courses");

    var courseBundleCourses=this.courseBundleCourseCollection.snapshotChanges().map(changes=>{
      return changes.map(a=>{
        const data=a.payload.doc.data() as CourseBundleCourse;
        data.id=a.payload.doc.id;
        return data;
      });
    });

    return courseBundleCourses;
   }

}

interface CourseBundleCourse{
  name:string,
  id:string
}