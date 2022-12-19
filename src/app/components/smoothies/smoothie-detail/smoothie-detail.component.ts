import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'

import { Smoothie } from 'src/app/common/smoothie';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { SmoothieService } from 'src/app/services/smoothie.service';

@Component({
  selector: 'app-smoothie-detail',
  templateUrl: './smoothie-detail.component.html',
  styleUrls: ['./smoothie-detail.component.css']
})
export class SmoothieDetailComponent implements OnInit {
  displaySmoothie: Smoothie;
  id: number;
  
  constructor(private shoppingListService: ShoppingListService,
              private smoothieService: SmoothieService,
              private route: ActivatedRoute){
    
  }

  ngOnInit(): void {
     this.route.params.subscribe(
        (params: Params) => {
          this.id = +params['id'];
          //console.log(this.id);
          this.displaySmoothie = this.smoothieService.getSmoothie(this.id);
          if(this.displaySmoothie){
            this.smoothieService.getNutritionValuesOfSmoothie(this.displaySmoothie._links.nutrition.href).subscribe((data)=>{
              //this.displaySmoothie = data;
              this.displaySmoothie.nutrition = data;              
            }); 
          }
                   
        }
     );
  }

  addToShoppingCart(){
    this.shoppingListService.addToShoppingCart(this.displaySmoothie);
  }
}
