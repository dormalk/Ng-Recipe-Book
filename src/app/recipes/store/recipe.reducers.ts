import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState{
    recipes: State
}


export interface State {
    recipes: Recipe[]
}

const initialState: State = {
    recipes: [
        new Recipe('A Test Recipe',
        'This is a Test Recipe',
        'https://shewearsmanyhats.com/wp-content/uploads/2014/09/mushroom-florentine-pasta-5b.jpg',
        [new Ingredient('Linguini', 1), new Ingredient('Mushrooms', 2), new Ingredient('Milk', 1)]),
    new Recipe('More One Recipe',
        'Description of the new Recipe',
        'https://realhousemoms.com/wp-content/uploads/Honey-Butter-Chicken-IG.jpg',
        [new Ingredient('Chicken', 3), new Ingredient('Chili souce', 1)])
    ]
}

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch(action.type){
        case (RecipeActions.SET_RECIPES):
            return{
                ...state,
                recipes: [...action.payload]
            }
        case (RecipeActions.ADD_RECIPE):
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case (RecipeActions.UPDATE_RECIPE):
            const recipe = state.recipes[action.payload.index];
            const updatedRecipe = {
                ...recipe,
                ...action.payload.updatedRecipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updatedRecipe;
            return{
                ...state,
                recipes
            };
        case (RecipeActions.DELETE_RECIPE):
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: oldRecipes
            }
        default:
            return {
                ...state
            }
    }
}