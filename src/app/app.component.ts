import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'virtual_menu_dashboard';

  ngOnInit() {
    // if (window.localStorage.getItem("outlet") == null || window.localStorage.getItem("outlet") == undefined) {
    //   window.location.pathname = '/sign-in'
    // }
    // else {
    //   window.location.pathname = '/'
    // }
  }
}
