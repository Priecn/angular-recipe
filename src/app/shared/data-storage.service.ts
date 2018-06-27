import { Injectable } from "@angular/core";
import  { Http, Response } from '@angular/http';
import { RecipeService } from "../recipes/services/recipe.service";
import { Recipe } from "../recipes/models/recipe.model";
import { map } from 'rxjs/operators';
@Injectable()
export class DataStorageService {
    
    constructor(private http: Http,
                private recipeService: RecipeService) {}

    storeRecipes() {
        return this.http.put('https://ng-recipe-book-1c5b3.firebaseio.com/recipe.json',
                      this.recipeService.getAllRecipes());
    }

    getRecipes(){
        this.http.get('https://ng-recipe-book-1c5b3.firebaseio.com/recipe.json')
                .pipe(map(
                    (response: Response) => {
                        const recipes: Recipe[] = response.json();
                        recipes.forEach(
                            (recipe: Recipe) => {
                                if(!recipe['ingredients']){
                                    recipe['ingredients'] = [];
                                }
                            }
                        );
                        return recipes;
                    }
                ))
                .subscribe(
                    (recipes: Recipe[]) => {
                        this.recipeService.setRecipes(recipes);
                    }
                );
    }
}