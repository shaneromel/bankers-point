import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from '../../services/course.service';

import { Course } from '../../models/course';

import  * as firebase from 'firebase'; 

import { Subscription } from 'rxjs/Subscription';

declare var $:any;

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit {
  sub:Subscription;
  courseSubscription:Subscription;

  courses:Course[];

  student_id:string;
  myCourses:string[];
  loading:boolean;

  constructor(private route:ActivatedRoute, private courseService:CourseService) {
    this.loading=true;
    this.myCourses=new Array();
    
  }

  ngOnInit() {

    var db=firebase.firestore();

    this.sub=this.route.parent.params.subscribe(params=>{
      this.student_id=params['id'];
    });

    db.collection("students").doc(this.student_id).collection("my_courses").get().then(querySnapshot=>{
      querySnapshot.forEach(doc=>{
        this.myCourses.push(doc.id);
      });

      this.courseSubscription=this.courseService.getAllCourses().subscribe(courses=>{
        this.courses=new Array();
        
        this.myCourses.forEach(mycourse=>{
          courses.forEach(course=>{
            if(mycourse===course.id){
              this.courses.push(course);
            }
          });
        });
        
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
  
          
  
      //     //$("#row"+i).append("<div id='"+this.courses[c].id+"' class='col-md-3 courses' ><a href='course-details/"+this.courses[c].id+"' >              <div class='card course-card'>                <img class='card-img-top' src="+this.courses[c].image+" width='100%' height='150px' alt='Card image cap'>                <div class='card-block'>                  <h4 class='card-title'>"+this.courses[c].name+"</h4>                  <span class='card-text item'>"+courseInstructor.name+"</span>                  <span class='item' id='rating"+c+"' >                                        </span>                                  </div>              </div>            </a></div>");
      //     $("#row"+i).append("<div id='"+this.courses[c].id+"' class='col-md-3 courses' ><a href='course-details/"+this.courses[c].id+"' >              <div class='card course-card'>                <img class='card-img-top' src="+this.courses[c].image+" width='100%' height='150px' alt='Card image cap'>                <div class='card-block'>                  <h4 class='card-title'>"+this.courses[c].name+"</h4>                                   <span class='item' id='rating"+c+"' >                                        </span>                                  </div>             </div>            </a></div>");
      //     //this.rateCourse(c);
          
      //     c++;
      //   }
  
      // }
      this.loading=false;
  
      });

    });

    


  }

  ngOnDestroy(){
    if(this.courseSubscription){
      this.courseSubscription.unsubscribe();
    }
  }

}
