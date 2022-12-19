import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Nutrition } from 'src/app/common/nutrition';
import { Smoothie } from 'src/app/common/smoothie';
import { SmoothieService } from 'src/app/services/smoothie.service';

@Component({
  selector: 'app-add-smoothie',
  templateUrl: './add-smoothie.component.html',
  styleUrls: ['./add-smoothie.component.css']
})
export class AddSmoothieComponent implements OnInit {
  addForm: FormGroup;

  constructor(private smoothieService: SmoothieService,private router: Router,private route: ActivatedRoute){}

  onAddSmoothie(){

    let smoothieCode = this.generateSmoothieCode(this.addForm.get('smoothieName').value);

    //Set the Nutrition Details
    let nutrition: Nutrition = new Nutrition(this.addForm.get('proteinValue').value,
                                            this.addForm.get('fatsValue').value,
                                            this.addForm.get('carbsValue').value,
                                            this.addForm.get('fiberValue').value,
                                            null,null);

    //Set the Smothie Details
    let smoothie: Smoothie = new Smoothie(this.addForm.get('smoothieName').value,
                                          this.addForm.get('smoothieDesc').value,
                                          smoothieCode,
                                          this.addForm.get('smoothiePrice').value,
                                          1,
                                          this.addForm.get('smoothieImagePath').value,
                                          nutrition,null,null,null);
    
    this.smoothieService.createSmoothie(smoothie).then((result: Smoothie)=>{
        console.log(result);
        this.router.navigate(['/smoothies']);
    });

  }

  private generateSmoothieCode(smoothieName: string): string{
    
    let smoothieCode = 'SM-';
    smoothieName = smoothieName.replaceAll(" ","");
    for (let i = 0; i < 3; i++) { 
      let index = Math.ceil(smoothieName.length * Math.random());
      console.log(index);
      smoothieCode += index.toString();
     }

     console.log(smoothieCode);

     return smoothieCode;

  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(){ 
        
    this.addForm = new FormGroup({
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
}
