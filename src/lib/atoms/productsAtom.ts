import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export type Product = {
  id: string;
  crawledAt: Timestamp;

  productID: string;
  productName: string;
  productLink: string;
  productImg: string;
  productCategory: string;
  productStars: number;
  productReviews: number;
  productStock: string;

  productPrice: number;
  retailPrice: number;
  slashedPrice: number;
  usedPrice: number;

  usedTag: boolean;
  geniusTag: boolean;

  timeseries: Object;
};

export interface ProductState {
  selectedProduct: Product | null;
  products: Product[];
}

const defaultProductState: ProductState = {
  selectedProduct: null,
  products: [],
};

export const productState = atom<ProductState>({
  key: "productState",
  default: defaultProductState,
});
