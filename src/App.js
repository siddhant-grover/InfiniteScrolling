import { useState } from "react";

import useBookSearch from "./useBookSearch";

export default function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
 const {hasMore,loading,books,error} = useBookSearch(query, pageNumber);

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPageNumber(1);
        }}
      />
  {books.map(book=>{

  return (<div id="book">{book}</div>)

})}
      {loading&&<div>Loading....</div>}
      {error&&<div>Error</div>}

    </>

  )
}
