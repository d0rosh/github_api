import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  email: string;
  password: string;
  typeForm: string = 'login';
  errorMsg: string = '';
  visibleSpinner: boolean = false;
  subscriptions: Subscription[] = [];
  constructor(
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.route.queryParams.subscribe(params => {
        if (params['form'] === 'register') {
          this.typeForm = 'register';
        } else {
          this.typeForm = 'login';
        }
        this.errorMsg = '';

        if (params['accessDenied']) {
          setTimeout(() => {
            this.toastrService.error('Access denied to the page!');
          }, 0);
        }
      })
    );
  }

  submit() {
    if (this.typeForm === 'login') {
      this.login();
    } else {
      this.signup();
    }
  }

  signup() {
    this.visibleSpinner = true;
    this.subscriptions.push(
      this.authService.signup(this.email, this.password).subscribe(
        res => {
          this.router.navigate(['/blocks']);
        },
        err => {
          this.errorMsg = err.message;
          this.visibleSpinner = false;
        }
      )
    );
    this.email = this.password = '';
  }

  login() {
    this.visibleSpinner = true;
    this.subscriptions.push(
      this.authService.login(this.email, this.password).subscribe(
        res => {
          this.router.navigate(['/blocks']);
        },
        err => {
          this.errorMsg = err.message;
          this.visibleSpinner = false;
        }
      )
    );
    this.email = this.password = '';
  }

  signInGithub() {
    this.authService.githubSignin().then(res => {
      this.router.navigate(['/blocks']);
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
