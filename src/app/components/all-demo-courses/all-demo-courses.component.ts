import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { forkJoin } from 'rxjs';
import * as firebase from 'firebase';

@Component({
  selector: 'app-all-demo-courses',
  templateUrl: './all-demo-courses.component.html',
  styleUrls: ['./all-demo-courses.component.css']
})
export class AllDemoCoursesComponent implements OnInit {

  lectures:any[];

  constructor(private courseService:CourseService) { }

  ngOnInit() {
    // firebase.firestore().collection("courses").get().then(courses=>{
    //   var promises1=new Array();
    //   var promises2;
    //   courses.forEach(course=>{
    //     promises1.push(firebase.firestore().collection("courses/"+course.id+"/section").get());
    //   });

    //   forkJoin(promises1).subscribe(sectionCollections=>{
    //     sectionCollections.forEach(sections=>{
    //       console.log(sections._originalQuery.path.segments[1]);
    //       promises2=new Array();
    //       sections.forEach(section=>{
    //         promises2.push(firebase.firestore().collection("courses/"+sections._originalQuery.path.segments[1]+"/section/"+section.id+"/lecture").where("is_demo","==",true).get());
    //       })
    //       forkJoin(promises2).subscribe(lectureCollections=>{
    //         lectureCollections.forEach(lectures=>{
    //           console.log(lectures);
    //         })
    //       })
    //     })
    //   })

    // })
    this.courseService.getCourse().subscribe(courses=>{
      this.lectures=new Array();
      courses.forEach(course=>{
        this.courseService.getSection(course.id).subscribe(sections=>{
          sections.forEach(section=>{
            this.courseService.getDemoLectures(course.id, section.id).subscribe(lectures=>{
              lectures.forEach(lecture=>{
                var data={
                  image:course.image,
                  title:lecture.title,
                  course_id:course.id,
                  lecture_id:lecture.id,
                  section_id:section.id
                }
                this.lectures.push(data);
              })
            })
          })
        })
      })
    })
  }

}
