import { Fragment } from "react";
import { NavLink, useMatches } from "react-router-dom";

import { Home, Network, PanelLeft, Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./breadcrumb";
import Logo from "./logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const matches = useMatches();
  const crumbs = matches
    // @ts-expect-error type error
    .filter((match) => Boolean(match.handle?.crumb))
    // @ts-expect-error type error
    .map((match) => match.handle.crumb(match.data));

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:hidden sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            <SheetDescription className="sr-only">Header Menu</SheetDescription>
          </SheetHeader>
          <nav className="mt-4 grid gap-2 text-lg font-medium">
            <NavLink
              to="/"
              className="flex items-center gap-4 rounded px-2.5 py-2 text-muted-foreground hover:text-foreground"
            >
              <Home className="h-5 w-5" />
              Home
            </NavLink>
            <NavLink
              to="/chart"
              className="flex items-center gap-4 rounded px-2.5 py-2 text-muted-foreground hover:text-foreground"
            >
              <Network className="h-5 w-5" />
              Chart
            </NavLink>
          </nav>
        </SheetContent>
      </Sheet>

      <Breadcrumb className="flex sm:hidden">
        <BreadcrumbList>
          {crumbs.map((crumb, index, array) => {
            const lastItem = index + 1 === array.length;

            if (lastItem)
              return (
                <BreadcrumbItem key={index}>
                  <BreadcrumbPage>{crumb}</BreadcrumbPage>
                </BreadcrumbItem>
              );

            return (
              <Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>{crumb}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto">
        <Logo />
      </div>
    </header>
  );
}
