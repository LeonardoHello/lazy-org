import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom";

import { AxiosError } from "axios";

export default function Error() {
  const error = useRouteError();

  // in case a response is thrown from an action or loader
  if (isRouteErrorResponse(error)) {
    return (
      <main className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">
            {error.status}
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            {error.statusText}
          </h1>
          {error.data?.message && (
            <p className="mt-6 text-base leading-7 text-gray-400">
              {error.data.message}
            </p>
          )}
          <ErrorNavigation />
        </div>
      </main>
    );
  }

  if (error instanceof AxiosError && error.response) {
    return (
      <main className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">
            {error.response.status}
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            {error.response.statusText}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-400">
            {error.response.data?.message}
          </p>
          <ErrorNavigation />
        </div>
      </main>
    );
  }

  // default error response
  return (
    <main className="grid min-h-screen place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">500</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Something went wrong!
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-400">
          The Monkeys Have Taken Over the Database!
        </p>
        <ErrorNavigation />
      </div>
    </main>
  );
}

function ErrorNavigation() {
  return (
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <Link
        to="/"
        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Home
      </Link>
      <a href="../" className="text-sm font-semibold">
        Go back <span aria-hidden="true">&rarr;</span>
      </a>
    </div>
  );
}
