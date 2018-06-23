import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../../shared/model/ingredient.model';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('hiddenIdInput') idRef: ElementRef;
  @Output() updateIngredientListEvent = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  onUpdateIngredientList(name: HTMLInputElement, amount: HTMLInputElement){
    var tempId = this.idRef ? this.idRef.nativeElement.value : undefined;
    this.updateIngredientListEvent.emit(
      new Ingredient(tempId, name.value, +amount.value)
    );
    name.value = "";
    amount.value = "";
  }

}
