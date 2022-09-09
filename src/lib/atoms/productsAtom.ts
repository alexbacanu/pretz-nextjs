import { atom } from "recoil";

export type Product = {
  id: string;
  pID: string;
  pStore: string;
  pName: string;
  pLink: string;
  pImg: string;
  pCategory: string;
  pReviews: number;
  pStars: number;
  pGeniusTag: boolean;
  pUsedTag: boolean;
  priceCurrent: number;
  priceRetail: number;
  priceSlashed: number;
  priceUsed: number;
  timeseries: Object;
  crawledAt: Date;
  // pStock: string;
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
