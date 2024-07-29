export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  imageUrl: string;
  contactNumber: string;
  email: string;
  manager_id: number | null;
  created_at: string;
  updated_at: string;
};

export type EmployeePagination = {
  current_page: number;
  data: Employee[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};
