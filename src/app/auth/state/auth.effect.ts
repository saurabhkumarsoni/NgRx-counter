import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginStart, loginSuccess, loginFailure } from './auth.action';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {
  setLoadingSpinner,
  setErrorMessage,
} from 'src/app/store/shared/shared.action';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private store: Store<AppState>,
    private router: Router,
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            const user = this.authService.formatUser(data);
            return loginSuccess({ user });
          }),
          catchError((errorResp) => {          
            this.store.dispatch(setLoadingSpinner({ status: false }));
          
            const errorMessage = this.authService.getErrorMessage(errorResp);
                    
            return of(
              setErrorMessage({ message: errorMessage }),
              loginFailure({ error: errorMessage })
            );
          })
          
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () =>{
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) =>{
          this.router.navigate(['/'])
        })
      )
    }, {dispatch: false})


}


