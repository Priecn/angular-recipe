import { Ingredient } from "../../shared/model/ingredient.model";

export class Recipe {

    constructor(public id: number, 
        public name: string, 
        public description: string, 
        public imagePath: string,
        public ratings: number,
        public ingredients: Ingredient[]){}
}