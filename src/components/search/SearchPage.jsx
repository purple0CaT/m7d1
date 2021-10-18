import React, { useEffect, useState } from "react";

export default function SearchPage({ searchQuery }) {
  const [SearchData, setSearchData] = useState([]);
  // FETCH
  const searchFetch = async (query) => {
    let url = `${process.env.REACT_APP_URLFETCH}/jobs`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // renew
  useEffect(() => {
    searchFetch(searchQuery);
  }, [searchQuery]);
  return (
    <div>
      <h6>{searchQuery}</h6>
    </div>
  );
}
