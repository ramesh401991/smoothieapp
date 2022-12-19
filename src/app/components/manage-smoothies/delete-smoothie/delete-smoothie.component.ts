import { Component } from '@angular/core';
import { FormControl, FormGroup, NG_ASYNC_VALIDATORS, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Smoothie } from 'src/app/common/smoothie';
import { SmoothieService } from 'src/app/services/smoothie.service';

@Component({
  selector: 'app-delete-smoothie',
  templateUrl: './delete-smoothie.component.html',
  styleUrls: ['./delete-smoothie.component.css']
})
export class DeleteSmoothieComponent {

  deleteForm: FormGroup;
  smoothieList: {value: string, viewValue: string}[] = [];
  selectedSmoothie: Smoothie;

  constructor(private smoothieService: SmoothieService,private router: Router){}

  onDeleteSmoothie(){

    console.log(this.selectedSmoothie);

    this.smoothieService.removeSmoothie(this.selectedSmoothie).then(()=>{
        this.router.navigate(['/smoothies']);
    });
  }

  ngOnInit(): void {
      
    this.initForm();

  }

  private initForm(){

    //Initialize dropdown with the values
    if(this.smoothieService.smoothies.length>0){      
      this.mapSelectSmoothiesOptions();      
    }else{
      this.smoothieService.listSmoothies("").then(()=>{
        console.log(this.smoothieService.smoothies);
        this.mapSelectSmoothiesOptions();
      });
    }   
    
    console.log(this.smoothieList);
    
    this.deleteForm = new FormGroup({
      'smoothieList': new FormControl(null),
      'smoothieName': new FormControl({ value: '', disabled: true }),
      'smoothieDesc': new FormControl({ value: '', disabled: true }),
      'smoothiePrice': new FormControl({ value: '', disabled: true }),
      'smoothieImagePath': new FormControl({ value: '', disabled: true }),
      'proteinValue': new FormControl({ value: '', disabled: true }),
      'fatsValue': new FormControl({ value: '', disabled: true }),
      'carbsValue': new FormControl({ value: '', disabled: true }),
      'fiberValue': new FormControl({ value: '', disabled: true })
    });


  }

  mapSelectSmoothiesOptions(){
    this.smoothieService.smoothies.forEach(response => {
      let smoothieOption = {value: response._links.smoothie.href,viewValue: response.name}
      this.smoothieList.push(smoothieOption);
    });
  }

  populateForm(eventData: any){
    console.log(eventData.target.value);    
    console.log(this.deleteForm);
    this.smoothieService.getSmoothieByURL(eventData.target.value).subscribe((data)=>{
        let smoothieName = data.name;
        let smoothieDesc = data.description;
        let smoothiePrice = data.unitPrice;
        let smoothieImagePath = data.imagePathUrl;
        this.selectedSmoothie = data;
        this.smoothieService.getNutritionValuesOfSmoothie(data._links.nutrition.href).subscribe((res)=>{
          let protein = res.protein;
          let fats = res.fats;
          let carbs = res.carbs;
          let fiber = res.fiber;
          this.selectedSmoothie.nutrition = res;
          this.deleteForm.patchValue({
            'smoothieName': smoothieName,
            'smoothieDesc': smoothieDesc,
            'smoothiePrice': smoothiePrice,
            'smoothieImagePath': smoothieImagePath,
            'proteinValue': protein,
            'fatsValue': fats,
            'carbsValue': carbs,
            'fiberValue': fiber
          });
        })
    });

  }

}
