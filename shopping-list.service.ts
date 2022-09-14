import {  Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../share/ingredient.module';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing= new Subject<number>();
 private ingredients: Ingredient[]=[
    new Ingredient('apple',5),
    new Ingredient('banana',12),
    new Ingredient('Mango',10),
    new Ingredient('kiv',6)];
 getIngredients(){
  return this.ingredients.slice();
 }

 getIngredient(index:number){
  return this.ingredients[index];
 }

 addIngredients(ingredient:Ingredient){
  this.ingredients.push(ingredient);
  this.ingredientChanged.next(this.ingredients.slice());

 }
  constructor() { }
   addIngredient(ingredients:Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice());

   }

   updateIngredient(index:number,newIngredient:Ingredient){
    this.ingredients[index]= newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
   }
   deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientChanged.next(this.ingredients.slice());

   }

}
