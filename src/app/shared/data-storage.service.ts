import {Injectable} from '@angular/core'
import {Http} from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService{

    
    constructor(
                private http:Http, 
                private recipeService: RecipeService,
                private authService: AuthService){}

    storeRecipes(){
        const token = this.authService.getToken();
        return this.http.put('https://ng-recipe-book-95ce4.firebaseio.com/recipes.json?auth='+token, 
            this.recipeService.getRecipes())
    }

    getRecipes(){
        const token = this.authService.getToken();

        this.http.get('https://ng-recipe-book-95ce4.firebaseio.com/recipes.json?auth='+token)
        .subscribe((response)=>{
            const recipes:Recipe[] = response.json();
            this.recipeService.setRecipes(recipes);
        });
    }
}