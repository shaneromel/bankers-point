import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { CourseService } from './services/course.service';
import { StudentService } from './services/student.service';
import { InstructorService } from './services/instructor.service';
import { CategoryService } from './services/category.service';
import { CourseBundleService } from './services/course-bundle.service';
import { MyCoursesService } from './services/my-courses.service';

import { environment } from '../environments/environment.prod';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import {MatCardModule} from '@angular/material/card';

import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CoverComponent } from './components/cover/cover.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { FooterComponent } from './components/footer/footer.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CourseListingsComponent } from './components/course-listings/course-listings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ExploreCoursesComponent } from './components/explore-courses/explore-courses.component';
import { ClassroomComponent } from './components/classroom/classroom.component';
import { LectureVideoComponent } from './components/lecture-video/lecture-video.component';
import { CourseOverviewComponent } from './components/course-overview/course-overview.component';
import { CurriculumComponent } from './components/curriculum/curriculum.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';
import { OfferedCoursesComponent } from './components/offered-courses/offered-courses.component';
import { CourseBundleDetailsComponent } from './components/course-bundle-details/course-bundle-details.component';
import { CourseBundleOverviewComponent } from './components/course-bundle-overview/course-bundle-overview.component';
import { CourseBundleCoursesComponent } from './components/course-bundle-courses/course-bundle-courses.component';

import{ LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { MobileAppComponent } from './components/mobile-app/mobile-app.component';
import { QuicklinksComponent } from './components/quicklinks/quicklinks.component';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { OpeningDialogComponent } from './components/opening-dialog/opening-dialog.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ErrorPaymentComponent } from './components/error-payment/error-payment.component';
import { CourseComponent } from './components/course/course.component';
import { CourseBundleComponent } from './components/course-bundle/course-bundle.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ToastrModule } from 'ngx-toastr';

const router:Routes=[
  {
    path:'mobile-app', component:MobileAppComponent  
  },
  {
    path:'signin', component:SignInComponent
  },
  {
    path:'', redirectTo:'cover', pathMatch:'full'
  },
  {
    path:'cover', component:CoverComponent
  },
  {
    path:'signup', component:SignUpComponent
  },
  {
    path:'course-details/:id', component:CourseDetailsComponent,
    children:[
      {
        path:'', redirectTo:'overview', pathMatch:'full'
      },
      {
        path:'overview', component:CourseOverviewComponent
      },
      {
        path:'curriculum', component:CurriculumComponent
      },
      {
        path:'reviews', component:ReviewsComponent
      }
    ]
  },
  {
    path:'course-listings', canActivate:[AuthGuard], component:CourseListingsComponent
  },
  {
    path:'explore-courses/:category', component:ExploreCoursesComponent
  },
  {
    path:'classroom/:course-id', canActivate:[AuthGuard], component:ClassroomComponent,
    children:[
      {
        path:'lecture/:section-id/:lecture-id', component:LectureVideoComponent
      }
    ]
  },
  {
    path:'quicklink/:id', component:QuicklinksComponent
  },
  {
    path:'dashboard/:id', component:DashboardComponent,
    children:[
      {
        path:'my-courses', component:MyCoursesComponent
      },
      {
        path:'wishlist', component:WishlistComponent
      },
      {
        path:'', redirectTo:'my-courses', pathMatch:"full"
      },
      {
        path:'offered-courses', component:OfferedCoursesComponent
      },
      {
        path:'profile', component:ProfileComponent
      },
    ]
  },
  {
    path:'course-bundle-details/:id', component:CourseBundleDetailsComponent,
    children:[
      {
        path:'', redirectTo:'overview', pathMatch:"full"
      },
      {
        path:'overview', component:CourseBundleOverviewComponent
      },
      {
        path:'courses', component:CourseBundleCoursesComponent
      }
    ]
  },
  {
    path:'error-payment', component:ErrorPaymentComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    NavbarComponent,
    CoverComponent,
    SignUpComponent,
    FooterComponent,
    CourseDetailsComponent,
    CourseListingsComponent,
    ProfileComponent,
    ExploreCoursesComponent,
    ClassroomComponent,
    LectureVideoComponent,
    CourseOverviewComponent,
    CurriculumComponent,
    ReviewsComponent,
    MobileAppComponent,
    QuicklinksComponent,
    DashboardComponent,
    MyCoursesComponent,
    OfferedCoursesComponent,
    CourseBundleDetailsComponent,
    CourseBundleOverviewComponent,
    CourseBundleCoursesComponent,
    OpeningDialogComponent,
    ErrorPaymentComponent,
    CourseComponent,
    CourseBundleComponent,
    WishlistComponent
  ],
  entryComponents:[
    OpeningDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    
    FormsModule,
    RouterModule.forRoot(router,{useHash:true}),
    AngularFireAuthModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.circleSwish,
      backdropBackgroundColour: 'white', 
      backdropBorderRadius: '4px',
      primaryColour: '#1ed88b',
      secondaryColour: '#1ed88b', 
      tertiaryColour: '#1ed88b'
    }),
    Ng2DeviceDetectorModule.forRoot(),
    Ng2PageScrollModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthService, AuthGuard, CourseService, StudentService, InstructorService, CategoryService, CourseBundleService, MyCoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
