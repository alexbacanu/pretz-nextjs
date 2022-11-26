const today = new Date(new Date().setUTCHours(0, 0, 0, 0));

const initialFilter = {
  $match: {
    crawledAt: { $gte: today },
    // stats: { $exists: true },
    "stats.updatedAt": { $gte: today },
    pUsedTag: false,
    priceCurrent: { $exists: true },
  },
};

export const randomProductsPipeline = [
  initialFilter,
  {
    $sort: {
      "stats.deal90.v": 1,
    },
  },
  { $limit: 20 },
  {
    $sample: {
      size: 4,
    },
  },
];

export const topCashProductsPipeline = [
  initialFilter,
  // {
  //   $match: {
  //     priceCurrent: { $lte: 100 },
  //   },
  // },
  {
    $match: {
      "stats.cash30.v": { $exists: true },
    },
  },
  {
    $sort: {
      "stats.cash30.v": 1,
    },
  },
  { $limit: 20 },
];

export const topDiscountProductsPipeline = [
  initialFilter,
  // {
  //   $match: {
  //     priceCurrent: { $lte: 100 },
  //   },
  // },
  {
    $sort: {
      "stats.deal90.v": 1,
    },
  },
  { $limit: 20 },
];
