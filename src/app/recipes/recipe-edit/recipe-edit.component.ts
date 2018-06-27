import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../services/recipe.service';
import { Ingredient } from '../../shared/model/ingredient.model';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  recipeId: number;
  editMode: boolean;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.editMode = false;

    this.route.params.subscribe(
      (params: Params) => {
        this.recipeId = params['id'] !== undefined ? +params['id'] : null;
        this.editMode =this.recipeId != null;
        this.initForm();
      }
    );
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.recipeId);
      //console.log(recipe);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe.ingredients.length > 0) {
        recipe.ingredients.forEach((ingredient: Ingredient) => {
          recipeIngredients.push(
            new FormGroup({
              'id': new FormControl(ingredient.id),
              'name': new FormControl(ingredient.name, [Validators.required]),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.min(1)])
            })
          );
        });
      }
    }
    console.log(this.recipeId);
    if(!this.editMode) {
      recipeIngredients.push(
        new FormGroup({
          'id': new FormControl(0),
          'name': new FormControl(null, [Validators.required]),
          'amount': new FormControl(null, [Validators.required, Validators.min(1)]),
        })
      );
    }
    
    this.recipeForm = new FormGroup({
      'id': new FormControl(this.recipeId),
      'name': new FormControl(recipeName, [Validators.required]),
      'imagePath': new FormControl(recipeImagePath, [Validators.required]),
      'description': new FormControl(recipeDescription, [Validators.required]),
      'ingredients': recipeIngredients
    });
  }

  onEditRecipeLIst(){
    console.log(this.recipeForm);
    let ingredients: Ingredient[] = [];
    (<FormArray>this.recipeForm.get('ingredients'))
                    .controls
                    .forEach((ingredientCrl: FormControl) => {
                        ingredients.push(
                          new Ingredient(+ingredientCrl.get('id').value,
                                          ingredientCrl.get('name').value,
                                          +ingredientCrl.get('amount').value)
                        );
                    });

    console.log(this.recipeForm.get('id').value);

    let recipeId = this.recipeForm.get('id').value === null
                   || this.recipeForm.get('id').value === undefined
                   || this.recipeForm.get('id').value === ''
                   ? null : +this.recipeForm.get('id').value;

    let recipeName = this.recipeForm.get('name').value;
    let recipeImagePath = this.recipeForm.get('imagePath').value;
    let recipeDescription = this.recipeForm.get('description').value;
    let tempRecipe = new Recipe(recipeId, recipeName, recipeDescription, recipeImagePath, Math.floor(Math.random()*5),  ingredients);
    console.log(tempRecipe);
    let returnedIndex: number = this.recipeService.updateRecipeList(tempRecipe);

    this.recipeForm.reset();
    if(recipeId === null)
      this.router.navigate(['../',returnedIndex], {relativeTo: this.route});
    else
      this.router.navigate(["../"], {relativeTo: this.route});
  }

  onAddIngredient() { 
    let index = (<FormArray>this.recipeForm.get('ingredients')).length;
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'id': new FormControl(index),
        'name': new FormControl(null, [Validators.required]),
        'amount': new FormControl(null, [Validators.required, Validators.min(1)]),
      })
    );
  }

  removeIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCacelChange() {
    this.recipeForm.reset();
    this.router.navigate(["../"], {relativeTo: this.route});
  }
}
