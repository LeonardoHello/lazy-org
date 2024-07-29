import { Employee } from "@/types/database";

export default function HomeTableDialog({ employee }: { employee: Employee }) {
  return (
    <div className="mt-6 border-t border-border">
      <dl className="divide-y divide-border">
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6">Full name</dt>
          <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
            {employee.firstName} {employee.lastName}
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6">Position</dt>
          <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
            {employee.position}
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6">Email address</dt>
          <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
            {employee.email}
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6">Contact number</dt>
          <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
            {employee.contactNumber}
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6">Address</dt>
          <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
            {employee.adress}
          </dd>
        </div>
        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6">About</dt>
          <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
            {employee.about}
          </dd>
        </div>
      </dl>
    </div>
  );
}
