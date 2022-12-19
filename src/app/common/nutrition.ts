import { Links } from "./links";

export class Nutrition {


    constructor(public protein: string,
                public fats: string,
                public carbs: number,
                public fiber: number,
                public href: string,
                public _links: Links){


    }

}
