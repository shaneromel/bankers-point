import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { CategoryService } from '../../services/category.service';
import { CourseService } from '../../services/course.service';
import { InstructorService } from '../../services/instructor.service';

import { Subscription } from 'rxjs/Subscription';

import { Category } from '../../models/category';
import { Course } from '../../models/course';
import { Instructor } from '../../models/instructor';
import { Rating } from '../../models/rating';

import * as firebase from 'firebase';

declare var $:any;
declare var jquery:any;

@Component({
  selector: 'app-explore-courses',
  templateUrl: './explore-courses.component.html',
  styleUrls: ['./explore-courses.component.css']
})
export class ExploreCoursesComponent implements OnInit {
  category:string;
  selectedCategory:string;
  course:Course;

  categories:Category[];
  courses:Course[]
  instructors:Instructor[];
  ratings:Rating[];

  sub:Subscription;
  categorySubscription:Subscription;
  courseSubscription:Subscription;
  instructorSubscription:Subscription;
  ratingSubscription:Subscription;

  categoryName:string;

  public loading:boolean;

  constructor(private route:ActivatedRoute, private categoryService:CategoryService, private courseService:CourseService, private instructorService:InstructorService) {
  }

  ngOnInit() {

    this.instructorSubscription=this.instructorService.getInstructor().subscribe(instructors=>{
      this.instructors=instructors;
    });

    // this.categorySubscription=this.categoryService.getCategories().subscribe(categories=>{
    //   this.categories=categories;
    // });
      
    this.sub=this.route.params.subscribe(params=>{
      this.loading=true;
      this.categoryName=params['category'];
      this.courseService.getCoursesByCategory(params['category']).subscribe(courses=>{
        this.courses=courses;
        this.loading=false;
      })

    });

  }

  rateCourse(c:number){

    this.ratingSubscription=this.courseService.getRating(this.courses[c].id).subscribe(ratings=>{
      this.ratings=ratings;
      var avg,s=0;

      for(var p=0;p<ratings.length;p++){
        s=s+ratings[p].rating;
      }
      avg=Math.floor(s/ratings.length);
      var rate_void=5-avg;
      $(".stars"+c).remove();
      for(var f=0;f<avg;f++){
        $("#rating"+c).append("<span class='fa fa-star checked stars"+c+"'></span>");
      }
      for(var f=0;f<rate_void;f++){
        $("#rating"+c).append("<span class='fa fa-star stars"+c+"'></span>");
      }

    });

  }

  ngOnDestroy(){
    if(this.instructorSubscription){
      this.instructorSubscription.unsubscribe();
    }
    if(this.courseSubscription){
      this.courseSubscription.unsubscribe();
    }
    if(this.categorySubscription){
      this.categorySubscription.unsubscribe();
    }
  }

}
