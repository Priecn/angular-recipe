import { Recipe } from "../models/recipe.model";
import { Ingredient } from "../../shared/model/ingredient.model";
import { Subject } from "rxjs";

export class RecipeService {

    recipeListUpdatedEvent = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(0, 'Tandoori Chicken', 'Grilled Chicken',
                     'http://via.placeholder.com/500x300', 5,
                    [
                        new Ingredient(0, 'Chicken', 1),
                        new Ingredient(1, 'Curd', 1),
                        new Ingredient(2, 'Salt', 2),
                        new Ingredient(3, 'Spices', 3)
                    ]),
        new Recipe(1, 'Grilled Fish', 'Grilled Fish',
                     'http://via.placeholder.com/500x300', 5,
                     [
                        new Ingredient(0, 'Fish', 1),
                        new Ingredient(1, 'Garlic', 2),
                        new Ingredient(2, 'Salt', 2),
                        new Ingredient(3, 'Spices', 3)
                    ]),
        new Recipe(2, 'Chicken Curry', 'Chicken with grevy',
                     'http://via.placeholder.com/500x300', 3,
                     [
                        new Ingredient(0, 'Chicken', 1),
                        new Ingredient(1, 'Onion', 4),
                        new Ingredient(2, 'Salt', 2),
                        new Ingredient(3, 'Spices', 3),
                        new Ingredient(3, 'Ginger', 0.5)
                    ])
    ];

    setRecipes(recipes: Recipe[]) {
         this.recipes = recipes;
         this.emitRecipeListUpdatedEvent();
    }
    
    getAllRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    getRecipeById(id: number) {
        return this.recipes.find((recipe: Recipe) => recipe.id === id);
    }

    private addRecipe(recipe: Recipe): number{
        console.log(recipe.ratings);
        let index = this.recipes.length;
        recipe.id = index;
        this.recipes.push(recipe);
        return index;
    }

    private updateRecipe(recipe: Recipe){
        let tempRecipe = this.recipes.find((r: Recipe) => r.id === recipe.id);
        tempRecipe.name = recipe.name;
        tempRecipe.description = recipe.description;
        tempRecipe.imagePath = recipe.imagePath;
        tempRecipe.ratings = recipe.ratings;
        tempRecipe.ingredients = recipe.ingredients;
    }

    updateRecipeList(recipe: Recipe): number{
        let index = recipe.id;
        if(recipe.id === null)
            index =  this.addRecipe(recipe);
        else
            this.updateRecipe(recipe);
        this.emitRecipeListUpdatedEvent();
        return index;
    }

    deleteRecipe(id: number) {
        let index: number = this.recipes.findIndex((recipe: Recipe) => recipe.id === id);
        this.recipes.splice(index, 1);
        this.emitRecipeListUpdatedEvent();
    }

    private emitRecipeListUpdatedEvent(){
        this.recipeListUpdatedEvent.next(this.recipes.slice());
    }
}