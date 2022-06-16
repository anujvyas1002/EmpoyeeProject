import { useEffect, useState } from "react";

import axios from "axios";


function SearchEmployee() {
  const [query, setQuery] = useState("");
 

 

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:3000/employees?q=${query}`);
      console.log(res);
    };
    if (query.length === 0 || query.length > 2) fetchData();
  }, [query]);


  return (
    <div className="container">
        <input
          className="search float-end  mt-2"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
        />
    </div>
  );
}

export default SearchEmployee;
