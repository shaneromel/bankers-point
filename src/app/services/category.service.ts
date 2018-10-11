import { Injectable } from '@angular/core';

import { Category } from '../models/category';

import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs-compat/operator/map';

@Injectable()
export class CategoryService {
  categoryCollection:AngularFirestoreCollection<Category[]>;

  categories:Observable<Category[]>

  constructor(public af:AngularFirestore) {
    this.categoryCollection=this.af.collection('categories');
   }

   getCategories(){
     return this.af.collection("categories").snapshotChanges().map(actions=>{
       return actions.map(a=>{
         const data=a.payload.doc.data() as Category;
         data.id=a.payload.doc.id;
         return data
       })
     })
   }

   getCat(){
     return this.af.collection("categories").snapshotChanges().map(changes=>{
      return changes.map(a=>{
        const data=a.payload.doc.data() as Category;
        data.id=a.payload.doc.id;
        return data;
      })
    });
   }

   getCategoryById(id:string){
     return this.af.collection("categories").doc(id).snapshotChanges().map(a=>{
       const data=a.payload.data() as Category;
       data.id=a.payload.id;
       return data;
     })
   }

}
