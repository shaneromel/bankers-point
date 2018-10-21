import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.css']
})
export class UpdatesComponent implements OnInit {

  updates:any[];

  constructor() {

   }

  ngOnInit() {
    firebase.firestore().collection("updates").get().then(querySnapshot=>{
      this.updates=new Array();
      querySnapshot.forEach(doc=>{
        var d=doc.data() as any;
        d.id=doc.id;
        this.updates.push(d);
      })
    })
  }

}
