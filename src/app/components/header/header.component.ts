import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';
import { LoginService } from 'src/app/services/loginService.service';



@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"]
})

export class HeaderComponent implements OnInit{
    userMenu: string[];
    adminMenu: string[];

    constructor(private loginService: LoginService,private headerService: HeaderService){}

    ngOnInit(): void {
        
    }

    logout(){
        
    }
    

 
} 