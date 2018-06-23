import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Output() recipeSelectedEvent = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  createRatingArray(n: number): any[]{
    return Array(n);
  }

  onRecipeClicked(){
    this.recipeSelectedEvent.emit();
  }
}
