import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../../shared/model/ingredient.model';
import { ShoppingListService } from '../../shopping-list/services/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  addIngredientToShoppingList(ingredient: Ingredient) {
    this.shoppingListService.addIngredient(ingredient);
  }

  addAllIngredientsToShoppingList(ingredients: Ingredient[]){
    ingredients.forEach((ingredient: Ingredient) => {
      this.addIngredientToShoppingList(ingredient);
    });
  }
}
