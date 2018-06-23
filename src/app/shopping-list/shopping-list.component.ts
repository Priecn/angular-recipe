import { Component, OnInit } from '@angular/core';
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
      new Ingredient(0, 'wheat', 0.5),
      new Ingredient(1, 'oil', 1),
      new Ingredient(2, 'potatos', 5)
    ];
  }

}
