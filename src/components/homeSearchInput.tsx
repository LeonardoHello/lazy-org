import axios, { AxiosResponse } from "axios";
import { Search } from "lucide-react";

import { ReducerState } from "./routes/home";
import { Input } from "@/components/ui/input";
import { EmployeePagination } from "@/types/database";

export function HomeSearchInput({
  initialSearchInput,
  startLoading,
  searchTable,
}: {
  initialSearchInput: string;
  startLoading: () => void;
  searchTable: ({
    data,
    search_input,
  }: {
    data: EmployeePagination;
    search_input: ReducerState["search_input"];
  }) => void;
}) {
  return (
    <form className="relative flex-1 md:grow-0" role="search">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        defaultValue={initialSearchInput}
        name="search"
        onChange={async (e) => {
          // replace every character except letters
          const searchedValue = e.currentTarget.value.replaceAll(
            /[^a-zA-Z]/g,
            "",
          );

          startLoading();

          const { data }: AxiosResponse<EmployeePagination> = await axios({
            params: { search: searchedValue },
          });

          searchTable({ data, search_input: searchedValue });
        }}
      />
    </form>
  );
}
