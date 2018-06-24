import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredient } from '../../shared/model/ingredient.model';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  private ingredientEditEventSubscription: Subscription;
  
  @ViewChild('ingredientForm') ingredientForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    console.log(this.ingredientForm.value.amount);
    this.ingredientEditEventSubscription = this.shoppingListService.editIngredientEvent
        .subscribe((ingredient: Ingredient) => {
          this.ingredientForm.setValue({
            id: ingredient.id,
            name: ingredient.name,
            amount: ingredient.amount
          });
        });
  }

  ngOnDestroy(){
    this.ingredientEditEventSubscription.unsubscribe();
  }

  onUpdateIngredientList(){
    var name = this.ingredientForm.value.name;
    var amount = +this.ingredientForm.value.amount;
    var id = this.ingredientForm.form.value.id !== "" && this.ingredientForm.value.id !== null
                                 ? +this.ingredientForm.value.id: null;
    this.shoppingListService.updateIngredientList(
      new Ingredient(id, name, amount)
    );
    
    this.ingredientForm.reset();
  }

}
