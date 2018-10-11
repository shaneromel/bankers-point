import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe, NgStyle } from '@angular/common';

import { Course } from '../../models/course';
import { Section } from '../../models/section';
import { Instructor } from '../../models/instructor';
import { Rating } from '../../models/rating';

import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth.service';
import { InstructorService } from '../../services/instructor.service';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import * as firebase from 'firebase';

import { MatTabsModule } from '@angular/material/tabs';

import { NgModule } from '@angular/core';
import { MatDialog } from '@angular/material';

declare var $,Instamojo:any;

@NgModule({
  imports: [
    MatTabsModule
  ]
})

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  id:string;
  private sub:Subscription;
  private courses:Course[];
  course:Course;
  subscription_course:Subscription;
  data_keys:any[][];
  public sections:Section[];
  subscription_section:Subscription;
  courseInstructor:Instructor;
  subscription_intructor:Subscription;
  instructors:Instructor[];
  subscription_rating:Subscription;
  ratings:Rating[];

  ratingExact:number;
  videos:number;

  rating:number[];
  rating_void:number[];
  looper:number[];
  avgRatings:Style[];

  isSubscribed:boolean;
  isFree:boolean;

  couponCode:string;
  couponApplied:boolean;
  originalPrice:number;
  progressWidth:string;
  days:number;

  inWishlist:boolean;
  isLoggedIn:boolean;

  validity:number;
  validityChoice:number;
  price:number;

  index:number;
  discount:number;
  
  constructor(private route:ActivatedRoute, private courseService:CourseService, private authService:AuthService, private instructorService:InstructorService, private router:Router, private dialog:MatDialog) {
    this.couponApplied=false;
    this.avgRatings=new Array();
    this.videos=0;
    this.isSubscribed=false;
    this.ratingExact=0;
    authService.afAuth.auth.onAuthStateChanged(user=>{
      if(user){
        this.isLoggedIn=true;
      }else{
        this.isLoggedIn=false;
      }
    });
  }

  ngOnInit() {
    this.sub=this.route.params.subscribe(params=>{
      this.id=params['id'];
    });

    this.subscription_course=this.courseService.getCourseById(this.id).subscribe(course=>{
      this.course=course;
      this.authService.afAuth.auth.onAuthStateChanged(user=>{
        if(user){
          firebase.firestore().doc("students/"+user.uid+"/my_courses/"+this.id).get().then(doc=>{
            if(doc.exists){
              this.validity=doc.data().validity;
              this.isSubscribed=true;
              var dateDiff=Date.now()-doc.data().date;
              this.days=(((dateDiff/60000))/60)/24;
              this.progressWidth=Math.floor((this.days/this.validity*100)).toString()+"%";
            }
          });

          // firebase.firestore().doc("students/"+user.uid).onSnapshot(doc=>{
          //   var flag=0;
          //   if(doc.exists){
          //     doc.data().wishlist.forEach(id=>{
          //       if(id===this.id){
          //         flag++;
          //       }
          //     })
          //     if(flag>0){
          //       this.inWishlist=true;
          //     }else{
          //       this.inWishlist=false;
          //     }
          //   }else{
          //     this.inWishlist=false;
          //   }
          // })

        }
      });

    });

    firebase.firestore().doc("courses/"+this.id).collection("rating").get().then(querySnapshot=>{
      var s=0;
      querySnapshot.forEach(doc=>{
        s=s+doc.data().rating;
      });
      if(s>0){
        this.ratingExact=s/querySnapshot.size;
      }
      this.rating=Array(Math.floor(this.ratingExact)).fill(1);
      this.rating_void=Array(5-Math.floor(this.ratingExact)).fill(1);
    });

    this.loop();

  }

  openDialog(validityDialog){
    this.dialog.open(validityDialog,
      {
        width:"500px"
      });
  }

  loop(){
    this.looper=new Array();
    for(var i=0;i<5;i++){
      this.looper.push(i+1);
    }
  }

  validitySelected(index:number){
    this.price=this.course.validities[index].price;
    this.validityChoice=this.course.validities[index].validity;
    this.index=index;
  }

  display(){
    console.log(this.authService.isLoggedIn());
  }

  toggleWishlist(){
    this.authService.afAuth.auth.onAuthStateChanged(user=>{
      if(user){
        firebase.firestore().doc("students/"+user.uid).get().then(querySnapshot=>{
          if(querySnapshot.exists){
            var wishlist=querySnapshot.data().wishlist;
            var index=wishlist.indexOf(this.id);
            if(index!=-1){
              wishlist.splice(index,1);
              firebase.firestore().doc("students/"+user.uid).update({
                wishlist:wishlist
              })
            }else{
              wishlist.push(this.id);
              firebase.firestore().doc("students/"+user.uid).update({
                wishlist:wishlist
              })
            }
          }
        })
      }
    })
  }

  ngOnDestroy(){
    if(this.subscription_course){
      this.subscription_course.unsubscribe();
    }
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

  applyCode(){
    var c=0;
    if(!this.couponApplied){
      this.originalPrice=this.course.price_offer;
      firebase.firestore().collection("coupon-codes").get().then(querySnapshot=>{
        querySnapshot.forEach(doc=>{
          if(doc.data().code===this.couponCode){
            this.discount=doc.data().discount;
            this.course.validities=this.course.validities.map(a=>{
              a.price=a.price-a.price*this.discount/100;
              return a;
            })
            this.couponApplied=true;
            $("#coupon-invalid").hide();
            c++;
          }
        });
        if(c==0){
          $("#coupon-invalid").show();
        }
      });
    }
  }

  pay(index){
    this.price=this.couponApplied ? this.course.validities[index].price-this.course.validities[index].price*this.discount/100 : this.course.validities[index].price;
    this.validityChoice=this.course.validities[index].validity;
    this.index=index;
    this.authService.afAuth.auth.onAuthStateChanged(user=>{
      if(user){
        var validity=this.course.validities.filter(a=> a.validity==this.validityChoice)[0];
        var purpose=this.course.name;
        if(purpose.length>29){
          purpose=purpose.substring(0,29);
        }
        window.location.replace("https://bankerspoint.org/payment.php?purpose="+purpose+"&amount="+this.price+"&email="+user.email+"&course_id="+this.course.id+"&type=course&validity="+validity.validity);
      }else{
        this.router.navigate(['/signin']);
      }
    })
  }

  cancelCoupon(){
    firebase.firestore().doc("courses/"+this.course.id).get().then(doc=>{
      this.course.validities=doc.data().validities;
      this.couponApplied=false;
    })
  }

}

interface Style{
  width ? :string
}