import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    
    @NgModule({
 bootstrap:[
 AppComponent,
 AppComponent],

        imports:[
 BrowserModule.withServerTransition({appId: 'app-mobile-app'}),
 
 AppModule,
 
 BrowserModule.withServerTransition({appId: 'app-root'}),
 
 AppModule,
 
        ]
    })
    export class AppBrowserModule {}
    