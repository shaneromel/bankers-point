import { WINDOW } from '@ng-toolkit/universal';
import { Component , Inject} from '@angular/core';

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

  constructor(@Inject(WINDOW) private window: Window, private deviceService:Ng2DeviceService){
    
  }

  ngOnInit(){

    // if(this.deviceService.device==="android"){
    //   window.location.replace("https://bankerspoint.org/app");
    // }
  }

}
