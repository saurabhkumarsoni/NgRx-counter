import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthResponseData } from '../models/authResponseData.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponseData> {
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
    console.log('error code', errorCode)
    switch (errorCode) {
      case 'INVALID_LOGIN_CREDENTIALS':
        return 'Invalid email or password. Please try again.';
      case 'EMAIL_NOT_FOUND':
        return 'No account found with this email.';
      case 'USER_DISABLED':
        return 'This account has been disabled. Contact support.';
      case 'INVALID_PASSWORD':
        return 'Incorrect password. Please try again.';
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }
}
