import React from "react";
import { useState, useEffect } from "react";
import "./PopMovieList.css";

let list;

export const PopMovieList = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US&page=1"
    )
      .then((res) => res.json())
      .then((res) => {
        // example of how to get the search results from response
        // console.log(res.results);

        // example of how to get a singular result from the response
        list = res.results;

        // if the request has returned data we can use
        if (list) setLoading(false);
      })
      .catch((error) => console.log("fetch error:", error));
  }, []);

  // Give user some visual feedback while we are waiting on our request to return
  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

    // Load the page with the list of movie cards once our fetch call has returned
  } else {
    let items = [];
    let count = 1;

    list.forEach((element) => {
      items.push(
        <div class="grid-item" id="grid-item" tabIndex={count} key={count}>
          <figure id={element["title"]}>
            <img
              class="center"
              src={
                `https://image.tmdb.org/t/p/original/` + element["poster_path"]
              }
              alt={`poster of ` + element["title"]}
            ></img>
            <figcaption>{element["title"]}</figcaption>
          </figure>
        </div>
      );
      count++;
    });

    return <div className="grid-container">{items}</div>;
  }
};

export default PopMovieList;
