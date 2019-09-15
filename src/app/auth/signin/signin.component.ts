import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  // source: string;

  // constructor(private authService: AuthService, private router: Router) {
  //   if (this.router.getCurrentNavigation() != null &&
  //       this.router.getCurrentNavigation().extras.state !== undefined) {
  //     this.source = this.router.getCurrentNavigation().extras.state.source;
  //   }
  // }

  constructor(private store: Store<fromApp.AppState>){}

  ngOnInit() {
  }

  // onSignin(form: NgForm) {
  //   const { email, password } = form.value;
  //   this.authService.signinUser(email, password, this.source);
  // }

  onSignin(form:NgForm){
    const {email,password} = form.value;
    this.store.dispatch(new AuthActions.TrySignin({username:email,password}));
  }
}
