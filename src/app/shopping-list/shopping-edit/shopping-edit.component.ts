import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredient } from '../../shared/model/ingredient.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  private ingredientEditEventSubscription: Subscription;

  ingredientForm: FormGroup;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredientForm = new FormGroup({
      'id': new FormControl(null),
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.min(1)]),
    });

    this.ingredientEditEventSubscription = this.shoppingListService.editIngredientEvent
        .subscribe((ingredient: Ingredient) => {
          /*console.log(ingredient);
          this.ingredientForm.get('id').setValue(""+ingredient.id);
          this.ingredientForm.controls['name'].setValue(ingredient.name);
          this.ingredientForm.controls['amount'].setValue(""+ingredient.amount);*/
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
    var name = this.ingredientForm.controls['name'].value;
    var amount = +this.ingredientForm.controls['amount'].value;
    var id = this.ingredientForm.controls['id'].value !== null ? +this.ingredientForm.controls['id'].value: null;
    /*console.log(id);
    console.log(name);
    console.log(amount);*/
    this.shoppingListService.updateIngredientList(
      new Ingredient(id, name, amount)
    );
    /*this.ingredientForm.controls['id'].setValue(null);
    this.ingredientForm.controls['name'].setValue(null);
    this.ingredientForm.controls['name'].setErrors(null);
    this.ingredientForm.controls['amount'].setValue(null);
    this.ingredientForm.get('amount').setErrors(null);*/
    this.ingredientForm.reset();
  }

}
