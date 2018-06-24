import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../../shared/model/ingredient.model';
import { ShoppingListService } from '../../shopping-list/services/shopping-list.service';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(private shoppingListService: ShoppingListService,
              private recipeService: RecipeService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipeById(this.id);
      }
    );
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
