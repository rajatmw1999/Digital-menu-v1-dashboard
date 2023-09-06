import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  handleSignout() {
    window.localStorage.removeItem("table");
    window.localStorage.removeItem("outlet");
    window.location.pathname = '/sign-in'
  }

  deployMenu() {
    if (confirm("Are you sure you want to deploy the current changes") == true) {
      
    }
  }

}
