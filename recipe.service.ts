import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../share/ingredient.module';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeChanged= new Subject<Recipe[]>();
 

 private recipes: Recipe[]=[ 
    new Recipe('French Frice','this is simply a test','https://www.uaex.uada.edu/life-skills-wellness/food-nutrition/eating-well/EFNEP/images/Recipes-Banner.jpg',
    [
      new Ingredient('potato',300),
      new Ingredient('oil',250)
    ]),
    new Recipe('chicken Recipe','1 pound (450g) chicken 250gm chiken gravy masala','https://www.licious.in/blog/wp-content/uploads/2020/12/Roast-Chicken-600x600.jpg',
    [
      new Ingredient('chicken ',250),
      new Ingredient('masala',200)
    ]),
    new Recipe('Paneer Tikika','1 pound (450g) Paneer 250gm paneer gravy masala','https://c.ndtvimg.com/2020-03/5ulc3448_paneer-tikka_625x300_30_March_20.jpg',
    [
      new Ingredient('paneer',250),
      new Ingredient('chille',15),
      new Ingredient('paneer masala',200),
    ])
  ];

// private recipes: Recipe[]=[];
  constructor(private slService:ShoppingListService) { }

  setRecipes(recipes:Recipe[]){
    this.recipes=recipes;
    this.recipeChanged.next(this.recipes.slice());

  }

  getRecipes(){
    return this.recipes.slice();
  }
  getRecipe(index:number){
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients:Ingredient[]){
    this.slService.addIngredient(ingredients);
  }
  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());

  }

  updateRecipe(index:number ,newRecipe:Recipe){
    this.recipes[index]= newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
