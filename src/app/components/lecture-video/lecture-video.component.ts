import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { CourseService } from '../../services/course.service';

import { Subscription } from 'rxjs/Subscription';

import { Lecture } from '../../models/lecture';
 
import * as firebase from 'firebase';
import { HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

declare var $,VdoPlayer,onVdoCipherAPIReady,vdo:any;

@Component({
  selector: 'app-lecture-video',
  templateUrl: './lecture-video.component.html',
  styleUrls: ['./lecture-video.component.css']
})
export class LectureVideoComponent implements OnInit {
  sub:Subscription;
  subCourse:Subscription;
  lectureSubscription:Subscription;
  requestSubscription:Subscription;

  lecture:Lecture;
  lectures:Lecture[];

  sectionId:string;
  lectureId:string;
  courseId:string;

  videoList:string[];
  video:string;

  videoIndex:number;

  videoQuality:string[];
  selectedVideoQuality:string;
  index:number;

  loading:boolean;

  constructor(private route:ActivatedRoute, private courseService:CourseService, private router:Router, private http:HttpClient) {
    this.index=0;
    this.videoList=new Array();
    this.videoIndex=0;
   }

  ngOnInit() {

    this.subCourse=this.route.parent.params.subscribe(params=>{
      this.courseId=params['course-id'];

      firebase.firestore().doc('courses/'+this.courseId).collection("section").get().then(querySnapshot=>{
        querySnapshot.forEach(doc=>{
          firebase.firestore().doc('courses/'+this.courseId+"/section/"+doc.id).collection("lecture").get().then(querySnapshot1=>{
            querySnapshot1.forEach(doc1=>{
              this.videoList.push(doc.id+"/"+doc1.id);
            })
            
          })
        })
      })

    });

    this.sub=this.route.params.subscribe(params=>{
      this.sectionId=params['section-id'];
      this.lectureId=params['lecture-id'];
      this.loading=true;
      this.lectureSubscription=this.courseService.getLecture(this.courseId,this.sectionId).subscribe(lectures=>{
        this.lectures=lectures;
        this.lectures.forEach(lect=>{
          if(lect.id===this.lectureId){
            this.lecture=lect;
            this.video=this.lecture.video;

            this.loadVideo(this.video);
          }
        })
      });
      

    });

    var sectionRef=firebase.firestore().doc('courses/'+this.courseId).collection("section").get().then(querySnapshot=>{
      querySnapshot.forEach(doc=>{
        firebase.firestore().doc('courses/'+this.courseId+'/section/'+doc.id).collection('lecture').get().then(lectures=>{
          lectures.forEach(doc1=>{
            
          });
        });
      });
    });

  }

  ngAfterViewInit(){
    
  }

  loadVideo(video_id:string){
    if(this.requestSubscription){
      this.requestSubscription.unsubscribe();
    }
    var video;

    this.requestSubscription=this.http.get<Otp>("https://bankerspoint.herokuapp.com/video/"+video_id).subscribe(response=>{
      video = new VdoPlayer({
        otp: response.otp,
        playbackInfo: btoa(JSON.stringify({
          videoId: video_id
        })),
        autoplay:true,
        theme: "9ae8bbe8dd964ddc9bdb932cca1cb59a",
      
        container: document.querySelector( "#embedBox" ),
      });
      
      this.videoIndex=this.videoList.indexOf(this.sectionId+"/"+this.lectureId);

      video.addEventListener("ended",()=>{
        if(this.videoIndex<this.videoList.length-1){
          this.videoIndex++;
        
          var section=this.videoList[this.videoIndex].substring(0,this.videoList[this.videoIndex].indexOf('/'));
          var lecture=this.videoList[this.videoIndex].substring(this.videoList[this.videoIndex].indexOf('/')+1);
          this.router.navigate(['../../',section,lecture],{relativeTo:this.route});
        }
      });

      video.addEventListener("load",()=>{
        this.loading=false;
      })
    })

  }

  ngOnDestroy(){
    if(this.lectureSubscription){
      this.lectureSubscription.unsubscribe();
    }
  }

}
interface Otp{
  otp:string
}