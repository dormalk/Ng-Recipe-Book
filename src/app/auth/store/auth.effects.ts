import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import * as AuthActions from './auth.actions';
import { map, switchMap, mergeMap } from 'rxjs/Operators';
import { from } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class AuthEffects{
    @Effect()
    authSignup = this.actions$
        .pipe(ofType(AuthActions.TRY_SIGNUP))
        .pipe(map((action: AuthActions.TrySignup) => {
            return action.paylad;
        }),switchMap((authData: {username: string, password:string})=>{
            return from(firebase.auth().createUserWithEmailAndPassword(authData.username,authData.password));
        }),switchMap(() => {
            return from(firebase.auth().currentUser.getIdToken())
        }),map((token: string)=>{
            return {
                    type: AuthActions.SIGNUP,
                    payload: token
            }
        }));
    
    @Effect()
    authSignin = this.actions$
    .pipe(ofType(AuthActions.TRY_SIGNIN))
    .pipe(map((action: AuthActions.TrySignin) => {
        return action.paylad;
    }),switchMap((authData: {username:string,password:string})=>{
        return from(firebase.auth().signInWithEmailAndPassword(authData.username,authData.password))
    }),switchMap(() => {
        return from(firebase.auth().currentUser.getIdToken())
    }),map((token:string)=>{
        this.router.navigate(['/']);
        return {
                type: AuthActions.SIGNIN,
                payload: token
            }
    }))

    constructor(private actions$: Actions, private router: Router){}
}
