import { Recipe } from "../models/recipe.model";
import { Ingredient } from "../../shared/model/ingredient.model";

export class RecipeService {


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

    getAllRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    getRecipeById(id: number) {
        return this.recipes.find((recipe: Recipe) => recipe.id === id);
    }
}