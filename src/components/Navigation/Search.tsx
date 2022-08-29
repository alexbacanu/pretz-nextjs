import { doc, getDoc } from "firebase/firestore/lite";
import Image from "next/future/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Highlight,
  Hits,
  InstantSearch,
  SearchBox,
  useInstantSearch,
} from "react-instantsearch-hooks-web";
import { Product } from "../../lib/atoms/productsAtom";
import { firestore } from "../../lib/clients/firebaseClient";
import { typesenseInstantSearchAdapter } from "../../lib/clients/typesenseClient";
import useProducts from "../../lib/hooks/useProducts";

interface Props {}

const Search = (props: Props) => {
  const { productStateValue, setProductStateValue } = useProducts();
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  const searchClient = typesenseInstantSearchAdapter.searchClient;

  // Get selected product from database
  const fetchProduct = async (productId: string) => {
    try {
      const productRef = doc(firestore, "products", productId);
      const productDocs = await getDoc(productRef);

      // Store products in productState
      setProductStateValue((prev) => ({
        ...prev,
        selectedProduct: {
          id: productDocs.id,
          ...productDocs.data(),
        } as Product,
      }));
    } catch (error) {
      console.log("fetchProduct error", error);
    }
  };

  const Hit = ({ hit }: any) => {
    return (
      <div key={hit.productName} className="flex py-2 ">
        {/* Image */}
        <div className="flex-shrink-0 w-20 h-20 overflow-hidden border border-gray-200 rounded-md">
          <Image
            src={hit.productImg}
            alt={hit.productName}
            width={80}
            height={80}
            className="object-cover object-center w-full h-full"
            priority
          />
        </div>

        {/* Description */}
        <div
          onClick={() => setShowResults(false)}
          className="flex flex-col flex-1 px-1 ml-3 rounded-md cursor-default select-none hover:from-indigo-100 hover:to-fuchsia-100 bg-gradient-to-tr"
        >
          <Link href={`/products/${hit.id}`}>
            <div
              onClick={() => {
                fetchProduct(hit.id);
              }}
            >
              <div className="flex justify-between text-base font-medium text-gray-900">
                <h3>
                  <a className="line-clamp-2">
                    <Highlight attribute="productName" hit={hit} />
                  </a>
                </h3>
                <p className="ml-4 whitespace-nowrap">{hit.productPrice} Lei</p>
              </div>
              <p className="mt-1 text-sm text-gray-500">{hit.productCategory}</p>
            </div>
          </Link>
        </div>
      </div>
    );
  };

  const NoResultsBoundary = ({ children, fallback }: any) => {
    const { results } = useInstantSearch();

    if (!results.__isArtificial && results.nbHits === 0) {
      return (
        <>
          {fallback}
          <div hidden>{children}</div>
        </>
      );
    }

    return children;
  };

  const NoResults = () => {
    const { indexUiState } = useInstantSearch();

    return (
      <div>
        <p>
          No results for <q>{indexUiState.query}</q>.
        </p>
      </div>
    );
  };

  return (
    <InstantSearch indexName="typesenseProducts" searchClient={searchClient}>
      <div className="flex flex-col flex-grow">
        {/* Search input */}
        {showResults ? (
          <div
            className="fixed inset-0 bg-black bg-opacity-25"
            onClick={() => setShowResults(false)}
          />
        ) : null}

        <SearchBox
          placeholder="Search for any product"
          onClick={() => setShowResults(true)}
          classNames={{
            root: "flex flex-grow",
            form: "relative flex flex-grow text-gray-400 fill-gray-400 focus-within:fill-gray-700 focus-within:text-gray-700",
            input: "px-3 mx-3 py-1.5 rounded-md flex flex-grow",
            submitIcon:
              "absolute w-4 h-4 transform -translate-y-1/2 pointer-events-none top-1/2 right-6",
            resetIcon:
              "hidden absolute w-4 h-4 transform -translate-y-1/2 pointer-events-none top-1/2 right-12",
          }}
        />

        {/* Hits */}
        {showResults ? (
          <div className="relative">
            <div className="absolute px-3 py-1 pt-2 mx-3 mt-2 overflow-auto text-base bg-white rounded-md shadow-lg max-h-96 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              <NoResultsBoundary fallback={<NoResults />}>
                <Hits hitComponent={Hit} />
              </NoResultsBoundary>
            </div>
          </div>
        ) : null}
      </div>
    </InstantSearch>
  );
};

export default Search;
