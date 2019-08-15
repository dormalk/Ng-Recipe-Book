import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SheredModule } from '../shared/shered.module';
import { AppRoutingModule } from '../app-routing.module';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';


@NgModule({
    declarations:[
        HeaderComponent,
        HomeComponent
    ],
    imports:[
        SheredModule,
        AppRoutingModule
    ],
    exports:[
        AppRoutingModule,
        HeaderComponent
    ],
    providers:[
        ShoppingListService,
        RecipeService,
        DataStorageService,
        AuthService,
    ]
})
export class CoreModule{}