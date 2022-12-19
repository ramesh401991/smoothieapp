import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/common/cart-item';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
    cartItems: CartItem[] = [];
    private shoppingListSubscriptions: Subscription[] = [];

    constructor(private shoppingListService: ShoppingListService){
      this.shoppingListSubscriptions.push(this.shoppingListService.renderCart.subscribe((eventData: CartItem[])=>{
          this.cartItems=eventData;
      }));
    }

    ngOnInit(): void {
      this.cartItems = this.shoppingListService.getCartItems();
    }

    removeItem(indexOfElement: number){
      this.shoppingListService.removeItem(indexOfElement);
    }

    ngOnDestroy(): void {
        this.shoppingListSubscriptions.forEach((subscription: Subscription)=>subscription.unsubscribe());
    }

}
