import { Component, OnInit } from '@angular/core';
import { Recipe } from './models/recipe.model';
import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  recipeToLoad: Recipe;
  
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.recipeSelectEvent
        .subscribe((recipe: Recipe) => {
           this.recipeToLoad = recipe;
        });
  }
}
