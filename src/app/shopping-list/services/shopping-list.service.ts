import { Ingredient } from "../../shared/model/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {

    ingredientListChanged = new Subject<Ingredient[]>();
    editIngredientEvent = new Subject<Ingredient>();

    private ingredients: Ingredient[] = [
        /*new Ingredient(0, 'Salt', 2),
        new Ingredient(1, 'Sugar', 2),
        new Ingredient(2, 'Chicken', 1),
        new Ingredient(3, 'wheat', 0.5),
        new Ingredient(4, 'oil', 1),
        new Ingredient(5, 'potatos', 5)*/
    ];

    getAllIngredients(): Ingredient[]{
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        if (this.ingredients.length === 0)
            ingredient.id = 0;
        else
            ingredient.id = this.ingredients[this.ingredients.length-1].id + 1;
        this.ingredients.push(ingredient);
    }

    updateIngredient(ingredient: Ingredient) {
        var ingredientToChange: Ingredient = this.ingredients.find((i) => i.id === ingredient.id);
        ingredientToChange.name = ingredient.name;
        ingredientToChange.amount = ingredient.amount;
    }

    updateIngredientList(ingredient: Ingredient){
        if (ingredient.id === undefined)
            this.addIngredient(ingredient);
        else
            this.updateIngredient(ingredient);
        this.emitIngredientChangeEvent();
    }

    removeIngredient(id: number) {
        var indexOfEltToRemove = this.ingredients.indexOf(
          this.ingredients.find((i) => i.id === id)
        );
        this.ingredients.splice(indexOfEltToRemove, 1);
        this.emitIngredientChangeEvent();
    }

    private emitIngredientChangeEvent(){
        this.ingredientListChanged.next(this.ingredients.slice());
    }

    emitEditIngredientEvent(ingredient: Ingredient){
        this.editIngredientEvent.next(ingredient);
    }
    
}