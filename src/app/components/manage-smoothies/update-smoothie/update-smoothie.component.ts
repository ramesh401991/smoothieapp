import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Smoothie } from 'src/app/common/smoothie';
import { SmoothieService } from 'src/app/services/smoothie.service';

@Component({
  selector: 'app-update-smoothie',
  templateUrl: './update-smoothie.component.html',
  styleUrls: ['./update-smoothie.component.css']
})
export class UpdateSmoothieComponent implements OnInit {

  updateForm: FormGroup;
  smoothieList: {value: string, viewValue: string}[] = [];
  selectedSmoothie: Smoothie;

  constructor(private smoothieService: SmoothieService,private router: Router,private route: ActivatedRoute){}

  onUpdateSmoothie(){

    console.log(this.selectedSmoothie);
    //Update the Nutrition Details
    this.selectedSmoothie.nutrition.protein = this.updateForm.get('proteinValue').value;
    this.selectedSmoothie.nutrition.fats = this.updateForm.get('fatsValue').value;
    this.selectedSmoothie.nutrition.carbs = this.updateForm.get('carbsValue').value;
    this.selectedSmoothie.nutrition.fiber = this.updateForm.get('fiberValue').value;


    this.selectedSmoothie.name = this.updateForm.get('smoothieName').value;
    this.selectedSmoothie.description = this.updateForm.get('smoothieDesc').value;
    this.selectedSmoothie.unitPrice = this.updateForm.get('smoothiePrice').value;
    this.selectedSmoothie.imagePathUrl = this.updateForm.get('smoothieImagePath').value;

    this.smoothieService.updateSmoothie(this.selectedSmoothie).then((result: Smoothie)=>{
        console.log(result);
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
    
    this.updateForm = new FormGroup({
      'smoothieList': new FormControl(null),
      'smoothieName': new FormControl(null),
      'smoothieDesc': new FormControl(null),
      'smoothiePrice': new FormControl(null),
      'smoothieImagePath': new FormControl(null),
      'proteinValue': new FormControl(null),
      'fatsValue': new FormControl(null),
      'carbsValue': new FormControl(null),
      'fiberValue': new FormControl(null)
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
    console.log(this.updateForm);
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
          this.updateForm.patchValue({
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
