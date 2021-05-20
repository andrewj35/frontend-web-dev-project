import React from "react";
import { useState, useEffect } from "react";
import "./ListMovies.css";
import Pages from "./Pages";
import Movies from "./Movies";

let total_pages;
let page;

const ListMovies = (props) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  let param = props["param"];
  page = props["page"];

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const res = await fetch(
        "https://api.themoviedb.org/3" +
          param +
          "?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US&page=" +
          page
      )
        .then((res) => res.json())
        .catch((error) => console.error("fetch error:", error));
      setMovies(res.results);
      page = res.page;
      total_pages = res.total_pages;
      setLoading(false);
    };

    fetchMovies();
  }, [param]); // will only load when it mounts

  return (
    <div className="container">
      <Movies movies={movies} loading={loading} />
      <Pages page={page} loading={loading} total_pages={total_pages} />
    </div>
  );
};

// const ListMovies = (props) => {
//   const [isLoading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchMovies = () => {
//       fetch(
//         "https://api.themoviedb.org/3" +
//           props["param"] +
//           "?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US&page=1"
//       )
//         .then((res) => res.json())
//         .then((res) => {
//           // example of how to get the search results from response
//           // console.log(res.results);

//           // example of how to get a singular result from the response
//           list = res.results;
//           total_pages = res.total_pages;

//           // if the request has returned data we can use
//           if (list) setLoading(false);
//         })
//         .catch((error) => console.log("fetch error:", error));
//     };
//     fetchMovies();
//   }, [props]);

//   // Give user some visual feedback while we are waiting on our request to return
//   if (isLoading && list === undefined) {
//     return (
//       <div>
//         <h1>Loading...</h1>
//       </div>
//     );

//     // Load the page with the list of movie cards once our fetch call has returned
//   } else {
//     let items = [];
//     let count = 1;

//     list.forEach((element) => {
//       items.push(
//         <div className="grid-item" id="grid-item" tabIndex={count} key={count}>
//           <figure id={element["title"]}>
//             <img
//               className="center"
//               src={
//                 `https://image.tmdb.org/t/p/original/` + element["poster_path"]
//               }
//               alt={`poster of ` + element["title"]}
//               title={element["title"]}
//             ></img>
//             <figcaption>{element["title"]}</figcaption>
//           </figure>
//         </div>
//       );
//       count++;
//     });

//     console.log(total_pages);

//     return (
//       <>
//         <div className="grid-container">{items}</div>
//         <Pagination></Pagination>
//       </>
//     );
//   }
// };

export default ListMovies;
