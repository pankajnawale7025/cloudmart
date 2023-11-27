export class Product {
    id: number;
    name: string;
    category: string;
    price: number;
    imageurl:string
  
    constructor(
      id?: number,
      name?: string,
      category?: string,
      price?: number
    ) {
      this.id = id || 0; // Default value or 0
      this.name = name || "";
      this.category = category || "";
      this.price = price || 0.0;
    }
}