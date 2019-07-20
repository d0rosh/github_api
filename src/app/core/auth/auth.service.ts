import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable, throwError, from } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Profile } from '.';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  isAuth: boolean = false;
  provider = new firebase.auth.GithubAuthProvider();

  constructor(private firebaseAuth: AngularFireAuth) {}

  initCurrentUser(): void {
    this.setAuth(!!localStorage.getItem('isAuth'));
    this.setCurrentUser(localStorage.getItem('user'));
  }

  isAuthenticated(): boolean {
    return !!this.isAuth;
  }

  signup(email: string, password: string): Observable<any> {
    return from(
      this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
    ).pipe(
      tap(({ user }) => {
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('user', JSON.stringify(user));
        this.setAuth(true);
        this.setCurrentUser(user);
      })
    );
  }

  login(email: string, password: string): Observable<any> {
    return from(
      this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
    ).pipe(
      tap(({ user }) => {
        localStorage.setItem('isAuth', 'true');
        localStorage.setItem('user', JSON.stringify(user));
        this.setAuth(true);
        this.setCurrentUser(user);
      })
    );
  }

  githubSignin(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithPopup(this.provider)
        .then(({ user }) => {
          localStorage.setItem('isAuth', 'true');
          localStorage.setItem('user', JSON.stringify(user));
          this.setAuth(true);
          this.setCurrentUser(user);
          resolve(user);
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }

  setAuth(auth: boolean): void {
    this.isAuth = auth;
  }

  setCurrentUser(user: any): void {
    this.user = user;
  }

  getUserProfile(): Profile {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout(): void {
    this.firebaseAuth.auth.signOut();
    this.setCurrentUser(null);
    this.setAuth(false);
    localStorage.clear();
  }

  private _handleError(err: HttpErrorResponse) {
    console.log(err);
    return throwError(err.error.message);
  }
}
