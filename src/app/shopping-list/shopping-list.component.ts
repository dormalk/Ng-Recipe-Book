import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shppoingListService:ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shppoingListService.getIngredients();  
    this.subscription = this.shppoingListService.ingredientsChanged
      .subscribe(
        (ingredients:Ingredient[]) =>{ 
          this.ingredients = ingredients
      });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onEditItem(index:number){
    console.log(index)
    this.shppoingListService.startedEditing.next(index);
  }
}
