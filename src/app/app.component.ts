import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loadedFeature = 'recipe';

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyBNWy6sKGs7vLKHpD83KFnaTjN_kmuQSl0",
      authDomain: "ng-recipe-book-95ce4.firebaseapp.com",
    })
  }
  onNavigate(feature: string){
    this.loadedFeature = feature;
  }
}
