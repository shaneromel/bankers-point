import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { Section } from 'src/app/models/section';

@Component({
  selector: 'app-demo-lectures',
  templateUrl: './demo-lectures.component.html',
  styleUrls: ['./demo-lectures.component.css']
})
export class DemoLecturesComponent implements OnInit {

  sections:Section[];

  constructor(private route:ActivatedRoute, private courseService:CourseService) { }

  ngOnInit() {
    this.route.parent.params.subscribe(params=>{
      this.courseService.getSection(params['id']).subscribe(sections=>{
        this.sections=sections;
      })
    })
  }

}
