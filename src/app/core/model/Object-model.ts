export class Customer {
     id: number;
     name: string;
     surName: string;
     contactNumber: string;
     emailAddress: string;
     address: string;
     
     customerOrderList:any;
     cart:any;
  
}

export class Response {
    success: boolean;
    errorMessage: string[];
      responseData: any; // You can replace 'any' with a specific type if you know the structure of 'Object'
      isSuccess: boolean;
    }
