import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { SmoothieService } from './services/smoothie.service';
import { HeaderComponent } from './components/header/header.component';
import { SmoothiesComponent } from './components/smoothies/smoothies.component';
import { SmoothieListComponent } from './components/smoothies/smoothie-list/smoothie-list.component';
import { SmoothieItemComponent } from './components/smoothies/smoothie-list/smoothie-item/smoothie-item.component';
import { SmoothieDetailComponent } from './components/smoothies/smoothie-detail/smoothie-detail.component';
import { DropDownDirective } from './common/dropdown.directive';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './components/shopping-list/shopping-edit/shopping-edit.component';
import { SearchComponent } from './components/search/search.component';
import { AppRoutingModule } from './app-routing.module';
import { ManageSmoothiesComponent } from './components/manage-smoothies/manage-smoothies.component';
import { AddSmoothieComponent } from './components/manage-smoothies/add-smoothie/add-smoothie.component';
import { UpdateSmoothieComponent } from './components/manage-smoothies/update-smoothie/update-smoothie.component';
import { DeleteSmoothieComponent } from './components/manage-smoothies/delete-smoothie/delete-smoothie.component';
import { SmoothieStartComponent } from './components/smoothies/smoothie-start/smoothie-start.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginstatusComponent } from './components/loginstatus/loginstatus.component';
import {
  OktaAuthModule,
  OktaCallbackComponent,
  OKTA_CONFIG
} from '@okta/okta-angular';

import { OktaAuth } from '@okta/okta-auth-js';
import appConfig from "./config/app-config";
import { ErrorComponent } from './components/error/error.component';

const oktaConfig = appConfig.oidc;

const oktaAuth = new OktaAuth(oktaConfig);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,    
    SmoothiesComponent,
    SmoothieListComponent,
    SmoothieItemComponent,
    SmoothieDetailComponent,
    DropDownDirective,
    ShoppingListComponent,
    ShoppingEditComponent,
    SearchComponent,
    ManageSmoothiesComponent,
    AddSmoothieComponent,
    UpdateSmoothieComponent,
    DeleteSmoothieComponent,
    SmoothieStartComponent,
    LoginComponent,
    LoginstatusComponent,
    ErrorComponent    
  ],
  imports: [    
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [SmoothieService, {provide: OKTA_CONFIG, useValue: { oktaAuth }}],
  bootstrap: [AppComponent]
})
export class AppModule { }
