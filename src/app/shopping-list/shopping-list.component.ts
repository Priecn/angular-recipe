import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/model/ingredient.model';
import { ShoppingListService } from './services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  constructor(private shoppingListService: ShoppingListService) { }
  private listChangeEventSubscription: Subscription;

  ngOnInit() {
    this.ingredients = this.shoppingListService.getAllIngredients();
    this.listChangeEventSubscription = this.shoppingListService.ingredientListChanged
        .subscribe((ingredientList: Ingredient[]) => {
          this.ingredients = ingredientList;
        });
  }

  ngOnDestroy(){
    this.listChangeEventSubscription.unsubscribe();
  }

  removeIngredient(id: number) {
    this.shoppingListService.removeIngredient(id);
  }

  editIngredient(ingredient: Ingredient) {
    this.shoppingListService.emitEditIngredientEvent(ingredient);
  }
  /* Editing is not possible this way as we need to send
   data from here to edit component that is child component */
}
