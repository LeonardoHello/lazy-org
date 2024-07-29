import { Link } from "react-router-dom";

import { Building } from "lucide-react";

export default function Logo() {
  return (
    <Link
      to="/"
      className="group flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
    >
      <Building className="h-6 w-6 transition-all group-hover:scale-110 md:h-4 md:w-4" />
      <span className="sr-only">LazyOrg</span>
    </Link>
  );
}
