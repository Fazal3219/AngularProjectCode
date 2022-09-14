import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from 'src/app/share/data-storage.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit,OnDestroy {
  recipes: Recipe[] = [];
  subscripition: Subscription = new Subscription;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,private dataStorageServices: DataStorageService
  ) {}
  

  ngOnInit() {
     this.subscripition = this.recipeService.recipeChanged.subscribe(
        (recipes:Recipe[]) =>{
      this.recipes =recipes;
        }
    )
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'],{relativeTo:this.route});
  }

  ngOnDestroy(): void {
    this.subscripition.unsubscribe();
  }
  onSaveData(){
   
    this.dataStorageServices.storeRecipes();
    alert("recipes saved successfuly");
  }
  onFetchData(){
    this.dataStorageServices.fetchRecipes().subscribe();

  }
}
