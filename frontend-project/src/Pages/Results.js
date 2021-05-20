import { params } from "../App";
import "./Results.css";
import { useState, useEffect } from "react";
let search = "";
let result;

export default function Results() {
  // Check if we are searching for the first time or a new search
  if (params && (search === "" || search !== params)) {
    search = params;
  }

  const [isLoading, setLoading] = useState(true);
  const [resultsArray, setResults] = useState([]);


  useEffect(() => {
    fetch("https://www.omdbapi.com/?s=" + search + "&apikey=5371282f")
      .then((res) => res.json())
      .then((res) => {
        // example of how to get the search results from response
        console.log(res["Search"]);

        // example of how to get a singular result from the response
        result = res["Search"][0]["Title"];

        // if the request has returned data we can use
        if (result) setLoading(false);
      })
      .catch((error) => console.log("fetch error:", error));
  }, []);

  // Give user some visual feedback while we are waiting on our request to return
  if (isLoading && search !== "") {
    return (
      <div>
        {/* <h1>Results</h1> */}
        <h1>Loading...</h1>
      </div>
    );
  } else if (!isLoading && search === "") {
    return (
      <div>
        {/* <h1>Results</h1> */}
        <h1>Invalid query</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Results</h1>
      <h2>{result}</h2>
    </div>
  );
}
