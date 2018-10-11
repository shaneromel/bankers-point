import { Component, OnInit } from '@angular/core';

import { CourseService } from '../../services/course.service';
import { InstructorService } from '../../services/instructor.service';

import { Instructor } from '../../models/instructor';
import { Course } from '../../models/course';
import { Category } from '../../models/category';

import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Rating } from '../../models/rating';
import { CategoryService } from '../../services/category.service';

declare var $:any;
declare var jquery:any;

@Component({
  selector: 'app-course-listings',
  templateUrl: './course-listings.component.html',
  styleUrls: ['./course-listings.component.css']
})
export class CourseListingsComponent implements OnInit {
  courses:any[];

  instructors:Instructor[];
  ratings:Rating[];

  all:boolean;
  // category:Category={
  //   all:false,
  //   ssc:false,
  //   banking:false
  // };

  ratingSubscription:Subscription;
  courseSubscription:Subscription;
  instructorSubscription:Subscription;
  categorySubscription:Subscription;

  selectedCategories:boolean[];

  categories:Category[];

  public loading:boolean;

  constructor(private courseService:CourseService, private instructorService:InstructorService, private categoryService:CategoryService) {
    this.loading=true;
    this.selectedCategories=new Array();
    this.selectedCategories['SSC']=true;
    this.selectedCategories['Banking']=true;
  }

  ngOnInit() {

    // this.instructorSubscription=this.instructorService.getInstructor().subscribe(instructors=>{
    //   this.instructors=instructors;
    //   
    //   
    // });

    this.fetchData();
  }

  checkCategory(id:number){
    /*if(id==0){
      this.category.all=!this.category.all;
    }
    if(id==1){
      this.category.ssc=!this.category.ssc;
    }
    if(id==2){
      this.category.banking=!this.category.banking;
    }

    if(this.category.ssc&&this.category.banking){
      console.log("ssc banking");
      this.selectedCategory="all";
    }else if(this.category.ssc){
      this.selectedCategory="category_1";
      console.log("ssc");
    }else if(this.category.banking){
      this.selectedCategory="category_2";
      console.log("banking");
    }else{
      this.selectedCategory="all";
      console.log("ssc banking");
    }*/

  }

