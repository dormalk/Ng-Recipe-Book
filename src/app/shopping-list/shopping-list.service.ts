import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService{
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples',5),
        new Ingredient('Bananas',10)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index:number){
        return this.ingredients[index];
    }

    addNewIngredient(ingredient:Ingredient){
        if(!this.ingredients.map(curr => curr.name).includes(ingredient.name)){
            this.ingredients.push(ingredient);
        }
        else {
            this.ingredients.map((curr) => {
                if(curr.name == ingredient.name)
                    curr.amount = (Number(curr.amount) + Number(ingredient.amount))
            })
        }
        this.ingredientsChanged.next(this.ingredients.slice());    
    }

    addNewIngredients(ingredients:Ingredient[]){
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    updateIngredients(index:number,update:Ingredient){
        this.ingredients[index] = update;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}