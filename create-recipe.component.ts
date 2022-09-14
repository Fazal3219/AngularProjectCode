import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {
  recipeForm!: FormGroup;
  constructor(private route:ActivatedRoute,
    private recipeService:RecipeService,
    private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      // this.id=+params['id'],
      // this.editmode=params['id'] != null;
      this.initForm();
    });

  }
  private initForm(){
    let recipeName='';
    let recipeImagePath='';
    let recipeDescripition='';
    let recipeIngredients = new FormArray([]);

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
        'imagePath': new FormControl(recipeImagePath,Validators.required),
        'descripition': new FormControl(recipeDescripition,Validators.required),
        'ingredients':recipeIngredients
      });
}
onSubmit(){
  const newRecipe = new Recipe(this.recipeForm.value['name'],this.recipeForm.value['descripition'],this.recipeForm.value['imagePath'],this.recipeForm.value['ingredient']);
  this.recipeService.addRecipe(newRecipe);
  this.recipeForm.reset();
  
}
onCancel(){
  this.router.navigate(['../'],{relativeTo:this.route});
}
}