  fetchData(){
    firebase.firestore().collection("courses").where("is_active","==",true).get().then((querySnapshot)=>{
      this.courses=new Array();
      var i=0;
      var keys=Object.keys(this.selectedCategories);

      for(var j=0;j<keys.length;j++){
        var k=keys[j];
        querySnapshot.forEach(doc=>{
          if(this.selectedCategories[k]){
            if(k===doc.data().category){
              this.courses[i]=doc.data();
              this.courses[i].id=doc.id;
              i=i+1;
            }
          }
        });
      }

      
      var n=this.courses.length;
      var rows,col,c=0;

      $(".content").remove();

      if(n%4==0){
        rows=n/4;
      }else{
        rows=Math.floor(n/4+1);
      }

      for(var i=0;i<rows;i++){
        $("#grids").append("<div id='row"+i+"' class='row content'></div>");
        if(n-c>=4){
          col=4;
        }else{
          col=n-c;
        }

        for(var j=0;j<col;j++){
          // for(var l=0;l<this.instructors.length;l++){
          //   if(this.instructors[l].id===this.courses[c].instructor_id){
          //     var instructor=this.instructors[l];
          //   }
          // }
          // $("#row"+i).append("<div class='col-md-3' ><a href='course-details/"+this.courses[c].id+"'>              <div class='card course-card'>                <img class='card-img-top' src="+this.courses[c].image+" width='100%' height='150px' alt='Card image cap'>                <div class='card-block'>                  <h4 class='card-title'>"+this.courses[c].name+"</h4>                  <span class='card-text item'>"+instructor.name+"</span>                  <span class='item' id='rating"+c+"' >                                        </span>                  <span class='text-success item'>₹"+this.courses[c].price_offer+" <span class='text-success' style='text-decoration:line-through;float:right;' >₹"+this.courses[c].price_actual+"</span></span>                </div>              </div>            </a></div>");
          $("#row"+i).append("<div id='"+this.courses[c].id+"' class='col-md-3 courses' ><a href='course-details/"+this.courses[c].id+"' >              <div class='card course-card'>                <img class='card-img-top' src="+this.courses[c].image+" width='100%' height='150px' alt='Card image cap'>                <div class='card-block'>                  <h4 class='card-title'>"+this.courses[c].name+"</h4>                                   <span class='item' id='rating"+c+"' >                                        </span>                                  </div> <div class='card-footer' style='padding-right:0;' > <span style=' float:right; background-color:#11a15d; color:white; padding-left:15px;padding-right:10px; ' class=' item'><span style='font-size:20px;' >₹</span><strong style='font-size:18px;' >"+this.courses[c].price_offer+"</strong> </span> <span class='text-success' style='text-decoration:line-through; padding-right:10px; float:right;' ><span style='font-size:20px;' >₹</span><span style='font-size:18px;' >"+this.courses[c].price_actual+"</span></span> </div>            </div>            </a></div>");
          //this.rateCourse(c);
          c++;
          
        }

      }
      this.loading=false;
    });


      /*var keys=Object.keys(this.selectedCategories);
      var count=0;

      for(var i=0;i<2;i++){
        var k=keys[i];
        console.log(this.selectedCategories[k]);
        if(this.selectedCategories[k]){
          console.log("Working2");
          for(var j=0;j<this.courses.length;j++){
            console.log(k);
            console.log(this.courses[j].category_id);
            if(k===courses[j].category_id){
              this.courses[count]=courses[j];
              count=count+1;
            }
          }
        }
      }

      var n=this.courses.length;
      var rows,col,c=0;

      $(".content").remove();

      if(n%3==0){
        rows=n/3;
      }else{
        rows=Math.floor(n/3+1);
      }

      for(var i=0;i<rows;i++){
        $("#grids").append("<div id='row"+i+"' class='row content'></div>");
        if(n-c>=3){
          col=3;
        }else{
          col=n-c;
        }

        for(var j=0;j<col;j++){
          $("#row"+i).append("<div class='col-md-4' ><a href='course-details/"+this.courses[c].id+"'>              <div class='card'>                <img class='card-img-top' src="+this.courses[c].image+" width='100%' height='180px' alt='Card image cap'>                <div class='card-block'>                  <h4 class='card-title'>"+this.courses[c].name+"</h4>                  <p class='card-text'>"+this.courses[c].instructor_id+"</p>                  <p>                      <span class='fa fa-star checked'></span>                      <span class='fa fa-star checked'></span>                      <span class='fa fa-star checked'></span>                      <span class='fa fa-star'></span>                      <span class='fa fa-star'></span>                  </p>                  <p>₹"+this.courses[c].price_offer+" <span style='text-decoration:line-through;' >₹"+this.courses[c].price_actual+"</span></p>                </div>              </div>            </a></div>");
          c++;
        }

      }*/
  }

  rateCourse(c:number){

    this.ratingSubscription=this.courseService.getRating(this.courses[c].id).subscribe(ratings=>{
      console.log(this.courses[c].id);
      this.ratings=ratings;
      var avg,s=0;
      console.log(ratings);

      for(var p=0;p<ratings.length;p++){
        s=s+ratings[p].rating;
      }
      avg=Math.floor(s/ratings.length);
      var rate_void=5-avg;
      console.log(ratings.length);
      $(".stars"+c).remove();
      for(var f=0;f<avg;f++){
        $("#rating"+c).append("<span class='fa fa-star checked stars"+c+"'></span>");
        console.log(c);
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
    if(this.categorySubscription){
      this.categorySubscription.unsubscribe();
    }
  }

}