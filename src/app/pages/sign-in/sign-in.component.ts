import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  username: any = null;
  password: any = null;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    if (window.localStorage.getItem("outlet") != null || window.localStorage.getItem("outlet") != undefined) {
      window.location.pathname = '/'
    }
  }

  handleInput(e: any, inputType: any) {
    switch (inputType) {
      case 'username':
        this.username = e.target.value;
        break;
      case 'password':
        this.password = e.target.value;
        break;
    }
  }

  handleLogin() {
    console.log(this.username, this.password);
    this.http.post<any>('https://6eir4x970g.execute-api.us-east-1.amazonaws.com/dev/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe(data => {
      console.log(data)
      window.localStorage.setItem("table", data.data.tableName);
      window.localStorage.setItem("outlet", data.data.username);
      window.location.pathname = '/'
    }, err => {
      console.log("error")
      console.log(err)
      window.alert("Wrong username or password")
    })
  }

}
