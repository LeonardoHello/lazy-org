import { forwardRef } from "react";

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
            {data.map((employe, index, array) => (
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
