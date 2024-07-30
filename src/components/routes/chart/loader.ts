import { defer } from "react-router-dom";

import axios from "axios";

export default async function loader() {
  const resArr = Promise.all([
    axios({}),
    axios({ params: { page: 2 } }),
    axios({ params: { page: 3 } }),
    axios({ params: { page: 4 } }),
    axios({ params: { page: 5 } }),
  ]);

  return defer({ resArr });
}
