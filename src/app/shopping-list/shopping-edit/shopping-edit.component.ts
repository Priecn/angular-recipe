import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredient } from '../../shared/model/ingredient.model';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('hiddenIdInput') idRef: ElementRef;
  @ViewChild('nameInput') nameRef: ElementRef;
  @ViewChild('amountInput') amountRef: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListService.editIngredientEvent
        .subscribe((ingredient: Ingredient) => {
          this.idRef.nativeElement.value = ""+ingredient.id;
          this.nameRef.nativeElement.value = ingredient.name;
          this.amountRef.nativeElement.value = ""+ingredient.amount;
        });
  }

  onUpdateIngredientList(){
    var name = this.nameRef.nativeElement.value;
    var amount = this.amountRef.nativeElement.value;
    var tempId = this.idRef.nativeElement.value ? +this.idRef.nativeElement.value: undefined;
    this.shoppingListService.updateIngredientList(
      new Ingredient(tempId, name, +amount)
    );
    this.nameRef.nativeElement.value = "";
    this.amountRef.nativeElement.value = "";
  }

}
