import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StudentService } from '../../services/student.service';
import { AuthService } from '../../services/auth.service';
import { CourseService } from '../../services/course.service';
import { InstructorService } from '../../services/instructor.service';

import { Student } from '../../models/student';
import { Course } from '../../models/course';
import { MyCourse } from '../../models/mycourses';
import { Rating } from '../../models/rating';
import { Instructor } from '../../models/instructor';

import * as firebase from 'firebase';

import { Subscription } from 'rxjs/Subscription';


declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private sub:Subscription;
  id:string;
  studentSubscription:Subscription;
  courseSubscription:Subscription;
  myCoursesSubscription:Subscription;
  ratingSubscription:Subscription;
  instructorSubscription:Subscription;

  students:Student[];
  courses:Course[];
  myCourses:MyCourse[];
  ratings:Rating[];
  instructors:Instructor[]

  student:Student={
    bio:"",
    email:"",
    image:"",
    name:"",
    phone:"",
    id:"",
    wishlist:new Array()
  };

  editSuccess:boolean=false;

  user:any;

  oldPass:string;
  newPass:string;
  passConfirm:string;

  loading:boolean;

  constructor(private route:ActivatedRoute, private studentService:StudentService, private authService:AuthService, private courseService:CourseService, private instructorService:InstructorService) { 
    this.loading=true;
    this.courses=new Array();
  }

  ngOnInit() {
    this.sub=this.route.parent.params.subscribe(params=>{
      this.id=params['id'];
    });

    this.studentSubscription=this.studentService.getStudent().subscribe(students=>{
      this.students=students;
      for(var i=0;i<this.students.length;i++){
        if(this.students[i].id===this.id){
          this.student=this.students[i];
        }
      }

      var progress=$("#dp-upload-progress");
      var choosePic=$("#choose-pic");
      var dpURL;

      choosePic.on("change",e=>{
        var file=e.target.files[0];
        var storageRef=firebase.storage().ref("profiles/"+file.name);
        var uploadTask=storageRef.put(file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,snapshot=>{
          var percentage=(uploadTask.snapshot.bytesTransferred/uploadTask.snapshot.totalBytes)*100;
          progress.attr("style","width:"+percentage+"%");
          progress.text(Math.floor(percentage)+"%");
          $("#update-btn").attr("class","btn btn-primary disabled");
        },err=>{
          alert(err);
        },()=>{
          dpURL=uploadTask.snapshot.downloadURL;
          progress.attr("class","progress-bar bg-success");
          this.student.image=dpURL;
          $("#update-btn").attr("class","btn btn-primary");
        });
      });

      this.myCoursesSubscription=this.studentService.getStudentCourses(this.student.id).subscribe(mycourses=>{

        this.instructorSubscription=this.instructorService.getInstructor().subscribe(instructors=>{

          

        });

      });
      this.loading=false;
    });

  }

  changePassword(){
      this.authService.afAuth.auth.onAuthStateChanged(user=>{
        if(user){
          this.user=user;
          if(this.newPass!=""&&this.oldPass!=""&&this.passConfirm!=""&&this.newPass==this.passConfirm){
          this.authService.changePassword(this.oldPass,this.newPass);
          }else{
            alert("error");
          }
        }
      });
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

  editProfile(){
    this.studentService.addStudent(this.student);
  }

  ngOnDestroy(){
    if(this.studentSubscription){
      this.studentSubscription.unsubscribe();
    }
    if(this.myCoursesSubscription){
      this.myCoursesSubscription.unsubscribe();
    }
    if(this.courseSubscription){
      this.courseSubscription.unsubscribe();
    }
    if(this.ratingSubscription){
      this.ratingSubscription.unsubscribe();
    }
    if(this.instructorSubscription){
      this.instructorSubscription.unsubscribe();
    }
  }

}
