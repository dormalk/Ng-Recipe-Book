import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { SheredModule } from '../shared/shered.module';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeEditComponent,
        RecipeItemComponent,
        RecipeStartComponent,
        RecipeListComponent,
        RecipeDetailComponent,
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RecipesRoutingModule,
        SheredModule
    ]
})
export class RecipesModule {}
