import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit() {
  }

  test(){
    var body={
      content:"regiested successfully",
      address:"shaneromelkujur@gmail.com",
      subject:"Welcome to Bankers Point"
    }
    this.http.post("https://bankerspoint.org/mail.php", body).subscribe(response=>{
      console.log(response);
    })
  }

}
