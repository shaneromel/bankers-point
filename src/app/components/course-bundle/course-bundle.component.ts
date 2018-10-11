import { Component, OnInit, Input } from '@angular/core';
import { CourseBundle } from '../../models/coursebundle';

@Component({
  selector: 'app-course-bundle',
  templateUrl: './course-bundle.component.html',
  styleUrls: ['./course-bundle.component.css']
})
export class CourseBundleComponent implements OnInit {
  @Input() courseBundle:CourseBundle;

  constructor() { }

  ngOnInit() {
  }

}
