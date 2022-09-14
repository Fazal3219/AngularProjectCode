import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http:HttpClient,
    private recipeService:RecipeService) { }

    storeRecipes(){
      const recipes= this.recipeService.getRecipes();
      this.http.put("https://ng-recipe-book-ca90c-default-rtdb.firebaseio.com/recipes.json",recipes).subscribe( response=>{
        console.log(response);
      });
    }
    fetchRecipes(){
     return this.http.get<Recipe[]>("https://ng-recipe-book-ca90c-default-rtdb.firebaseio.com/recipes.json")
      .pipe(map( recipes => {
        return recipes.map(_recipe => {
          return{..._recipe, ingredients: _recipe.ingredients ? _recipe.ingredients: []};
        });
      }),
      tap( recipes =>
        {
          this.recipeService.setRecipes(recipes);
        }
      ))
      // .subscribe(recipes =>{
       
      // });
    }
}
