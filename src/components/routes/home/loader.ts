export default async function loader() {
  const res = await fetch("http://localhost:8000/api/employees");

  if (!res.ok) {
    throw new Response("", {
      status: 500,
      statusText: "Failed to fetch employees",
    });
  }

  return res.json();
}
