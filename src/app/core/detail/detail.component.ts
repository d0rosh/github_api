import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {
  user: any;
  subscription: Subscription;
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.subscription = this.http
      .get(
        `https://api.github.com/users/${this.route.snapshot.params['login']}`
      )
      .subscribe(user => {
        console.log(user);
        this.user = user;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
