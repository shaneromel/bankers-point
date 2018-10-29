import { Component, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';

import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

import { CourseService } from '../../services/course.service';
import { InstructorService } from '../../services/instructor.service';
import { CourseBundleService } from '../../services/course-bundle.service';
import { AuthService } from '../../services/auth.service';

import { Course } from '../../models/course';
import { Instructor } from '../../models/instructor';
import { Rating } from '../../models/rating';
import { CourseBundle } from '../../models/coursebundle';

import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { OpeningDialogComponent } from '../opening-dialog/opening-dialog.component';


declare var $:any;
declare var jquery:any, window:any, ScrollReveal:any, sr:any;

@NgModule({
  imports:[
    MatCardModule
  ]
})

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {
  courses:Course[];
  intructors:Instructor[];
  ratings:Rating[];
  courseBundles:CourseBundle[];
  courseBundleCourses:number;

  banners:string[];

  courseSubscription:Subscription;
  instructorSubscription:Subscription;
  ratingSubscription:Subscription;
  courseBundleSubscription:Subscription;
  courseBundleCoursesSubscription:Subscription;

  authState:boolean;

  aboutUs:any[];

  constructor(private courseService:CourseService, private router:Router, private instructorService:InstructorService, private courseBundleService:CourseBundleService, private dialog:MatDialog, private authService:AuthService) {
    this.banners=new Array();
    authService.afAuth.auth.onAuthStateChanged(user=>{
      if(user){
        this.authState=true;
      }else{
        this.authState=false;
      }
    })
   }

  ngOnInit() {

    firebase.firestore().collection("about-us").get().then(querySnapshot=>{
      this.aboutUs=new Array();
      querySnapshot.forEach(doc=>{
        var d=doc.data() as any;
        d.id=doc.id;
        this.aboutUs.push(d);
      })
    })

    // this.instructorSubscription=this.instructorService.getInstructor().subscribe(instructors=>{
    //   this.intructors=instructors;
    //   console.log(this.intructors);

      this.courseSubscription=this.courseService.getCourse().subscribe(courses=>{
        this.courses=courses;
  
        // var n=this.courses.length;
        // var rows,col,c=0;
        // $(".content").remove();
  
        // if(n%4==0){
        //   rows=n/4;
        // }else{
        //   rows=Math.floor(n/4+1);
        // }
  
        // for(var i=0;i<rows;i++){
        //   $("#grids").append("<div id='row"+i+"' class='row content'></div>");
        //   if(n-c>=4){
        //     col=4;
        //   }else{
        //     col=n-c;
        //   }
  
        //   for(var j=0;j<col;j++){

        //     $("#row"+i).append("<div id='"+this.courses[c].id+"' class='col-md-3 courses' ><a href='course-details/"+this.courses[c].id+"' >              <div class='card course-card'>                <img class='card-img-top' src="+this.courses[c].image+" width='100%' height='150px' alt='Card image cap'>                <div class='card-block'>                  <h4 class='card-title'>"+this.courses[c].name+"</h4>                                   <span class='item' id='rating"+c+"' >                                        </span>                                  </div> <div class='card-footer' style='padding-right:0;' >  <span style=' float:right; background-color:#11a15d; color:white; padding-left:15px;padding-right:10px; ' class=' item'><span style='font-size:20px;' >₹</span><strong style='font-size:18px;' >"+this.courses[c].price_offer+"</strong> </span> <span class='text-success' style='text-decoration:line-through; padding-right:10px; float:right;' ><span style='font-size:20px;' >₹</span><span style='font-size:18px;' >"+this.courses[c].price_actual+"</span></span> </div>            </div>            </a></div>");
            
        //     c++;
            
        //   }
  
        // }
  
      });

    firebase.firestore().collection("courses").get().then(querySnapshot=>{
      querySnapshot.forEach(doc=>{
      });
    });

    firebase.firestore().collection("banners").get().then(querySnapshot=>{
      querySnapshot.forEach(doc=>{
        this.banners.push(doc.data().url);
      });
    });

    this.courseBundleSubscription=this.courseBundleService.getCourseBundle().subscribe(courseBundles=>{
      this.courseBundles=courseBundles;

      // var n=this.courseBundles.length;
      //   var rows,col,c=0;
      //   $(".content-bundle").remove();
  
      //   if(n%4==0){
      //     rows=n/4;
      //   }else{
      //     rows=Math.floor(n/4+1);
      //   }
  
      //   for(var i=0;i<rows;i++){
          
      //     if(c<=12){
      //       $("#grids-bundle").append("<div id='row-bundle"+i+"' class='row content-bundle'></div>");
      //     if(n-c>=4){
      //       col=4;
      //     }else{
      //       col=n-c;
      //     }
  
      //     for(var j=0;j<col;j++){
            
            
            

      //       $("#row-bundle"+i).append("<div id='"+this.courseBundles[c].id+"' class='col-md-4 col-lg-3 col-sm-2 courses' ><a href='course-bundle-details/"+this.courseBundles[c].id+"' >              <div class='card course-card'>                <img class='card-img-top' src="+this.courseBundles[c].image+" width='100%' height='150px' alt='Card image cap'>                <div class='card-block'>                  <h4 class='card-title'>"+this.courseBundles[c].name+"</h4>                                                                    </div> <div class='card-footer' style='padding-right:0;' > <span id='courses"+this.courseBundles[c].id+"' class='text-muted' style='float:left'> </span> <span style=' float:right; background-color:#11a15d; color:white; padding-left:15px;padding-right:10px; ' class=' item'><span style='font-size:20px;' >₹</span><strong style='font-size:18px;' >"+this.courseBundles[c].price_offer+"</strong> </span> <span class='text-success' style='text-decoration:line-through; padding-right:10px; float:right;' ><span style='font-size:20px;' >₹</span><span style='font-size:18px;' >"+this.courseBundles[c].price_actual+"</span></span> </div>            </div>            </a></div>");
      //       this.getCourseLength(this.courseBundles[c].id);
            
      //       c++;
            
      //     }
      //     }
  
      //   }

    });

  }

  ngAfterViewInit(){
    // var sr = ScrollReveal();
    // sr.reveal('.fooReveal', { container: '.container-fluid' });
  }

  ourDesc(n:number){
    $("#modal-"+n).modal("toggle");
  }

  slideCarousel(slide:string){
    $("#banner-carousel").carousel(slide);
  }

  getCourseLength(id:string){
    firebase.firestore().doc("course_bundle/"+id).collection("courses").get().then(querySnapshot=>{
      if(querySnapshot.size==1){
        $("#courses"+id).text(querySnapshot.size+" Course");
      }else{
        $("#courses"+id).text(querySnapshot.size+" Courses");
      }
    });
  }

  showModal(id:string){
    $('#'+id).modal('show');
  }
  
  closeModal(id:string){
    $('#'+id).modal('hide');
  }
  
  ngOnDestroy(){
    if(this.courseSubscription){
      this.courseSubscription.unsubscribe();
    }
    if(this.instructorSubscription){
      this.instructorSubscription.unsubscribe();
    }
    if(this.ratingSubscription){
      this.ratingSubscription.unsubscribe();
    }
    if(this.courseBundleSubscription){
      this.courseBundleSubscription.unsubscribe();
    }
  }


}