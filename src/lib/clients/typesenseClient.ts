import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";

const typesenseInstantSearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "test123", // Be sure to use an API key that only allows search operations
    nodes: [
      {
        host: "localhost",
        port: 8108,
        protocol: "http",
      },
    ],
    cacheSearchResultsForSeconds: 10 * 60, // Cache search results from server. Defaults to 2 minutes. Set to 0 to disable caching.
  },
  additionalSearchParameters: {
    query_by: "productName,productCategory",
    query_by_weights: "4,2",
  },
});

export { typesenseInstantSearchAdapter };
