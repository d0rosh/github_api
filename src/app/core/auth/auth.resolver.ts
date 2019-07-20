import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of, merge } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { reject } from 'q';

@Injectable()
export class AuthResolver implements Resolve<any> {
  constructor(private firebaseAuth: AngularFireAuth) {}

  resolve(): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      this.firebaseAuth.authState.subscribe(res => resolve(res));
    });
  }
}
