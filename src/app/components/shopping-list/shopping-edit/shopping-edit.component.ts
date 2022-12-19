import { Component, Input } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @Input() currentCartItem: CartItem;

  constructor(private shoppingListService: ShoppingListService){

  }


}
