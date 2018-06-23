import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeSelectedEvent = new EventEmitter<Recipe>();

  recipes: Recipe[] = [];

  constructor() { }

  ngOnInit() {
    //console.log(Array(5).fill(0));
    this.recipes = [
      new Recipe(0, 'Tandoori Chicken', 'Grilled Chicken', 'http://via.placeholder.com/500x300', 5),
      new Recipe(1, 'Grilled Fish', 'Grilled Fish', 'http://via.placeholder.com/500x300', 5),
      new Recipe(2, 'Chicken Curry', 'Chicken with grevy', 'http://via.placeholder.com/500x300', 3)
    ];

  }

  onRecipeSelect(recipe: Recipe){
    this.recipeSelectedEvent.emit(recipe);
  }
}
