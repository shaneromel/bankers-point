import { Injectable } from '@angular/core';

import { Instructor } from '../models/instructor';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';

@Injectable()
export class InstructorService {
  instructorCollection:AngularFirestoreCollection<Instructor>;
  instructors:Observable<Instructor[]>;

  constructor(public af:AngularFirestore) {
    this.instructorCollection=af.collection('instructors');

    this.instructors=this.instructorCollection.snapshotChanges().map(changes=>{
      return changes.map(a=>{
        const data=a.payload.doc.data() as Instructor;
        data.id=a.payload.doc.id;
        return data;
      })
    });
   }

   getInstructor(){
     return this.instructors;
   }

}
