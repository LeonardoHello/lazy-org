import { useState } from "react";

import { OrganizationChart } from "primereact/organizationchart";
import { TreeNode } from "primereact/treenode";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

export default function Chart() {
  const [selection, setSelection] = useState<TreeNode[]>([]);
  const [data] = useState([
    {
      expanded: true,
      type: "person",
      data: {
        image:
          "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png",
        name: "Amy Elsner",
        title: "CEO",
      },
      children: [
        {
          expanded: true,
          type: "person",
          data: {
            image:
              "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
            name: "Anna Fali",
            title: "CMO",
          },
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
          type: "person",
          data: {
            image:
              "https://primefaces.org/cdn/primereact/images/avatar/stephenshaw.png",
            name: "Stephen Shaw",
            title: "CTO",
          },
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

  const nodeTemplate = (node: TreeNode) => {
    if (node.type === "person") {
      return (
        <div className="flex flex-col rounded border p-4">
          <div className="flex flex-col items-center">
            <Avatar>
              <AvatarImage
                alt={node.data.name}
                src={node.data.image}
                className="mb-3 h-12 w-12"
              />
            </Avatar>

            <span className="mb-2 font-bold">{node.data.name}</span>
            <span>{node.data.title}</span>
          </div>
        </div>
      );
    }

    return node.label;
  };

  return (
    <div className="overflow-x-auto">
      <OrganizationChart
        value={data}
        selectionMode="multiple"
        selection={selection}
        onSelectionChange={(e) => setSelection(e.data)}
        nodeTemplate={nodeTemplate}
      />
    </div>
  );
}
