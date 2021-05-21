import axios from "axios";
import { useEffect, useState } from "react";

export default function useBookSearch(query, pageNumber) {
   
const [loading,setLoading] = useState(true)
const [error,setError] = useState(false)
const [books,setBooks]= useState([])
const [hasMore,setHasMore] = useState(false)
useEffect(()=>{
    setBooks([])
},[query])
  useEffect(() => { //[] version runs only once //this structure works as if this code was in the place of function called
    setLoading(true)
    setError(false)

    let cancel
    axios({
      method: "GET",
      url: "http://openlibrary.org/search.json",
      params: {
        q: query,
        page: pageNumber
      },
      headers: {
        "Content-Type": "application/json"
      },
      cancelToken: new axios.CancelToken((c)=>{ cancel = c }) //want to cancel the previous query if we are typing 
    })
      .then((res) => {
        console.log(res.data.docs);//100 docs at a time 
       // arr=res.data.docs
       setBooks(prevBooks=>{
        return [...new Set([...prevBooks,...(res.data.docs).map((doc)=>{
            return doc.title
        })])]//converting set to array
       }
    )
       setHasMore(res.data.docs.length > 0)//if no data is returned then set hasMore false
        setLoading(false)

        console.log(res.data.numFound);//number of docs found
      })
      .catch((err) => {
          if(axios.isCancel(err)) return //ignore error everytime we cancel the req.
        setError(true)
      });
      return ()=>cancel() //cancel our request on cleanup
  },[query,pageNumber]);

  return {loading,error,books,hasMore};
}
