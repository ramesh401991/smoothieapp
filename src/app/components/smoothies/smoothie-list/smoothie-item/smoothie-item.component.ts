import { Component, Input, OnInit } from '@angular/core';
import { Smoothie } from 'src/app/common/smoothie';

@Component({
  selector: 'app-smoothie-item',
  templateUrl: './smoothie-item.component.html',
  styleUrls: ['./smoothie-item.component.css']
})
export class SmoothieItemComponent implements OnInit {
  @Input('smoothie') smoothie: Smoothie;
  @Input() index: number;

  ngOnInit(): void {
  }

}