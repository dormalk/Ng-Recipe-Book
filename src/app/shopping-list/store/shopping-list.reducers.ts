import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

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
                ingrediants: [...state.ingrediants, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingrediants: [...state.ingrediants, ...action.payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENTS:
            const ingredient = state.ingrediants[state.editedIngredientIndex];
            const updateIngredient = {
                ...ingredient,
                ...action.payload
            };
            const ingrediants = [...state.ingrediants];
            ingrediants[state.editedIngredientIndex] = updateIngredient;
            return {
                ...state,
                ingrediants,
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        case ShoppingListActions.DELETE_INGREDIENTS:
            const oldIngredients = [...state.ingrediants];
            oldIngredients.splice(state.editedIngredientIndex, 1);
            return{
                ...state,
                ingrediants: oldIngredients,
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredient: {...state.ingrediants[action.payload]},
                editedIngredientIndex: action.payload
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        default:
            return {...state};
    }
}
