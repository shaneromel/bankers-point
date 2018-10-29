import { Component, OnInit, Input } from '@angular/core';
import { Section } from 'src/app/models/section';
import { CourseService } from 'src/app/services/course.service';
import { ActivatedRoute } from '@angular/router';
import { Lecture } from 'src/app/models/lecture';

@Component({
  selector: 'app-demo-lecture-item',
  templateUrl: './demo-lecture-item.component.html',
  styleUrls: ['./demo-lecture-item.component.css']
})
export class DemoLectureItemComponent implements OnInit {
  @Input() section:Section;
  lectures:Lecture[];
  courseId:string;

  constructor(private courseService:CourseService, private route:ActivatedRoute) { }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.section){
      this.route.parent.params.subscribe(params=>{
        this.courseId=params['id'];
        this.courseService.getDemoLectures(params['id'], this.section.id).subscribe(lectures=>{
          this.lectures=lectures;
        })
      })
    }
  }

}
