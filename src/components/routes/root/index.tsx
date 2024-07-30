import { Outlet } from "react-router-dom";

import { Aside } from "@/components/aside";
import { Header } from "@/components/header";

export default function Root() {
  return (
    <div className="flex flex-col bg-muted/40">
      <Aside />
      <div className="flex min-h-screen flex-col sm:gap-6 sm:pl-14">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
