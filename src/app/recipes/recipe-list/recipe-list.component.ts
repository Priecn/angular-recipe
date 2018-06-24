import { Component, OnInit} from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService,
              private router: ActivatedRoute,
              private route: Router) { }

  ngOnInit() {
    this.recipes = this.recipeService.getAllRecipes();
  }

  onClickAddRecipe() {
    this.router.params.subscribe(
      (params: Params) => {
        this.route.navigate(['new'], {relativeTo: this.router});
      }
    );
  }
}
