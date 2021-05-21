import axios from "axios";
import { useEffect, useState } from "react";

export default function useBookSearch(query, pageNumber) {
   
const [loading,setLoading] = useState(true)
const [erroe,setError] = useState(false)
const [books,setBooks]= useState([])
  useEffect(() => { //[] version runs only once //this structure works as if this code was in the place of function called
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
        console.log(res.data.numFound);//number of docs found
      })
      .catch((err) => {
          if(axios.isCancel(err)) return //ignore error everytime we cancel the req.
        console.log(err);
      });
      return ()=>cancel() //cancel our request on cleanup
  },[query,pageNumber]);

  return null;
}
