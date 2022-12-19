import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class LoginService {
    
    private userMenu: string[] = ["Menu1","Menu2"];
    private adminMenu: string[] = ["Menu3","Menu4"];


    constructor(private http: HttpClient){}
    

    getUserMenu(){
        return this.userMenu.slice();
    }

    getAdminMenu(){
        return this.adminMenu.slice();
    }

}