import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {MatIconRegistry, MatDialogRef} from '@angular/material';
 
@Component({
  selector: 'app-opening-dialog',
  templateUrl: './opening-dialog.component.html',
  styleUrls: ['./opening-dialog.component.css']
})
export class OpeningDialogComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<OpeningDialogComponent>) { }

  ngOnInit() {
  }

  closeDialog(){
    this.dialogRef.close();
  }

  openPlayStore(){
    window.location.replace("https://play.google.com/store/apps/details?id=com.gmonetix.bankerspoint");
  }

}
