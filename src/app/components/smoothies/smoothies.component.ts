import { Component, Input } from '@angular/core';
import { Smoothie } from 'src/app/common/smoothie';
import { SmoothieService } from 'src/app/services/smoothie.service';

@Component({
  selector: 'app-smoothies',
  templateUrl: './smoothies.component.html',
  styleUrls: ['./smoothies.component.css']
})
export class SmoothiesComponent {
  selectSmoothie: Smoothie;
  @Input() addSmoothie: Smoothie;

  ngOnInit(): void {
  }

}
