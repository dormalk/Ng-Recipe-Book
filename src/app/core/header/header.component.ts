import { Component, EventEmitter, Output } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    
    constructor(private dataStorageService: DataStorageService,
                public authService: AuthService,
                private store: Store<fromApp.AppState>) { }
    onSaveData() {
        this.dataStorageService.storeRecipes()
            .subscribe((respons) => {
                console.log(respons);
            });
    }

    onFatchData() {
        this.dataStorageService.getRecipes();
    }

    onLogout() {
        // this.authService.logout();
        this.store.dispatch(new AuthActions.Logout())
    }

}
