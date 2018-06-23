import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/model/ingredient.model';
import { ShoppingListService } from './services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [];
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getAllIngredients();
    this.shoppingListService.ingredientListChanged
        .subscribe((ingredientList: Ingredient[]) => {
          this.ingredients = ingredientList;
        });
  }

  removeIngredient(id: number) {
    this.shoppingListService.removeIngredient(id);
    this.shoppingListService.ingredientListChanged
        .subscribe((ingredientList: Ingredient[]) => {
          this.ingredients = ingredientList;
        });
  }

  editIngredient(ingredient: Ingredient) {
    this.shoppingListService.emitEditIngredientEvent(ingredient);
  }
  /* Editing is not possible this way as we need to send
   data from here to edit component that is child component */
}
