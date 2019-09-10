import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

import { Store } from '@ngrx/store';
import { take } from 'rxjs/Operators';

@Injectable()
export class AuthService {
    constructor(private router: Router,
                private store: Store<fromApp.AppState>) {}
    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                firebase.auth().currentUser.getIdToken()
                .then((token: string) => {
                    this.store.dispatch(new AuthActions.Signin(token))
                });
            })
            .catch(error => console.log(error));
    }

    signinUser(email: string, password: string, source: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(response => {
                if (source != null) {
                    this.router.navigate(['/' + source]);
                } else {
                    this.router.navigate(['/']);
                }
                firebase.auth().currentUser.getIdToken()
                    .then((token: string) => {
                        this.store.dispatch(new AuthActions.Signin(token))
                    });
            });
    }

    logout() {
        firebase.auth().signOut();
        this.store.dispatch(new AuthActions.Logout());
    }

    getToken() {
        let token: string;
        this.store.pipe(take(1)).subscribe(state => token = state.auth.token);
        return token;
    }

    isAuthenticated() {
        let isAuthenticated: boolean;
        this.store.pipe(take(1)).subscribe(state => isAuthenticated = state.auth.authenticated);
        return isAuthenticated;
        
    }
}
