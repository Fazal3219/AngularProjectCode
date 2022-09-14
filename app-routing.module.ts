import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildrenOutletContexts, Route, RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { startWith } from 'rxjs';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { CreateRecipeComponent } from './recipes/create-recipe/create-recipe.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';


const appRoutes:Routes=[
    {path:'', redirectTo:'/recipes/0',pathMatch:'full'},
    
    {path:'recipes', component:RecipesComponent, children:[
        { path:'', component:RecipeStartComponent},
        {path:'new',component:CreateRecipeComponent},
        {path:'new',component:RecipeEditComponent},
        {path:':id', component:RecipesDetailComponent,resolve:[RecipesResolverService]},
       
        {path:':id/edit',component:RecipeEditComponent,resolve:[RecipesResolverService]},
       
    ]},
    {path:'shopping-list', component:ShoppingListComponent},
    
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
