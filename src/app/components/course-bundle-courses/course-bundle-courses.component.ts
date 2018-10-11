import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase';

import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';

import { Course } from '../../models/course';

import { Subscription } from 'rxjs/Subscription';

declare var $:any;

@Component({
  selector: 'app-course-bundle-courses',
  templateUrl: './course-bundle-courses.component.html',
  styleUrls: ['./course-bundle-courses.component.css']
})
export class CourseBundleCoursesComponent implements OnInit {
  courses:Course[];

  courseSubscription:Subscription;
  sub:Subscription

  courseBundleId:string;

  loading:boolean;

  constructor(private courseService:CourseService, private authService:AuthService, private route:ActivatedRoute) {
    this.loading=true;
   }

  ngOnInit() {

    this.sub=this.route.parent.params.subscribe(params=>{
      this.courseBundleId=params['id'];
    });
    
    this.courseSubscription=this.courseService.getCourse().subscribe(courses=>{
      this.courses=new Array();
      courses.forEach(course=>{
        firebase.firestore().doc("course_bundle/"+this.courseBundleId+"/courses/"+course.id).get().then(doc=>{
          
          if(doc.exists){
            this.courses.push(course);

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

            $("#row"+i).append("<div id='"+this.courses[c].id+"' class='col-md-3 courses' ><a href='course-details/"+this.courses[c].id+"' >              <div class='card course-card'>                <img class='card-img-top' src="+this.courses[c].image+" width='100%' height='150px' alt='Card image cap'>                <div class='card-block'>                  <h4 class='card-title'>"+this.courses[c].name+"</h4>                                   <span class='item' id='rating"+c+"' >                                        </span>                                  </div> <div class='card-footer' style='padding-right:0;' > <span style=' float:right; background-color:#11a15d; color:white; padding-left:15px;padding-right:10px; ' class=' item'><span style='font-size:20px;' >₹</span><strong style='font-size:18px;' >"+this.courses[c].price_offer+"</strong> </span> <span class='text-success' style='text-decoration:line-through; padding-right:10px; float:right;' ><span style='font-size:20px;' >₹</span><span style='font-size:18px;' >"+this.courses[c].price_actual+"</span></span> </div>            </div>            </a></div>");
            
            c++;
            
          }
  
        }

          }
        });
      });
      this.loading=false;
    });
      
      

    

  }

  ngOnDestroy(){
    if(this.courseSubscription){
      this.courseSubscription.unsubscribe();
    }
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

}
