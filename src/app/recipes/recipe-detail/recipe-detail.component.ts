import { Component, OnInit,OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as fromRecipe from '../store/recipe.reducers';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/Operators';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<fromRecipe.State>;
  id: number;

  constructor(  private recipeService: RecipeService, 
                private route: ActivatedRoute,
                private router: Router,
                private store: Store<fromRecipe.FeatureState>) { 
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          // this.recipeState = this.recipeService.getRecipe(this.id);
          this.recipeState  = this.store.select('recipes');

        }
    )  
  }

  onAddIngredientsToShoppingList(){
    this.store.select('recipes')
    .pipe(take(1))
    .subscribe((recipeState: fromRecipe.State) =>{
      this.recipeService.addIngredientsToShoppingList(recipeState.recipes[this.id].ingredients);
    });
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id))
    // this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
  }
}
