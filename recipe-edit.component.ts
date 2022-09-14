import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id!:number;
  editmode=false;
  recipeForm!: FormGroup;
  
  

  constructor(private route:ActivatedRoute,
    private recipeService:RecipeService,
    private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id=+params['id'],
      this.editmode=params['id'] != null;
      this.initForm();
    });

  }

  onSubmit(){
    const newRecipe= new Recipe(this.recipeForm.value['name'],this.recipeForm.value['descripition'],this.recipeForm.value['imagePath'],this.recipeForm.value['ingredient']);
    if(this.editmode){
      this.recipeService.updateRecipe(this.id,newRecipe);
    }else
    {
      this.recipeService.addRecipe(newRecipe);
      
    }
    this.recipeForm.reset();
    this.onCancel();
    
  }

  private initForm(){
    let recipeName='';
    let recipeImagePath='';
    let recipeDescripition='';
    let recipeIngredients = new FormArray([]);

    if(this.editmode){
      const recipe= this.recipeService.getRecipe(this.id);
      recipeName=recipe.name;
      recipeImagePath=recipe.imagePath;
      recipeDescripition=recipe.description;
      // // if( recipe['ingredients']){
      // //   for(let ingredient of recipe.ingredients){
      // //     recipeIngredients.push(
      // //       new FormGroup({
      // //       'name' :new FormControl(ingredient.name),
      // //       'amount' :new FormControl(ingredient.amount)
      // //   }));
      //   }

      // }
      
    }
    this.recipeForm = new FormGroup({
    'name': new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(recipeImagePath,Validators.required),
      'descripition': new FormControl(recipeDescripition,Validators.required),
      'ingredients':recipeIngredients,

    });
  }
 
  onCancel(){
this.router.navigate(['../'],{relativeTo:this.route});

  }
  

}
