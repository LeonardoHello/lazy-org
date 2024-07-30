import axios, { AxiosError, AxiosResponse } from "axios";
import { Search } from "lucide-react";

import { ReducerState } from "./routes/home";
import { useToast } from "./ui/use-toast";
import { Input } from "@/components/ui/input";
import { EmployeePagination } from "@/types/database";

export function EmployeeSearch({
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
  const { toast } = useToast();

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

          try {
            const { data }: AxiosResponse<EmployeePagination> = await axios({
              params: { search: searchedValue },
            });

            searchTable({ data, search_input: searchedValue });
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
                  "An error occurred while attempting to retrieve searched employees from our servers",
              });
            }
          }
        }}
      />
    </form>
  );
}
