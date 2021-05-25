// import { params } from "../App";
//import "./Results.css";
import { useState, useEffect } from "react";
import { CardList } from "../searchComponent/cardList";

export default function Results(props) {
  const [isLoading, setLoading] = useState(true);
  const [resultsArray, setResults] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      fetch(
        "https://www.omdbapi.com/?s=" +
          props["match"]["params"]["title"] +
          "&apikey=5371282f"
      )
        .then((res) => res.json())
        .then((res) => {
          // example of how to get the search results from response
          setResults(res["Search"]);

          // if the request has returned data we can use
          if (resultsArray) setLoading(false);
        })
        .catch((error) => console.log("fetch error:", error));
    };
    fetchMedia();
  }, [props, resultsArray]);

  // Give user some visual feedback while we are waiting on our request to return
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else if (resultsArray === undefined) {
    return (
      <>
        <h2>No results</h2>
      </>
    );
  } else {
    // resultsArray.map((each) => console.log(each));
    return (
      <>
        <CardList results={resultsArray} />
      </>
    );
  }
}
