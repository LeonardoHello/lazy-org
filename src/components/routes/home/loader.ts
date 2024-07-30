import axios from "axios";

export default async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");

  const { data } = await axios({ params: { search } });

  return { data, initialSearchInput: search };
}
