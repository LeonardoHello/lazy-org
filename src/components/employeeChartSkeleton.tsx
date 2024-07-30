import { useState } from "react";

import { OrganizationChart } from "primereact/organizationchart";

import { Skeleton } from "./ui/skeleton";

export default function EmployeeChartSkeleton() {
  const [data] = useState([
    {
      expanded: true,
      data: {},
      children: [
        {
          expanded: true,
          data: {},
          children: [
            {
              label: "Sales",
            },
            {
              label: "Marketing",
            },
          ],
        },
        {
          expanded: true,
          data: {},
          children: [
            {
              label: "Development",
            },
            {
              label: "UI/UX Design",
            },
          ],
        },
      ],
    },
  ]);

  const nodeTemplate = () => {
    return (
      <div className="flex flex-col">
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="aspect-square size-24 rounded-full object-cover" />

          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    );
  };

  return <OrganizationChart value={data} nodeTemplate={nodeTemplate} />;
}
