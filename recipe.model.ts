import { Ingredient } from "../share/ingredient.module";

export class Recipe{
    public name: string;
    public description:string;
    public imagePath:any;
    public ingredients: Ingredient[] = [];

    constructor(name :string, desc :string, image :String, ingredients:Ingredient[]){
        this.name=name;
        this.description=desc;
        this.imagePath=image;
        this.ingredients= ingredients;
    }


}