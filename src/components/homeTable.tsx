import { forwardRef } from "react";

import EmployeeDetails from "./employeeDetails";
import { ReducerState } from "./routes/home";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const HomeTable = forwardRef<
  HTMLTableRowElement,
  {
    data: ReducerState["data"];
    is_fetching: ReducerState["is_fetching"];
    total: ReducerState["total"];
  }
>(function HomeTable({ data, is_fetching, total }, ref) {
  return (
    <Card className="overflow-x-scroll">
      <CardHeader>
        <CardTitle>Employees</CardTitle>
        <CardDescription>
          An exhaustive compilation of employee profiles, encompassing essential
          details for seamless internal communication and collaboration.
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
            {data.map((employee, index, array) => (
              <Dialog key={employee.id}>
                <DialogTrigger asChild>
                  <TableRow
                    ref={index + 1 === array.length ? ref : undefined}
                    className="cursor-pointer"
                  >
                    <TableCell className="hidden sm:table-cell">
                      <Avatar>
                        <AvatarImage
                          alt="Product image"
                          className="aspect-square rounded-md object-cover"
                          height="64"
                          src={employee.imageUrl}
                          width="64"
                        />
                        <AvatarFallback>AV</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">
                      {employee.firstName}
                    </TableCell>
                    <TableCell>{employee.lastName}</TableCell>
                    <TableCell className="text-right lg:text-left">
                      {employee.email}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell lg:text-right">
                      {employee.position}
                    </TableCell>
                  </TableRow>
                </DialogTrigger>
                <DialogContent className="max-h-[calc(100vh-2rem)] max-w-3xl overflow-y-scroll">
                  <DialogHeader>
                    <DialogTitle>Employee information</DialogTitle>
                    <DialogDescription>Personal details.</DialogDescription>
                  </DialogHeader>
                  <EmployeeDetails employee={employee} />
                </DialogContent>
              </Dialog>
            ))}
            {is_fetching && (
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
          Showing <strong>{total}</strong> product/s
        </div>
      </CardFooter>
    </Card>
  );
});
