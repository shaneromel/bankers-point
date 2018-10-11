import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';

import { Lecture } from '../../models/lecture';
import { Course } from '../../models/course';
import { Section } from '../../models/section';
import { Discussion } from '../../models/discussion';
import { Student } from '../../models/student';
import { Rating } from '../../models/rating';

import { AuthService } from '../../services/auth.service';

import * as firebase from 'firebase';

import { Subscription } from 'rxjs/Subscription';

declare var $:any;

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {
  lectureSubscription:Subscription;
  courseSubscription:Subscription;
  sectionSubscription:Subscription;
  sub:Subscription;
  discussionSubscription:Subscription;
  childSub:Subscription;
  studentSubscription:Subscription;

  lectures:Lecture[];
  courses:Course[];
  sections:Section[];
  discussions:Discussion[];
  students:Student[];

  lec:any[];
  disc:any[];
  studs:any[];

  course_id:string;
  section_id:string;

  course:Course;

  questionState:boolean;
  curriculumState:boolean;
  askQuestionState:boolean;
  rateCourseState:boolean;

  discussion:Discussion={
    message:"",
    uid:"",
    id:""
  };
  rating:Rating={
    message:"",
    rating:0,
    id:""
  }

  isSubscribed:boolean;

  public loading:boolean;

  timer:Timer={
    minutes:4,
    seconds:30
  };


  constructor(private courseService:CourseService, public route:ActivatedRoute, private studentService:StudentService, public router:Router, private authService:AuthService) {
    this.lec=new Array();
    this.questionState=false;
    this.curriculumState=true;
    this.askQuestionState=false;
    this.rateCourseState=false;
    this.isSubscribed=false;

    // document.addEventListener('contextmenu', event => event.preventDefault());
   }

  ngOnInit() {
    var i=0;
    this.authService.afAuth.auth.onAuthStateChanged(user=>{
      if(user){
        firebase.firestore().collection("students").doc(user.uid).collection("my_courses").doc(this.course_id).get().then(doc=>{
          if(doc.exists){
            this.isSubscribed=true;
            
          }else{
            firebase.firestore().doc('courses/'+this.course_id).get().then(doc=>{
              if(doc.data().is_free){
                this.isSubscribed=true;
              }else{
                this.isSubscribed=false;
              }
            });
          }
        });
      }
    });

    this.sub=this.route.params.subscribe(params=>{
      this.course_id=params['course-id'];
    });

    this.sectionSubscription=this.courseService.getSection(this.course_id).subscribe(sections=>{
      this.sections=sections;
      this.lec=new Array();
      this.disc=new Array();
      var firstLec;

      for(var i=0;i<this.sections.length;i++){
        this.fetchLectures(i);
      }

      

    });

    if(this.route.firstChild==null){
      var sectionRef=firebase.firestore().collection("courses").doc(this.course_id).collection("section");
      sectionRef.limit(1).get().then(querySnapshot=> {
        querySnapshot.forEach(section=> {
            sectionRef.doc(section.id).collection("lecture").limit(1).get().then(query2=>{
              query2.forEach(lecture=>{
                this.navigateDefault(section.id,lecture.id);
              });
            });
        });
        this.loading=false;
    })
    .catch(function(error) {
        console.error("Error getting documents: ", error);
    });
    }else{
      this.showDiscussions()
    }

    firebase.firestore().doc("courses/"+this.course_id).get().then(course=>{
      this.course=course.data() as Course;
      this.course.id=course.id;
    });

  }

  showDiscussions(){
    this.childSub=this.route.firstChild.params.subscribe(params=>{
      this.section_id=params['section-id'];
      this.studs=new Array();
      if(this.studentSubscription!=null){
        this.studentSubscription.unsubscribe();
      }

       this.discussionSubscription=this.courseService.getDiscussion(this.course_id,this.section_id).subscribe(discussions=>{
        this.discussions=discussions;
        this.studentSubscription=this.studentService.getStudent().subscribe(students=>{

          this.discussions.forEach(disc=>{
            students.forEach(stud=>{
              if(disc.uid===stud.id){
                this.studs[disc.uid]=stud;
              }
            });
          });
        });
      });
    });
  }

  navigateDefault(section:string,lecture:string){
    this.router.navigate(['lecture',section,lecture],{relativeTo:this.route}).then(()=>{
      this.childSub=this.route.firstChild.params.subscribe(params=>{
        this.section_id=params['section-id'];
        this.studs=new Array();
        if(this.studentSubscription!=null){
          this.studentSubscription.unsubscribe();
        }
  
         this.discussionSubscription=this.courseService.getDiscussion(this.course_id,this.section_id).subscribe(discussions=>{
          this.discussions=discussions;
          this.studentSubscription=this.studentService.getStudent().subscribe(students=>{
            this.discussions.forEach(disc=>{
              students.forEach(stud=>{
                if(disc.uid===stud.id){
                  this.studs[disc.uid]=stud;
                }
              });
            });
          });
        });
  
      });
    });
  }

  changeQuestionState(){
    this.questionState=true;
    this.curriculumState=false;
    this.askQuestionState=false;
    this.rateCourseState=false;
  }

  changeCurriculumState(){
    this.curriculumState=true;
    this.questionState=false;
    this.askQuestionState=false;
    this.rateCourseState=false;
  }

  changeAskquestionState(){
    this.askQuestionState=true;
    this.questionState=false;
    this.curriculumState=false;
    this.rateCourseState=false;
  }

  changeRateCourseState(){
    this.rateCourseState=true;
    this.curriculumState=false;
    this.questionState=false;
    this.askQuestionState=false;
  }

  postQuestion(){
    this.loading=true;
    if(this.discussion.message!=""){
      this.authService.afAuth.auth.onAuthStateChanged(user=>{
        this.discussion.uid=user.uid;
        this.courseService.addQuestion(this.course_id,this.section_id,this.discussion);
        this.loading=false;
      });
    }else{
      this.loading=false;
      $("#error-alert").show();
    }

  }

  postRating(){
    if(this.rating.rating!=0&&this.rating.message!=""){
      this.authService.afAuth.auth.onAuthStateChanged(user=>{
        if(user){
          this.courseService.addRating(this.course_id,this.rating,user.uid);
        }
      });
    }else{
      $("#rating-error-alert").show();
    }
  }

  fetchLectures(i:number){
    this.lectureSubscription=this.courseService.getLecture(this.course_id, this.sections[i].id).subscribe(lectures=>{
      this.lectures=lectures;
      this.lec[this.sections[i].id]=lectures;

    });
  }

  removeAlert(){
    $("#post-question-alert").hide();
    $("#post-rating-alert").hide();
  }
  removeErrorAlert(){
    $("#error-alert").hide();
    $("#rating-error-alert").hide();
  }

  ngOnDestroy(){
    if(this.lectureSubscription){
      this.lectureSubscription.unsubscribe();
    }
    if(this.sectionSubscription){
      this.sectionSubscription.unsubscribe();
    }
    if(this.sub){
      this.sub.unsubscribe();
    }
    if(this.discussionSubscription){
      this.discussionSubscription.unsubscribe();
    }
    if(this.studentSubscription){
      this.studentSubscription.unsubscribe();
    }
  }

}

interface Timer{
  minutes:number,
  seconds:number
}