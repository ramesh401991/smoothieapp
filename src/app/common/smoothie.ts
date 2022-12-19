import { Links } from "./links";
import { Nutrition } from "./nutrition";

export class Smoothie {


    constructor(public name: string,
                public description: string,
                public smoothieCode: string,
                public unitPrice: number,
                public unitQuantity: number,
                public imagePathUrl: string,
                public nutrition: Nutrition,
                public createdDate: Date,
                public modifiedDate: Date,
                public _links: Links){


    }

}
