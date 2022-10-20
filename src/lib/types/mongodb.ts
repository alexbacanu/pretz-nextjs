export interface Product {
  _id?: string;
  pID?: string;
  pName?: string;
  pLink?: string;
  pImg?: string;
  pCategory?: string;
  pReviews?: number;
  pStars?: number;
  pGeniusTag?: boolean;
  pUsedTag?: boolean;
  priceCurrent?: number;
  priceRetail?: number;
  priceSlashed?: number;
  priceUsed?: number;
  crawledAt?: Date;
  timeseries?: Timeseries;
}

export interface Timeseries {
  priceDate?: Date;
  priceCurrent?: number;
  priceRetail?: number;
  priceSlashed?: number;
  priceUsed?: number;
}
