import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as firebase from 'firebase';

import { CourseBundleService } from '../../services/course-bundle.service';
import { AuthService } from '../../services/auth.service';

import { CourseBundle } from '../../models/coursebundle';

import { Subscription } from 'rxjs/Subscription';

declare var $:any;

@Component({
  selector: 'app-course-bundle-details',
  templateUrl: './course-bundle-details.component.html',
  styleUrls: ['./course-bundle-details.component.css']
})
export class CourseBundleDetailsComponent implements OnInit {
  sub:Subscription;
  courseBundleSubscription:Subscription;

  courseBundleId:string;

  courseBundle:CourseBundle;
  myCourseBundles:string[];

  isSubscribed:boolean;

  couponCode:string;
  couponApplied:boolean;
  origPrice:number;
  price:number;
  validityChoice:number;

  index:number;
  discount:number;

  constructor(private courseBundleService:CourseBundleService, private route:ActivatedRoute, private authService:AuthService, private router:Router) {
    this.couponApplied=false;
    this.myCourseBundles=new Array();
   }

  ngOnInit() {
    this.sub=this.route.params.subscribe(params=>{
      this.courseBundleId=params['id'];
    });

    this.courseBundleSubscription=this.courseBundleService.getCourseBundle().subscribe(courseBundles=>{
      courseBundles.forEach(courseBundle=>{
        if(courseBundle.id===this.courseBundleId){
          this.courseBundle=courseBundle;
        }
      });
      
      this.authService.afAuth.auth.onAuthStateChanged(user=>{
        if(user){
          firebase.firestore().doc("students/"+user.uid+"/my_course_bundles/"+this.courseBundleId).get().then(doc=>{
            if(doc.exists){
              this.isSubscribed=true;
            }else{
              this.isSubscribed=false;
            }
          });
        }
      });
    });

  }

  applyCode(){
    if(!this.couponApplied){
      firebase.firestore().collection("coupon-codes").where("code","==",this.couponCode).get().then(querySnapshot=>{
        var coupon;
        querySnapshot.forEach(doc=>{
          coupon=doc.data();
        });
        this.courseBundle.validities=this.courseBundle.validities.map(a=>{
          a.price=a.price-a.price*coupon.discount/100;
          return a;
        })

        this.discount=coupon.discount;
        $("#coupon-error").hide();
        this.couponApplied=true;
      }).catch(()=>{
        $("#coupon-error").show();
      })
    }
  }

  pay(index:number){
    this.index=index;
    this.price=this.couponApplied ? this.courseBundle.validities[index].price-this.courseBundle.validities[index].price*this.discount/100 : this.courseBundle.validities[index].price;
    this.validityChoice=this.courseBundle.validities[index].validity;
    this.authService.afAuth.auth.onAuthStateChanged(user=>{
      if(user){
        var purpose=this.courseBundle.name;
        if(purpose.length>29){
          purpose=purpose.substring(0,29);
        }

        var validity=this.courseBundle.validities.filter(a=>a.validity==this.validityChoice)[0];

        window.location.replace("https://bankerspoint.org/payment.php?purpose="+purpose+"&amount="+this.price+"&email="+user.email+"&course_id="+this.courseBundle.id+"&type=bundle&validity="+validity.validity);
      }else{
        this.router.navigate(['/signin']);
      }
    })
  }

  validitySelected(index:number){
    this.index=index;
    this.price=this.courseBundle.validities[index].price;
    this.validityChoice=this.courseBundle.validities[index].validity;
  }

  cancelCoupon(){
    firebase.firestore().doc("course_bundle/"+this.courseBundle.id).get().then(doc=>{
      this.courseBundle.validities=doc.data().validities;
      this.couponApplied=false;
    })
  }

  ngOnDestroy(){
    if(this.courseBundleSubscription){
      this.courseBundleSubscription.unsubscribe();
    }
  }

}
