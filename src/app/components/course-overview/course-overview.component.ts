import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase';

import { CourseService } from '../../services/course.service';
import { InstructorService } from '../../services/instructor.service';

import { Course } from '../../models/course';
import { Instructor } from '../../models/instructor'; 

import { Subscription } from 'rxjs/Subscription';

declare var $ :any;

@Component({
  selector: 'app-course-overview',
  templateUrl: './course-overview.component.html',
  styleUrls: ['./course-overview.component.css']
})
export class CourseOverviewComponent implements OnInit {

  sub:Subscription;
  instructorSubscription:Subscription;
  courseSubscription:Subscription;

  course:Course;
  instructor:Instructor;

  course_id:string;

  public loading:boolean;

  constructor(private route:ActivatedRoute, private instructorService:InstructorService, private courseService:CourseService) {
    this.loading=true;
   }

  ngOnInit() {
  this.sub=this.route.parent.params.subscribe(params=>{
      this.course_id=params['id'];
  });

  firebase.firestore().doc("courses/"+this.course_id).get().then(course=>{
    this.course=course.data() as Course;
    this.course.id=course.id;
    
    firebase.firestore().doc("instructors/"+course.data().instructor_id).get().then(instructor=>{
      this.instructor=instructor.data() as Instructor;
      this.instructor.id=instructor.id;
    });

    $("#overview").html(this.course.overview);

  }).then(()=>{
    this.loading=false;
  });

  //   this.courseService.getCourse().subscribe(courses=>{
  //      courses.forEach(course=>{
  //        if(course.id===this.course_id){
  //          this.course=course;
  //        }
  //      });
  //   });

  //   this.instructorSubscription=this.instructorService.getInstructor().subscribe(instructors=>{
  //     instructors.forEach(instructor=>{
  //       if(instructor.id===this.course.instructor_id){
  //         this.instructor=instructor;
  //       }
  //     });
  //  });

  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

}
