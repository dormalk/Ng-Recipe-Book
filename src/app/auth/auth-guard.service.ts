import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService,
                private router: Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean{
        if(this.authService.isAuthenticated()){
            return true;
        }
        else{
            this.router.navigate(['/signin']);
        }
    }
}