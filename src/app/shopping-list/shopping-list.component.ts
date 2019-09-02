import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  // ingredients: Ingredient[];
  shoppingListState: Observable<{ingrediants: Ingredient[]}>;
  private subscription: Subscription;

  constructor(private shppoingListService: ShoppingListService,
              private store: Store<{shoppingList: {ingrediants: Ingredient[]}}>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
    // this.ingredients = this.shppoingListService.getIngredients();
    // this.subscription = this.shppoingListService.ingredientsChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  onEditItem(index: number) {
    this.shppoingListService.startedEditing.next(index);
  }
}
