import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";

import { AxiosResponse } from "axios";

import { EmployeeChart } from "@/components/employeeChart";
import EmployeeChartSkeleton from "@/components/employeeChartSkeleton";
import { EmployeePagination } from "@/types/database";

export default function Chart() {
  const { resArr } = useLoaderData() as {
    resArr: Promise<AxiosResponse<EmployeePagination>[]>;
  };

  return (
    <main className="grow">
      <Suspense fallback={<EmployeeChartSkeleton />}>
        <Await resolve={resArr}>
          {(resolvedResArr: Awaited<typeof resArr>) => (
            <EmployeeChart resArr={resolvedResArr} />
          )}
        </Await>
      </Suspense>
    </main>
  );
}
