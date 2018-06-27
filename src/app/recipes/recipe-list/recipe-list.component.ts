import { Component, OnInit, OnDestroy} from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../services/recipe.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  private recipeLisbtUpdatedEventSubscriber: Subscription;

  constructor(private recipeService: RecipeService,
              private router: ActivatedRoute,
              private route: Router) { }

  ngOnInit() {
    this.recipes = this.recipeService.getAllRecipes();
    this. recipeLisbtUpdatedEventSubscriber = this.recipeService.recipeListUpdatedEvent.subscribe(
      (recipes: Recipe[]) => {
          this.recipes = recipes;
      });
  }

  ngOnDestroy() {
    this.recipeLisbtUpdatedEventSubscriber.unsubscribe();
  }

  onClickAddRecipe() {
    this.router.params.subscribe(
      (params: Params) => {
        this.route.navigate(['new'], {relativeTo: this.router});
      }
    );
  }
}
