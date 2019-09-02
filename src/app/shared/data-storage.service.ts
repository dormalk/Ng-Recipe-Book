import {Injectable} from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable()
export class DataStorageService {

    constructor(
                private httpClient: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService) {}

    // storeRecipes() {
    //     const token = this.authService.getToken();
    //     const params = new HttpParams().set('auth', token);
    //     // return this.httpClient.put('https://ng-recipe-book-95ce4.firebaseio.com/recipes.json',
    //     //     this.recipeService.getRecipes(), {
    //     //         observe: 'body',
    //     //         params
    //     //     });

    //     const req = new HttpRequest('PUT', 'https://ng-recipe-book-95ce4.firebaseio.com/recipes.json',
    //     this.recipeService.getRecipes(), { reportProgress: true, params});

    //     return this.httpClient.request(req);
    // }

    storeRecipes() {
        const req = new HttpRequest('PUT', 'https://ng-recipe-book-95ce4.firebaseio.com/recipes.json',
        this.recipeService.getRecipes(), { reportProgress: true });

        return this.httpClient.request(req);
    }


    // getRecipes() {
    //     const token = this.authService.getToken();
    //     const params = new HttpParams().set('auth', token);
    //     this.httpClient.get<Recipe[]>('https://ng-recipe-book-95ce4.firebaseio.com/recipes.json?', {
    //         observe: 'body',
    //         responseType: 'json',
    //         params
    //     })
    //     .subscribe((recipes: Recipe[]) => {
    //         this.recipeService.setRecipes(recipes);
    //     });
    // }


    getRecipes() {
        this.httpClient.get<Recipe[]>('https://ng-recipe-book-95ce4.firebaseio.com/recipes.json?', {
            observe: 'body',
            responseType: 'json'
        })
        .subscribe((recipes: Recipe[]) => {
            this.recipeService.setRecipes(recipes);
        });
    }
}
