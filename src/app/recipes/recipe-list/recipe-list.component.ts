import { Component, OnInit, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import {  Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipeState: Observable<fromRecipe.State>;
  // subscription: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromRecipe.FeatureState>) { }

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
    // this.recipes = this.recipeService.getRecipes();
    // this.subscription = this.recipeService.recipesChanged
    // .subscribe((recipes:Recipe[])=>{
    //   console.log(recipes)
    //   this.recipes=recipes;
    // })
  }

  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo: this.route});
  }

  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }

}
