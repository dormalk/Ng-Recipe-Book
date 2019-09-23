import { HttpClient, HttpRequest } from '@angular/common/http';

import * as RecipeActions from './recipe.actions';
import * as fromRecipe from './recipe.reducers';

import { Recipe } from '../recipe.model';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom } from 'rxjs/Operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';


@Injectable()
export class RecipeEffects {
    @Effect()
    recipesFetch = this.actions$
    .pipe(ofType(RecipeActions.FETCH_RECIPES))
    .pipe(switchMap((action: RecipeActions.FetchRecipes) => {
        return this.httpClient.get<Recipe[]>('https://ng-recipe-book-95ce4.firebaseio.com/recipes.json',{
            observe: 'body',
            responseType: 'json'
        })
    }),map(
        (recipes: Recipe[]) => {
            console.log(recipes);
            for(let recipe of recipes){
                if(!recipe['ingredients']){
                    recipe['ingredients'] = []
                }
            }
            return {
                type: RecipeActions.SET_RECIPES,
                payload: recipes
            }
        }
    ))

    @Effect({dispatch: false})
    storeRecipes = this.actions$
        .pipe(ofType(RecipeActions.STORE_RECIPES),
            withLatestFrom(this.store.select('recipes')),
            switchMap(([action,state]) => {
            console.log('statestatestatestatestate');
            const req = new HttpRequest('PUT', 'https://ng-recipe-book-95ce4.firebaseio.com/recipes.json',
            state['recipes'], { reportProgress: true });
            return this.httpClient.request(req);
        }))

    constructor(private httpClient: HttpClient,
                private actions$: Actions,
                private store: Store<fromRecipe.FeatureState>) {}
}