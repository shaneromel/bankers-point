import { Component } from '@angular/core';

import { Ng2DeviceService } from 'ng2-device-detector';

declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  message;

  constructor(private deviceService:Ng2DeviceService){
    
  }

  ngOnInit(){

    // if(this.deviceService.device==="android"){
    //   window.location.replace("https://bankerspoint.org/app");
    // }
  }

}
