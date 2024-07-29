import { useEffect, useReducer, useRef } from "react";
import { useLoaderData } from "react-router-dom";

import { HomeSearchInput } from "@/components/homeSearchInput";
import { HomeTable } from "@/components/homeTable";
import { EmployeePagination } from "@/types/database";

export type ReducerState = EmployeePagination & {
  is_fetching: boolean;
  search_input: string;
};

enum REDUCER_ACTION_TYPE {
  NEXT_PAGE,
  SEARCH,
  SEARCH_INPUT,
  FETCH,
}

type ReducerAction = {
  [K in REDUCER_ACTION_TYPE]: K extends REDUCER_ACTION_TYPE.NEXT_PAGE
    ? { type: K; nextPage: ReducerState }
    : K extends REDUCER_ACTION_TYPE.SEARCH
      ? { type: K; search: ReducerState }
      : { type: K };
}[REDUCER_ACTION_TYPE];

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.NEXT_PAGE:
      return {
        ...action.nextPage,
        data: state.data.concat(action.nextPage.data),
      };

    case REDUCER_ACTION_TYPE.SEARCH:
      return {
        ...action.search,
      };

    case REDUCER_ACTION_TYPE.FETCH:
      return {
        ...state,
        is_fetching: true,
      };

    default:
      throw Error("Unknown action.");
  }
}

export default function Home() {
  const { data: employeePagination, initialSearchInput } = useLoaderData() as {
    data: EmployeePagination;
    initialSearchInput: string;
  };

  const ref = useRef<HTMLTableRowElement>(null);
  const [state, dispatch] = useReducer(reducer, {
    ...employeePagination,
    is_fetching: false,
    search_input: initialSearchInput,
  });

  useEffect(() => {
    if (
      !ref.current ||
      state.current_page === state.last_page ||
      state.is_fetching
    )
      return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (!entries[0].isIntersecting) return;

        startLoading();

        const searchParams = new URLSearchParams({
          search: state.search_input,
        });
        const res = await fetch(state.next_page_url + "&" + searchParams);

        if (!res.ok) {
          throw new Response("", {
            status: 500,
            statusText: "Failed to fetch new page of employees",
          });
        }

        const data: EmployeePagination = await res.json();

        dispatch({
          type: REDUCER_ACTION_TYPE.NEXT_PAGE,
          nextPage: {
            ...data,
            is_fetching: false,
            search_input: state.search_input,
          },
        });
      },
      {
        rootMargin: "20px",
      },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [
    state.current_page,
    state.is_fetching,
    state.last_page,
    state.next_page_url,
    state.search_input,
  ]);

  function startLoading() {
    dispatch({ type: REDUCER_ACTION_TYPE.FETCH });
  }

  function searchTable({
    data,
    search_input,
  }: {
    data: EmployeePagination;
    search_input: string;
  }) {
    dispatch({
      type: REDUCER_ACTION_TYPE.SEARCH,
      search: {
        ...data,
        is_fetching: false,
        search_input,
      },
    });
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0">
      <HomeSearchInput
        initialSearchInput={initialSearchInput}
        startLoading={startLoading}
        searchTable={searchTable}
      />
      <HomeTable
        ref={ref}
        data={state.data}
        is_fetching={state.is_fetching}
        total={state.total}
      />
    </main>
  );
}
