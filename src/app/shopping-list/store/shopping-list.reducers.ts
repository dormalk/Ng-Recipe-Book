import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface AppState {
    shoppingList: State;
}

export interface State {
    ingrediants: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}

const initialState: State = {
    ingrediants: [
        new Ingredient('Apples', 5),
        new Ingredient('Bananas', 10)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingrediants, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingrediants, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENTS:
            const ingredient = state.ingrediants[action.payload.index];
            const updateIngredient = {
                ...ingredient,
                ...action.payload.update
            };
            const ingredients = [...state.ingrediants];
            ingredients[action.payload.index] = updateIngredient;
            return {
                ...state,
                ingredients
            };
        case ShoppingListActions.DELETE_INGREDIENTS:
            const oldIngredients = [...state.ingrediants];
            oldIngredients.splice(action.payload, 1);
            return{
                ...state,
                ingredients: oldIngredients
            };
        default:
            return {...state};
    }
}
