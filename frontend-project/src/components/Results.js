import { useState, useEffect } from "react";
import PosterGrid from "./PosterGrid";
import Pagination from "react-js-pagination";

export default function Results(props) {
  const [loading, setLoading] = useState(true);
  let [resultsArray, setResults] = useState([]);
  let [page, setPage] = useState(parseInt(props["match"]["params"]["page"]));
  const [total_pages, setTotal_pages] = useState(1);

  function changePage(event) {
    window.history.pushState(
      {},
      "",
      window.location.protocol +
        "//" +
        window.location.host +
        "/results/" +
        props["match"]["params"]["title"] +
        "/" +
        event
    );
    setPage(event);
  }

  // console.log(id);

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      fetch(
        "https://api.themoviedb.org/3/search/multi?query=" +
          props["match"]["params"]["title"] +
          "&api_key=" +
          process.env.REACT_APP_TMDB_API_KEY +
          "&language=en-US&page=" +
          page
      )
        .then((res) => res.json())
        .then((res) => {
          setTotal_pages(parseInt(res["total_pages"]));
          setResults(res["results"]);
          setLoading(false);
        })
        .catch((error) => console.log("fetch error:", error));
        
        // console.log(res);
    };
    fetchMedia();
  }, [props, page]);

  if (loading) {
    return <></>;
  }

  if (resultsArray.length === 0) {
    return (
      <>
        <h2>
          No results
          {/* Displays no results when the results array is 0 */}
          </h2>
      </>
    );
  } else {
    return (
      <div>
        <h1>
          Results for: {props["match"]["params"]["title"]}
          {/* Dispalys results for the searched movie/Tv show */}
          </h1>
        <div className="container">
          <PosterGrid media={resultsArray} loading={loading} param={"any"} />
          <br />
          <div className="pagination justify-content-center">
            <Pagination
              itemClass="page-item"
              linkClass="page-link"
              itemsCountPerPage={20}
              activePage={page}
              totalItemsCount={total_pages * 20}
              pageRangeDisplayed={5}
              onChange={(event) => changePage(event)}
              hideNavigation={true}
            />
          </div>
          <br />
        </div>
      </div>
    );
  }
}


// Initially we used omdb api
// import { params } from "../App";
// import "./Results.css";
// import { useState, useEffect } from "react";
// import {CardList} from "../searchComponent/cardList";

// export default function Results(props) {
//   const [isLoading, setLoading] = useState(true);
//   const [resultsArray, setResults] = useState([]);

//   useEffect(() => {
//     const fetchMedia = async () => {
//       fetch(
//         "https://www.omdbapi.com/?s=" +
//           props["match"]["params"]["title"] +
//           "&apikey=5371282f"
//       )
//         .then((res) => res.json())
//         .then((res) => {
//           // example of how to get the search results from response
//           setResults(res["Search"]);

//           // if the request has returned data we can use
//           if (resultsArray) setLoading(false);
//         })
//         .catch((error) => console.log("fetch error:", error));
//     };
//     fetchMedia();
//   }, [props, resultsArray]);

//   // Give user some visual feedback while we are waiting on our request to return
//   if (isLoading) {
//     return (
//      <div>
//         <h1>
//            Loading...
//          </h1>
//        </div>
//     );
//   } else if (resultsArray === undefined) {
//    return (
//      <>
//        <h2>
//          No results
//         </h2>
//       </>
//     );
//   } else {
//     // resultsArray.map((each) => console.log(each));
//     return (
//       <>
//        <CardList results = 
//               {resultsArray} />
//      </>
//     );
//   }
// }
