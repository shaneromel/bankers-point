import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
 
@Component({
  selector: 'app-quicklinks',
  templateUrl: './quicklinks.component.html',
  styleUrls: ['./quicklinks.component.css']
})
export class QuicklinksComponent implements OnInit {
  sub:Subscription;
  id:string;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.sub=this.route.params.subscribe(params=>{
      this.id=params['id'];
    });
  }

}
