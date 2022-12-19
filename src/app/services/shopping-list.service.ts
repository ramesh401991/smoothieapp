import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CartItem } from "../common/cart-item";
import { Smoothie } from "../common/smoothie";

@Injectable({
    providedIn: 'root'
  })

export class ShoppingListService {
    cartItems: CartItem[] = [];
    renderCart = new Subject<CartItem[]>();
    
    getCartItems(){
        return this.cartItems.slice();
    }

    addToShoppingCart(smoothie: Smoothie){
        
        //If the Item already Exist in the Cart then increase the quantity and price
        let existingCartItem: CartItem[] = this.cartItems.filter((cartItem)=>cartItem.smoothie.smoothieCode==smoothie.smoothieCode);
        
        if(existingCartItem && existingCartItem.length>0){
            existingCartItem[0].quantity += 1;
            existingCartItem[0].price = (existingCartItem[0].quantity * existingCartItem[0].price)/(existingCartItem[0].quantity-1);            
        }else{
            //Else Add to the Shopping Cart
            this.cartItems.push({smoothie: smoothie,quantity: 1, price: smoothie.unitPrice});
        }
        console.log(this.cartItems);
        this.renderCart.next(this.cartItems.slice());
    }

    removeItem(indexOfElement: number){
        this.cartItems.splice(indexOfElement,1);
        this.renderCart.next(this.cartItems.slice());
    }


}