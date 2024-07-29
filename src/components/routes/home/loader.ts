export default async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const res = await fetch(
    "http://localhost:8000/api/employees?" + searchParams,
  );

  if (!res.ok) {
    throw new Response("", {
      status: 500,
      statusText: "Failed to fetch employees",
    });
  }

  const data = await res.json();
  return { data, initialSearchInput: searchParams.get("search") ?? "" };
}
