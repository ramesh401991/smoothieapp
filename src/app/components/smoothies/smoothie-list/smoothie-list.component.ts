import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Smoothie } from 'src/app/common/smoothie';
import { SmoothieService } from 'src/app/services/smoothie.service';

@Component({
  selector: 'app-smoothie-list',
  templateUrl: './smoothie-list.component.html',
  styleUrls: ['./smoothie-list.component.css']
})
export class SmoothieListComponent implements OnInit {
  
  smoothies: Smoothie[] = [];
  private smoothieListSubscriptions: Subscription[] = [];

  constructor(private smoothieService: SmoothieService){}

  ngOnInit(): void {
      if(this.smoothieListSubscriptions.length == 0){
        this.smoothieService.listSmoothies("").then(()=>{
          console.log(this.smoothieService.smoothies);
          this.smoothies = this.smoothieService.smoothies;
        });
        
      }     
      this.smoothieListSubscriptions.push(this.smoothieService.textChange.subscribe(searchText=>{
        //console.log(searchText);
        this.smoothieService.listSmoothies(searchText).then(()=>{
          console.log(this.smoothieService.smoothies);
          this.smoothies = this.smoothieService.smoothies;
        });
      }));
  }

}
