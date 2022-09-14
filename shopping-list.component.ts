import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from '../share/ingredient.module';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit , OnDestroy{
  ingredients: Ingredient[] = [];
  private igChangeSub: Subscription = new Subscription;
  editedItemIndex!: number;

  constructor(private slService:ShoppingListService) { }
  

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
   this.igChangeSub = this.slService.ingredientChanged.subscribe(
      (ingredients:Ingredient[]) =>{
        this.ingredients=ingredients;
      }
    )
  }
  onEditItem(index:number){
    this.slService.startedEditing.next(index);

  }
  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    // this.onClear();
  }
  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
  

}
