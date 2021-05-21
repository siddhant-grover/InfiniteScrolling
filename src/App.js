import { useState,useRef ,useCallback} from "react";

import useBookSearch from "./useBookSearch";

export default function App() {
  const observer = useRef()
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const {hasMore,loading,books,error} = useBookSearch(query, pageNumber);
  const lastBookElementRef = useCallback(node =>{ //node corresponds to the individual elm -> div ref={lastBookElemen
    console.log(node) //last bok title div
   
      if(loading) return  
      if(observer.current) observer.current.disconnect()

     
      observer.current = new IntersectionObserver((entries)=>{
      if(entries[0].isIntersecting && hasMore){//hasMore check as if we are out of elems , we dont wanna keep calling the api
        console.log('visible')
        setPageNumber(prev=>prev+1)
      }
    })

    if(node) observer.current.observe(node)
    
  },[loading,hasMore])
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
  {books.map((book,index)=>{
    if(books.length===index+1){
  return <div ref={lastBookElementRef} id={book}>{book}</div> //now whenever this element is created it is gonna call the function inside of useCallback , with the ref to itself (div element , we provided ref property to)
    }else{
      return <div id={book}>{book}</div>
    }
})}
      {loading&&<div>Loading....</div>}
      {error&&<div>Error</div>}

    </>

  )
}
