import { useEffect, useReducer, useRef } from "react";
import { useLoaderData } from "react-router-dom";

import { Search } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmployeePagination } from "@/types/database";

type ReducerState = EmployeePagination & { is_fetching: boolean };

export enum REDUCER_ACTION_TYPE {
  NEXT_PAGE,
  START_FETCHING,
}

type ReducerAction = {
  [K in REDUCER_ACTION_TYPE]: K extends REDUCER_ACTION_TYPE.NEXT_PAGE
    ? { type: K; nextData: EmployeePagination }
    : { type: K };
}[REDUCER_ACTION_TYPE];

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.NEXT_PAGE:
      return {
        ...action.nextData,
        data: state.data.concat(action.nextData.data),
        is_fetching: false,
      };

    case REDUCER_ACTION_TYPE.START_FETCHING:
      return {
        ...state,
        is_fetching: true,
      };

    default:
      throw Error("Unknown action.");
  }
}

export default function Home() {
  const employeePagination = useLoaderData() as EmployeePagination;

  const [state, dispatch] = useReducer(reducer, {
    ...employeePagination,
    is_fetching: false,
  });
  const ref = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    console.log(state.is_fetching);

    if (
      !ref.current ||
      state.current_page === state.last_page ||
      state.is_fetching
    )
      return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (!entries[0].isIntersecting) return;

        dispatch({ type: REDUCER_ACTION_TYPE.START_FETCHING });

        const res = await fetch(state.next_page_url);

        if (!res.ok) {
          throw new Response("", {
            status: 500,
            statusText: "Failed to fetch employees",
          });
        }

        const data: EmployeePagination = await res.json();

        dispatch({ type: REDUCER_ACTION_TYPE.NEXT_PAGE, nextData: data });
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
  ]);

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0">
      <div className="relative flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        />
      </div>
      <Card x-chunk="dashboard-06-chunk-0" className="overflow-x-scroll">
        <CardHeader>
          <CardTitle>Employees</CardTitle>
          <CardDescription>
            An exhaustive compilation of employee profiles, encompassing
            essential details for seamless internal communication and
            collaboration.
          </CardDescription>
        </CardHeader>
        <CardContent className="min-w-full max-w-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>First name</TableHead>
                <TableHead>Last name</TableHead>
                <TableHead className="text-right lg:text-left">Email</TableHead>
                <TableHead className="hidden lg:table-cell lg:text-right">
                  Position
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {state.data.map((employe, index, array) => (
                <TableRow
                  key={employe.id}
                  ref={index + 1 === array.length ? ref : undefined}
                >
                  <TableCell className="hidden sm:table-cell">
                    <Avatar>
                      <AvatarImage
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src={employe.imageUrl}
                        width="64"
                      />
                      <AvatarFallback>AV</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium">
                    {employe.firstName}
                  </TableCell>
                  <TableCell>{employe.lastName}</TableCell>
                  <TableCell className="text-right lg:text-left">
                    {employe.email}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell lg:text-right">
                    {employe.position}
                  </TableCell>
                </TableRow>
              ))}
              {state.is_fetching && (
                <TableRow>
                  <TableCell className="hidden sm:table-cell">
                    <Skeleton className="aspect-square size-10 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-2 w-12" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-2 w-16" />
                  </TableCell>
                  <TableCell className="rotate-180 lg:rotate-0">
                    <Skeleton className="h-2 w-40" />
                  </TableCell>
                  <TableCell className="hidden rotate-180 lg:table-cell">
                    <Skeleton className="h-2 w-64" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {state.from}-{state.to}
            </strong>{" "}
            of <strong>{state.total}</strong> products
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
