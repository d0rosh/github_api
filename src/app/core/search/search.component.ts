import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnDestroy {
  search: string = '';
  visibleSpinner: boolean = false;
  subscription: Subscription;
  @Output() getResult: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) {}

  searchUser() {
    this.getResult.emit([]);
    this.visibleSpinner = true;
    this.subscription = this.http
      .get(`https://api.github.com/search/users?q=${this.search}&per_page=20`)
      .subscribe(
        res => {
          this.getResult.emit(res);
          this.search = '';
        },
        () => null,
        () => {
          this.visibleSpinner = false;
        }
      );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
