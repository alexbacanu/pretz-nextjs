import Image from "next/future/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { Form, Input } from "react-daisyui";
import {
  Highlight,
  Hits,
  InstantSearch,
  SearchBox,
  useInstantSearch,
  useSearchBox,
} from "react-instantsearch-hooks-web";
import { useDebouncedCallback } from "use-debounce";
import { typesenseInstantSearchAdapter } from "../../lib/clients/typesenseClient";
import useProducts from "../../lib/hooks/useProducts";

const Search = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  let timerId: undefined | ReturnType<typeof setTimeout> = undefined;

  const queryHook = (query: string, search: Function) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(() => search(query), 300);
  };

  return (
    <InstantSearch
      indexName="typesenseProducts"
      searchClient={typesenseInstantSearchAdapter.searchClient}
    >
      <div className="relative flex-1">
        <SearchBox
          onSubmit={(event: any) => {
            return (event.target[0].value = "");
          }}
          onClick={() => {
            setVisible(true);
          }}
          queryHook={queryHook}
          placeholder="Search here..."
          classNames={{
            input: "input border-gray-300 border-1",
            form: "form-control",
            submitIcon: "hidden",
            resetIcon: "hidden",
          }}
        />
        {visible ? (
          <>
            <div className="fixed inset-0" onClick={() => setVisible(false)} />

            <div className="absolute z-10 flex-1 w-full mt-2 overflow-auto bg-white rounded-md shadow-lg menu max-h-96 ring-1 ring-black ring-opacity-10 sm:text-sm">
              <NoResultsBoundary fallback={<NoResults />}>
                <Hits hitComponent={CustomHits} onClick={() => setVisible(false)} />
              </NoResultsBoundary>
            </div>
          </>
        ) : null}
      </div>
    </InstantSearch>
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
    <div className="p-4">
      No results for <q>{indexUiState.query}</q>.
    </div>
  );
};

const CustomSearchBox = (props: any) => {
  const [query, setQuery] = useState("");
  const { refine } = useSearchBox(props);

  const debouncedRefine = useDebouncedCallback((value) => {
    refine(value);
  }, 300);

  const onChange = useCallback(
    (event: any) => {
      const newQuery = event.currentTarget.value;
      setQuery(newQuery);
      debouncedRefine(newQuery);
    },
    [debouncedRefine]
  );

  const onSubmit = (event: any) => {
    event.currentTarget.value = "";
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        type="search"
        placeholder="Search here..."
        className="text-lg"
        value={query}
        onClick={props.toggleVisible}
        onChange={onChange}
      />
    </Form>
  );
};

const CustomHits = ({ hit }: any) => {
  const { fetchProduct } = useProducts();

  return (
    <Link href={`/products/${hit.id}`}>
      <a onClick={() => fetchProduct(hit.id)}>
        {/* Image */}
        <div>
          <Image
            className="flex-shrink-0 rounded-md ring-1 ring-black ring-opacity-5"
            src={hit.pImg}
            alt={hit.pName}
            width={80}
            height={80}
            priority
          />
        </div>

        {/* Product description */}
        <div className="flex flex-col flex-1 gap-1">
          <div className="flex justify-between text-base text-gray-900">
            <Highlight className="line-clamp-2" attribute="pName" hit={hit} />
            <p className="ml-4 whitespace-nowrap">{hit.priceCurrent} Lei</p>
          </div>
          <p className="text-sm text-gray-500 ">{hit.pCategory}</p>
        </div>
      </a>
    </Link>
  );
};

export default Search;
