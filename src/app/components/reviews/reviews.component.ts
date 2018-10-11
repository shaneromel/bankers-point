import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DecimalPipe } from '@angular/common';

import { StudentService } from '../../services/student.service';
import { CourseService } from '../../services/course.service';

import { Student } from '../../models/student';

import { Subscription } from 'rxjs/Subscription';
import { Rating } from '../../models/rating';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  students:Student[];
  ratings:Rating[];

  studentSubscription:Subscription;
  ratingSubscription:Subscription;
  sub:Subscription;

  course_id:string;

  rate:any[];
  rateVoid:any[];

  ratingsAvg:number;
  ratingsWhole:number[];
  ratingsVoid:number[];
  avgRatings:Progress[];

  public loading:boolean;

  constructor(private studentService:StudentService, private courseService:CourseService, private route:ActivatedRoute) {
    this.loading=true;
    this.students=new Array();
    this.ratings=new Array();
    this.rate=new Array();
    this.rateVoid=new Array();
    this.avgRatings=new Array(5);
    this.ratingsAvg=0;
    for(var i=0;i<5;i++){
      this.avgRatings[i]={};
    }
   }

  ngOnInit() {

    this.sub=this.route.parent.params.subscribe(params=>{
      this.course_id=params['id'];
    });
    var c=0;
    this.studentSubscription=this.studentService.getStudent().subscribe(students=>{

      this.ratingSubscription=this.courseService.getRating(this.course_id).subscribe(ratings=>{
        this.ratings=new Array();
        var s=0, i=0;
        if(ratings.length>0){
          ratings.forEach(rating=>{
            s=s+rating.rating;
          });
          
          this.ratingsAvg=s/ratings.length;
          this.ratingsWhole=Array(Math.floor(this.ratingsAvg)).fill(1);
          this.ratingsVoid=Array(5-Math.floor(this.ratingsAvg)).fill(1);
  
          var avg=0,s=0;
          for(var i=1;i<=5;i++){
            ratings.forEach(rating=>{
              if(rating.rating==i){
                s=s+1;
              }
            });
            avg=Math.floor(s/ratings.length*100);
            this.avgRatings[i-1].width=avg.toString()+"%";
            s=0;
          }
        }

        students.forEach(student=>{
          ratings.forEach(rating=>{
            if(student.id===rating.id){
              this.students.push(student);
              this.ratings.push(rating);
              this.looper(rating.rating,c);
              c=c+1;
            }
          });
        });
      });
      this.loading=false;
    });

  }

  looper(n:number, index:number){
    this.rate[index]=Array(n).fill(1);
    this.rateVoid[index]=Array(5-n).fill(1);
  }

  ngOnDestroy(){
    if(this.studentSubscription){
      this.studentSubscription.unsubscribe();
    }
    if(this.ratingSubscription){
      this.ratingSubscription.unsubscribe();
    }
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

}
interface Progress{
  width ? :string
}