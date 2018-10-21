import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../models/course';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Input() course:Course;
  url:string;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe(url=>{
      this.url=url[0].path
    })
  }

}
