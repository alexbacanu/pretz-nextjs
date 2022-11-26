export interface Product {
  _id: Object;
  pID: string;
  pName: string;
  pLink: string;
  pImg: string;
  pCategoryTrail?: string;
  pCategory?: string;
  pVendor?: string;
  pStock?: string;
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
  stats?: Stats;
}

export interface Timeseries {
  priceDate?: Date;
  priceCurrent?: number;
  priceRetail?: number;
  priceSlashed?: number;
  priceUsed?: number;
}

export interface Stats {
  lowest7?: {
    k: Date;
    v: number;
  };
  lowest30?: {
    k: Date;
    v: number;
  };
  lowest90?: {
    k: Date;
    v: number;
  };
  lowestAll?: {
    k: Date;
    v: number;
  };
  highest7?: {
    k: Date;
    v: number;
  };
  highest30?: {
    k: Date;
    v: number;
  };
  highest90?: {
    k: Date;
    v: number;
  };
  highestAll?: {
    k: Date;
    v: number;
  };
  deal7?: {
    v: number;
  };
  deal30?: {
    v: number;
  };
  deal90?: {
    v: number;
  };
  dealAll?: {
    v: number;
  };
  average7?: {
    v: number;
  };
  average30?: {
    v: number;
  };
  average90?: {
    v: number;
  };
  averageAll?: {
    v: number;
  };
  cash7?: {
    v: number;
  };
  cash30?: {
    v: number;
  };
  cash90?: {
    v: number;
  };
  cashAll?: {
    v: number;
  };
  updatedAt?: Date;
}
