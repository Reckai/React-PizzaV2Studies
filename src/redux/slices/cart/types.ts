export type ICartSliceState  = { 
  totalPrice: number;
  items:TCartItem[];
}
export type TCartItem = {
    id: string;
    title: string;
    size: number;
    price: number;
    count: number;
    imageUrl: string;
    type: string;
  
}
