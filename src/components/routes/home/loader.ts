export default async function loader() {
  const res = await fetch("http://localhost:8000/api/employees");

  if (!res.ok) {
    console.error("Failed to fetch employees");
    throw new Error("");
  }

  return res.json();
}
