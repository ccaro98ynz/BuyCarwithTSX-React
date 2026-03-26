 import { type Product } from "../ProductsModel/ProductsInterface";
 export interface AddItemModelProps {
  product: Product;
  onClose: () => void; 
  onConfirm: (units: number) => void; 
}