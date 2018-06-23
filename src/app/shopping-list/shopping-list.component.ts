import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/model/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [];
  constructor() { }

  ngOnInit() {
    this.ingredients = [
      new Ingredient(0, 'Salt', 2),
      new Ingredient(1, 'Sugar', 2),
      new Ingredient(2, 'Chicken', 1),
      new Ingredient(3, 'wheat', 0.5),
      new Ingredient(4, 'oil', 1),
      new Ingredient(5, 'potatos', 5)
    ];
  }

  addIngredient(ingredient: Ingredient){
    ingredient.id = this.ingredients[this.ingredients.length-1].id + 1;
    this.ingredients.push(ingredient);
  }

  updateIngredient(ingredient: Ingredient) {
    var selectedIngredient: Ingredient = this.ingredients.find((i) => i.id === ingredient.id);
    selectedIngredient = ingredient;
  }

  updateIngredientList(ingredient: Ingredient){
    if (!ingredient.id)
        this.addIngredient(ingredient);
    else
        this.updateIngredient(ingredient);
  }

  removeIngredient(id: number) {
    var indexOfEltToRemove = this.ingredients.indexOf(
      this.ingredients.find((i) => i.id === id)
    );
    this.ingredients.splice(indexOfEltToRemove, 1);
  }

  /* Editing is not possible this way as we need to send
   data from here to edit component that is child component */
}
