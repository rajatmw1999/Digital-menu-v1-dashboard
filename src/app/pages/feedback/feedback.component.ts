import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  feedbackList: any = []
  loading = true

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    if (window.localStorage.getItem("outlet") == null || window.localStorage.getItem("outlet") == undefined) {
      window.location.pathname = '/sign-in'
    }

    this.http.post<any>('https://6eir4x970g.execute-api.us-east-1.amazonaws.com/dev/user/feedback/get', {}).subscribe((data: any) => {
      // console.log(data);
      this.feedbackList = data.data.feedback
      this.loading = false
      // console.log(this.categoryList)
      this.loading = false
    })
  }

}
