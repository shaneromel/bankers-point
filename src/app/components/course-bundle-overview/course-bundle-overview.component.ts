import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase';

import { CourseBundleService } from '../../services/course-bundle.service';
import { InstructorService } from '../../services/instructor.service';

import { CourseBundle } from '../../models/coursebundle';
import { Instructor } from '../../models/instructor';

import { Subscription } from 'rxjs/Subscription';

declare var $:any;

@Component({
  selector: 'app-course-bundle-overview',
  templateUrl: './course-bundle-overview.component.html',
  styleUrls: ['./course-bundle-overview.component.css']
})
export class CourseBundleOverviewComponent implements OnInit {
  courseBundle:CourseBundle;
  instructor:Instructor;

  courseBundleSubscription:Subscription;
  instructorSubscription:Subscription;
  sub:Subscription;

  courseBundleId:string;

  loading:boolean;

  constructor(private instructorService:InstructorService, private courseBundleService:CourseBundleService, private route:ActivatedRoute) {
    this.loading=true;
   }

  ngOnInit() {
    this.sub=this.route.parent.params.subscribe(params=>{
      this.courseBundleId=params['id'];
    });

    // this.courseBundleSubscription=this.courseBundleService.getCourseBundle().subscribe(coursebundles=>{

    //   coursebundles.forEach(coursebundle=>{
    //     if(coursebundle.id===this.courseBundleId){
    //       this.courseBundle=coursebundle;
    //       $("#overview").html(this.courseBundle.overview);
    //     }
    //   });

    //   this.instructorSubscription=this.instructorService.getInstructor().subscribe(instuctors=>{
    //     instuctors.forEach(instructor=>{
    //       if(instructor.id===this.courseBundle.instructor_id){
    //         this.instructor=instructor;
    //       }
    //     });
    //   });
    // });

    firebase.firestore().doc("course_bundle/"+this.courseBundleId).get().then(doc=>{
      this.courseBundle=doc.data() as CourseBundle;
      $("#overview").html(this.courseBundle.overview);
      this.loading=false;
    });

  }

}
