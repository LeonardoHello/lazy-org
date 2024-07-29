import { useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmployeePagination } from "@/types/database";

export default function Home() {
  // I don't like this solution either
  const employeePagination = useLoaderData() as EmployeePagination;

  const [employees] = useState(employeePagination.data);

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
              {employees.map((employe) => (
                <TableRow key={employe.id}>
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
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <strong>
              {employeePagination.from}-{employeePagination.to}
            </strong>{" "}
            of <strong>{employeePagination.total}</strong> products
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
