import { Smoothie } from "./smoothie";

export class CartItem {


    constructor(public smoothie: Smoothie,
                public quantity: number,
                public price: number){}

}
