import { Component, Inject, OnInit } from '@angular/core';

import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-loginstatus',
  templateUrl: './loginstatus.component.html',
  styleUrls: ['./loginstatus.component.css']
})
export class LoginstatusComponent implements OnInit {
  
  isAuthenticated: boolean = false;
  userFullName: string = '';

  constructor(private oktaAuthService: OktaAuthStateService,@Inject(OKTA_AUTH) private oktaAuth: OktaAuth){

  }

  ngOnInit(): void {
    //Subscribe to Authentication State Changes
    this.oktaAuthService.authState$.subscribe((result)=>{
        this.isAuthenticated = result.isAuthenticated!;
        this.getUserDetails();
    });
  }
  getUserDetails() {
    if(this.isAuthenticated){
      //Fetch the Logged in User Details (user's Claims)
      //
      //User full name is exposed as a property name
      this.oktaAuth.getUser().then(
        (res) => {
          console.log(res);
          this.userFullName = res.name as string;
        }
      );

    }
  }

  logout(){
    //Terminates the session with Okta and removes current tokens
    this.oktaAuth.signOut();
  }
}
