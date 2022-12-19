import { Injector, NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { AddSmoothieComponent } from "./components/manage-smoothies/add-smoothie/add-smoothie.component";
import { DeleteSmoothieComponent } from "./components/manage-smoothies/delete-smoothie/delete-smoothie.component";
import { ManageSmoothiesComponent } from "./components/manage-smoothies/manage-smoothies.component";
import { UpdateSmoothieComponent } from "./components/manage-smoothies/update-smoothie/update-smoothie.component";
import { ShoppingListComponent } from "./components/shopping-list/shopping-list.component";
import { SmoothieDetailComponent } from "./components/smoothies/smoothie-detail/smoothie-detail.component";
import { SmoothieStartComponent } from "./components/smoothies/smoothie-start/smoothie-start.component";
import { SmoothiesComponent } from "./components/smoothies/smoothies.component";

import {
    OktaAuthModule,
    OktaCallbackComponent,
    OKTA_CONFIG,
    OktaAuthGuard
} from '@okta/okta-angular';

import { OktaAuth } from '@okta/okta-auth-js';

import appConfig from "./config/app-config";
import { LoginComponent } from "./components/login/login.component";
import { ErrorComponent } from "./components/error/error.component";

function sendToErrorPage(oktaAuth: OktaAuth, injector: Injector){
    //Use Injector to access the any service within the application
    const router = injector.get(Router);
    
    //Redirect to Error Page
    router.navigate(['/error']);
}

const appRoutes: Routes = [
    {path: 'login/callback', component: OktaCallbackComponent},
    {path: 'login', component: LoginComponent},
    {path: 'error', component: ErrorComponent},

    {path: 'smoothies',component: SmoothiesComponent,children: [
        {path:'',component: SmoothieStartComponent},
        {path:':id',component: SmoothieDetailComponent}
    ]},
    {path: 'shoppinglist',component: ShoppingListComponent},
    {path: 'managesmoothies',component: ManageSmoothiesComponent,canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToErrorPage}},
    {path: 'managesmoothies/addsmoothie',component: AddSmoothieComponent,canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToErrorPage}}, 
    {path: 'managesmoothies/updatesmoothie',component: UpdateSmoothieComponent,canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToErrorPage}}, 
    {path: 'managesmoothies/deletesmoothie',component: DeleteSmoothieComponent,canActivate: [OktaAuthGuard], data: {onAuthRequired: sendToErrorPage}},  
    {path: '', redirectTo: '/smoothies',pathMatch:"full"},
    {path: '**',component: SmoothiesComponent,pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}