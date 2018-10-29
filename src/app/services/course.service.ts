import { Injectable } from '@angular/core';

import { Course } from '../models/course';
import { Rating } from '../models/rating';
import { Section } from '../models/section';
import { Lecture } from '../models/lecture';
import { Discussion } from '../models/discussion';

import { AuthService } from '../services/auth.service';

import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs-compat/operator/map';

declare var $:any;

@Injectable()
export class CourseService {
  courseCollection:AngularFirestoreCollection<Course>;
  sectionCollection:AngularFirestoreCollection<Section>;
  ratingCollection:AngularFirestoreCollection<Rating>;
  lectureCollection:AngularFirestoreCollection<Lecture>;
  discussionCollection:AngularFirestoreCollection<Discussion>;
  
  courses:Observable<Course[]>;
  sections:Observable<Section[]>;
  ratings:Observable<Rating[]>;
  lectures:Observable<Lecture[]>;
  discussions:Observable<Discussion[]>

  courseDoc:AngularFirestoreDocument<Course>;
  lectureDoc:AngularFirestoreDocument<Lecture>;

  constructor(public af:AngularFirestore, private authService:AuthService) { 
    this.courseCollection=this.af.collection('courses', ref=>ref.where("is_active","==",true));
  }

  getCourseById(id:string){
    return this.af.doc("courses/"+id).snapshotChanges().map(a=>{
      const data=a.payload.data() as Course;
      data.id=a.payload.id;
      return data;
    })
  }

  getSection(id:string){

    this.courseDoc=this.af.doc<Course>('courses/'+id);
    this.sectionCollection=this.courseDoc.collection('section');
    this.sections=this.sectionCollection.snapshotChanges().map(changes=>{
      return changes.map(a=>{
        const data=a.payload.doc.data() as Section;
        data.id=a.payload.doc.id;
        return data;
      })
    });

    return this.sections;
  }

  getRating(id:string){
    this.courseDoc=this.af.doc<Course>('courses/'+id);
    this.ratingCollection=this.courseDoc.collection('rating');
    this.ratings=this.ratingCollection.snapshotChanges().map(changes=>{
      return changes.map(a=>{
        const data=a.payload.doc.data() as Rating;
        data.id=a.payload.doc.id;
        return data;
      })
    });
    return this.ratings;
  }

  getLecture(courseId:string,sectionId:string){
    var sectionDoc=this.af.doc<Section>('courses/'+courseId+"/section/"+sectionId);
    this.lectureCollection=sectionDoc.collection("lecture");
    this.lectures=this.lectureCollection.snapshotChanges().map(changes=>{
      return changes.map(a=>{
        const data=a.payload.doc.data() as Lecture;
        data.id=a.payload.doc.id;
        return data;
      })
    });
    return this.lectures;
  }

  getDemoLectures(courseId, sectionId){
    var sectionDoc=this.af.doc<Section>('courses/'+courseId+"/section/"+sectionId);
    this.lectureCollection=sectionDoc.collection("lecture", ref=>ref.where("is_demo","==",true));
    this.lectures=this.lectureCollection.snapshotChanges().map(changes=>{
      return changes.map(a=>{
        const data=a.payload.doc.data() as Lecture;
        data.id=a.payload.doc.id;
        return data;
      })
    });
    return this.lectures;
  }

  getDiscussion(courseId:string, sectionId:string){
    var sectionDoc=this.af.doc<Discussion>('courses/'+courseId+'/section/'+sectionId);
    this.discussionCollection=sectionDoc.collection("discussion");
    this.discussions=this.discussionCollection.snapshotChanges().map(changes=>{
      return changes.map(a=>{
        const data=a.payload.doc.data() as Discussion;
        data.id=a.payload.doc.id;
        return data;
      })
    });
    return this.discussions;
  }

  addQuestion(courseId:string, sectionId:string, discussion:Discussion){
    var sectionDoc=this.af.doc('courses/'+courseId+'/section/'+sectionId);
    var discCollection=sectionDoc.collection("discussion");
    var timeStamp=Math.floor(Date.now()/1000).toString();
    discCollection.doc(timeStamp).set(discussion).then(()=>{
      $("#post-question-alert").show();
    });
  }

  addRating(courseId:string, rating:Rating, uid:string){
    var ratingDoc=this.af.doc('courses/'+courseId);
    var rateCollection=ratingDoc.collection("rating");
    rateCollection.doc(uid).set(rating).then(()=>{
      $("#post-rating-alert").show();
    })
  }

  getCourse(){
    return this.af.collection("courses", ref=>ref.where("is_active","==",true)).snapshotChanges().map(changes=>{
      return changes.map(a=>{
        const data=a.payload.doc.data() as Course;
        data.id=a.payload.doc.id;

        return data;
      });
    });
  }

  getAllCourses(){
    return this.af.collection("courses").snapshotChanges().map(changes=>{
      return changes.map(a=>{
        const data=a.payload.doc.data() as Course;
        data.id=a.payload.doc.id;

        return data;
      });
    });
  }

  getCoursesByCategory(category:string){
    return this.af.collection("courses",ref=>ref.where("category","==",category).where("is_active","==",true)).snapshotChanges().map(actions=>{
      return actions.map(a=>{
        const data=a.payload.doc.data() as Course;
        data.id=a.payload.doc.id;
        return data;
      })
    })
  }

}
