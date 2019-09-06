import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducers';


@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('A Test Recipe',
            'This is a Test Recipe',
            'https://shewearsmanyhats.com/wp-content/uploads/2014/09/mushroom-florentine-pasta-5b.jpg',
            [new Ingredient('Linguini', 1), new Ingredient('Mushrooms', 2), new Ingredient('Milk', 1)]),
        new Recipe('More One Recipe',
            'Description of the new Recipe',
            'https://realhousemoms.com/wp-content/uploads/Honey-Butter-Chicken-IG.jpg',
            [new Ingredient('Chicken', 3), new Ingredient('Chili souce', 1)])
    ];

    constructor(private authService: AuthService,
                private store: Store<fromShoppingList.AppState>) {

    }

    getRecipes() {
        return this.recipes.slice();
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipe(index: number) {
        return this.recipes.slice()[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        // this.slService.addNewIngredients(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        if (this.authService.isAuthenticated()) {
            this.recipes[index] = newRecipe;
            this.recipesChanged.next(this.recipes.slice());
        }
    }

    deleteRecipe(index: number) {
        if (this.authService.isAuthenticated()) {
            this.recipes.splice(index, 1);
            this.recipesChanged.next(this.recipes.slice());
        }
    }
}
