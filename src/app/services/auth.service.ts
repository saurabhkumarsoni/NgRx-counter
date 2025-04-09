import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthResponseData } from '../models/authResponseData.model';
import { RegisterUser, User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { autoLogout } from '../auth/state/auth.action';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeoutInterval: any;
  private API_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`;

  constructor(private http: HttpClient, private store: Store) {}

  login(email: string, password: string): Observable<AuthResponseData> {
    debugger;
    const requestBody = { email, password, returnSecureToken: true };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http
      .post<AuthResponseData>(this.API_URL, requestBody, { headers })
      .pipe(
        catchError((errorResp) => {
          const errorCode = errorResp?.error?.error?.message || 'UNKNOWN_ERROR';
          console.error('errResp Error:', errorCode);

          return throwError(() => errorCode); // ✅ Throw error as a string, not an Error object
        })
      );
  }

  signUp(email: string, password: string): Observable<AuthResponseData> {
    const requestBody = { email, password, returnSecureToken: true };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`,
        requestBody,
        { headers }
      )
      .pipe(
        catchError((errorResp) => {
          const errorCode = errorResp?.error?.error?.message || 'UNKNOWN_ERROR';
          return throwError(() => errorCode);
        })
      );
  }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const user = new User(
      data.email,
      data.idToken,
      data.localId,
      expirationDate
    );
    return user;
  }

  getErrorMessage(errorCode: string): string {
    console.log('error code', errorCode);
    switch (errorCode) {
      case 'INVALID_LOGIN_CREDENTIALS':
        return 'Invalid email or password. Please try again.';
      case 'EMAIL_NOT_FOUND':
        return 'No account found with this email.';
      case 'USER_DISABLED':
        return 'This account has been disabled. Contact support.';
      case 'INVALID_PASSWORD':
        return 'Incorrect password. Please try again.';
      case 'EMAIL_EXISTS':
        return 'Email already exists';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));

    this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todaysDate;

    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(autoLogout());
      //logout functionality or get the refresh token
    }, timeInterval);
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate);
      const user = new User(
        userData.email,
        userData.token,
        userData.localId,
        expirationDate
      );
      this.runTimeoutInterval(user);
      return user;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('userData');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }
}
