import ScrollContainer from "react-indiana-drag-scroll";

import { AxiosResponse } from "axios";
import { OrganizationChart } from "primereact/organizationchart";
import { TreeNode } from "primereact/treenode";

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Employee, EmployeePagination } from "@/types/database";

interface EmployeeTreeNode extends TreeNode {
  data: Pick<
    Employee,
    "id" | "manager_id" | "firstName" | "lastName" | "position" | "imageUrl"
  >;
  children: EmployeeTreeNode[];
}

export function EmployeeChart({
  resArr,
}: {
  resArr: AxiosResponse<EmployeePagination>[];
}) {
  const employeesArr = resArr.flatMap((res) => {
    return res.data.data;
  });

  // mutated the elements of the list to resemble primereacts TreeNode
  let list: EmployeeTreeNode[] = employeesArr.map(
    ({ id, manager_id, firstName, lastName, position, imageUrl }) => {
      return {
        data: {
          id,
          manager_id,
          firstName,
          lastName,
          position,
          imageUrl,
        },
        children: [],
        expanded: true,
      };
    },
  );

  // filled each TreeNode's children property with
  // corresponding TreeNode that is matching it's id with manager_id
  list.forEach((elem: EmployeeTreeNode) => {
    const managerId = elem.data.manager_id;
    if (!managerId) return;

    const manager = list.at(managerId - 1);

    if (manager) {
      manager.children = [...manager.children, elem];

      list = list.with(managerId - 1, manager);
    }
  });

  const nodeTemplate = (node: EmployeeTreeNode) => {
    return (
      <div className="flex flex-col">
        <div className="flex flex-col items-center gap-2">
          <Avatar>
            <AvatarImage
              src={node.data.imageUrl}
              alt={node.data.firstName}
              height="64"
              width="64"
              className="aspect-square rounded-md object-cover"
            />
            <AvatarFallback>AV</AvatarFallback>
          </Avatar>

          <span className="text-lg font-extralight">
            {node.data.firstName} {node.data.lastName}
          </span>
          <span className="text-sm font-medium">{node.data.position}</span>
        </div>
      </div>
    );
  };

  return (
    <ScrollContainer className="max-h-screen p-8">
      <OrganizationChart value={list} nodeTemplate={nodeTemplate} />
    </ScrollContainer>
  );
}
