import { Component, OnInit } from '@angular/core';

import { WebsiteContact } from '../../models/website-contact';

import * as firebase from 'firebase';

declare var $:any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  contact:WebsiteContact;
  constructor() { 
    this.contact={
      
    }
  }

  ngOnInit() {
    firebase.firestore().doc("settings/contact").get().then(doc=>{
      this.contact.address=doc.data().address;
      $("#address").html(this.contact.address);
      this.contact.email=doc.data().email;
      this.contact.phone=doc.data().phone;
    });
  }

}
