import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase';

import { CourseService } from '../../services/course.service';

import { Subscription } from 'rxjs/Subscription';

import { Section } from '../../models/section';
import { Lecture } from '../../models/lecture';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css']
})
export class CurriculumComponent implements OnInit {
  subscription_section:Subscription;
  lectureSubscription:Subscription;

  sub:Subscription;
  sections:Section[];
  lectures:Lecture[];
  id:string;

  lec:any[];

  public loading:boolean;

  constructor(private courseService:CourseService, private route:ActivatedRoute) {
    this.loading=true;
    this.lec=new Array();
   }

  ngOnInit() {

    this.sub=this.route.parent.params.subscribe(params=>{
      this.id=params['id'];
    });

    this.subscription_section=this.courseService.getSection(this.id).subscribe(sections=>{
      this.sections=sections;

      this.sections.forEach(sec=>{
        this.lectureSubscription=this.courseService.getLecture(this.id, sec.id).subscribe(lectures=>{
          this.lectures=lectures;
          this.lec.push(lectures);
          this.loading=false;
        });

      });

    });
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
    if(this.lectureSubscription){
      this.lectureSubscription.unsubscribe();
    }
  }

}
