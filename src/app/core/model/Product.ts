export class Product {
    id: number;
    name: string;
    category: string;
    price: number;
    imageurl:string
    discount:number;
  
    constructor(
      id?: number,
      name?: string,
      category?: string,
      price?: number,
      discount?:number
    ) {
      this.id = id || 0; // Default value or 0
      this.name = name || "";
      this.category = category || "";
      this.price = price || 0.0;
      this.discount=discount || 0
    }
}