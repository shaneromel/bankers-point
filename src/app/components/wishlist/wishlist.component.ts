import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student.service';

import { Student } from '../../models/student';
import { Course } from '../../models/course';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  courseSubscription:Subscription;
  studentSubscription:Subscription;

  courses:Course[];
  loading:boolean;

  constructor(private courseService:CourseService, private route:ActivatedRoute, private studentService:StudentService) {
    this.courses=new Array();
    this.loading=true;
   }

  ngOnInit() {
    this.route.parent.params.subscribe(params=>{
      var id=params['id'];

      this.studentSubscription=this.studentService.getStudentById(id).subscribe(student=>{
        student.wishlist.forEach(courseId=>{
          this.courseSubscription=this.courseService.getCourseById(courseId).subscribe(course=>{
            this.courses.push(course);
          })
        })
        this.loading=false;
      })
      
    })
  }

  ngOnDestroy(){
    if(this.courseSubscription){
      this.courseSubscription.unsubscribe();
    }
    if(this.studentSubscription){
      this.studentSubscription.unsubscribe();
    }
  }

}
