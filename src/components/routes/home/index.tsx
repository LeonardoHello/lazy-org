import { useEffect, useReducer, useRef } from "react";
import { useLoaderData } from "react-router-dom";

import axios, { AxiosError, AxiosResponse } from "axios";

import { EmployeeSearch } from "@/components/employeeSearch";
import { EmployeeTable } from "@/components/employeeTable";
import { useToast } from "@/components/ui/use-toast";
import { EmployeePagination } from "@/types/database";

export type ReducerState = EmployeePagination & {
  is_loading: boolean;
  search_input: string;
};

// enums representing useReducer action types
enum REDUCER_ACTION_TYPE {
  NEXT_PAGE,
  SEARCH,
  SEARCH_INPUT,
  FETCH,
}

// iterating through REDUCER_ACTION_TYPE enum and
// setting a type depending on it's value
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
        is_loading: true,
      };

    default:
      throw Error("Unknown action.");
  }
}

export default function Home() {
  // data returned from the loader function on initial page load
  const { data: employeePagination, initialSearchInput } = useLoaderData() as {
    data: EmployeePagination;
    initialSearchInput: string;
  };

  // ref set to the last element of the table as an intersection observer
  const ref = useRef<HTMLTableRowElement>(null);
  const [state, dispatch] = useReducer(reducer, {
    ...employeePagination,
    is_loading: false,
    search_input: initialSearchInput,
  });

  const { toast } = useToast();

  useEffect(() => {
    if (
      !ref.current ||
      state.current_page === state.last_page ||
      state.is_loading
    )
      return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (!entries[0].isIntersecting) return;

        startLoading();

        try {
          const { data }: AxiosResponse<EmployeePagination> = await axios({
            baseURL: undefined,
            url: state.next_page_url,
            params: { search: state.search_input },
          });

          dispatch({
            type: REDUCER_ACTION_TYPE.NEXT_PAGE,
            nextPage: {
              ...data,
              is_loading: false,
              search_input: state.search_input,
            },
          });
        } catch (error) {
          if (error instanceof AxiosError && error.response) {
            toast({
              variant: "destructive",
              title: error.response.statusText,
              description: error.response.data?.message,
            });
          } else {
            toast({
              variant: "destructive",
              title: "Failed to retrieve employees",
              description:
                "An error occurred while attempting to retrieve new page of employees from our servers",
            });
          }
        }
      },
      {
        rootMargin: "10px",
      },
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [
    state.current_page,
    state.is_loading,
    state.last_page,
    state.next_page_url,
    state.search_input,
    toast,
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
        is_loading: false,
        search_input,
      },
    });
  }

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6">
      <EmployeeSearch
        initialSearchInput={initialSearchInput}
        startLoading={startLoading}
        searchTable={searchTable}
      />
      <EmployeeTable
        ref={ref}
        data={state.data}
        is_loading={state.is_loading}
        total={state.total}
      />
    </main>
  );
}
