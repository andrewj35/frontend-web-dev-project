import DonutChart from "./DonutChart";
import { useState, useEffect } from "react";
import Person from "./PersonLink";

export default function Info(props) {
  const [media, setMedia] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [omdb, setOmdb] = useState(true);
  const [tmdb, setTmdb] = useState();

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      const res = await fetch(
        "https://www.omdbapi.com/?i=" +
          props["match"]["params"]["imdbID"] +
          "&apikey=5371282f"
      )
        .then((res) => res.json())
        .catch((error) => console.error("fetch error:", error));

      // we failed the first fetch to omdb, now we try TMDB, TV show
      if (res["Response"] === "False") {
        const resTV = await fetch(
          "https://api.themoviedb.org/3/tv/" +
            props["match"]["params"]["imdbID"] +
            "?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US"
        )
          .then((res) => res.json())
          .catch((error) => console.error("fetch error:", error));
        // try TMDB, movie
        if (resTV.success === false) {
          const resMovie = await fetch(
            "https://api.themoviedb.org/3/movie/" +
              props["match"]["params"]["imdbID"] +
              "?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US"
          )
            .then((res) => res.json())
            .catch((error) => console.error("fetch error:", error));
          const resCredits = await fetch(
            "https://api.themoviedb.org/3/movie/" +
              props["match"]["params"]["imdbID"] +
              "/credits?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US"
          )
            .then((res) => res.json())
            .catch((error) => console.error("fetch error:", error));
          setMedia(resMovie);
          setTmdb(resCredits);
        } else {
          const resCredits = await fetch(
            "https://api.themoviedb.org/3/tv/" +
              props["match"]["params"]["imdbID"] +
              "/credits?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US"
          )
            .then((res) => res.json())
            .catch((error) => console.error("fetch error:", error));
          setMedia(resTV);
          setTmdb(resCredits);
        }

        // flag that we have used TMDB to get the info, not OMDb
        setOmdb(false);
      } else {
        setMedia(res);
        // set page info here
        setRatings(res["Ratings"]);
      }

      setLoading(false);
    };
    fetchMedia();
  }, [props]);

  if (loading) {
    return <></>;
  }

  // console.log(media);
  // console.log(tmdb);

  // omdb fields
  if (omdb) {
    return (
      <div className="container">
        <h2>
          {media["Title"]} ({media["Year"]})
        </h2>
        <img
          src={media["Poster"]}
          alt={`poster for ` + media["Title"] + ` (` + media["Year"] + `)`}
        />
        <p>Plot: {media["Plot"]}</p>
        <p>Genre(s): {media["Genre"]}</p>
        {media["BoxOffice"] ? (
          <p key={media["BoxOffice"]}>Box Office: {media["BoxOffice"]}</p>
        ) : (
          <></>
        )}{" "}
        <p>Director(s): {media["Director"]}</p>
        <p>Cast: {media["Actors"]}</p>
        <p>Writers: {media["Writer"]}</p>
        <p>Runtime: {media["Runtime"]}</p>
        {ratings.map((each) => (
          <DonutChart rating={each} key={each["Source"]} />
        ))}
      </div>
    );
    // tmdb fields
  } else {
    return (
      <div className="container">
        <h2>
          {media["title"]} ({media["release_date"].slice(0, 4)})
        </h2>
        <img
          src={`https://image.tmdb.org/t/p/original/` + media["poster_path"]}
          alt={
            `poster for ` +
            media["title"] +
            ` (` +
            media["release_date"].slice(0, 4) +
            `)`
          }
        />
        <p>{media["overview"]}</p>
        {/* <p>Box Office: {media["revenue"]}</p> */}
        <p>
          Cast:{" "}
          {tmdb["cast"].map((each, i) =>
            i === tmdb["cast"].length - 1 ? (
              <Person key={each["id"]} id={each["id"]}></Person>
            ) : (
              each["name"] + `, `
            )
          )}
        </p>
        {media["budget"] ? (
          <p key={media["budget"]}>Budget: {media["budget"]}</p>
        ) : (
          <></>
        )}
        <p>
          Production Companies:{" "}
          {media["production_companies"].map((each, i) =>
            i === media["production_companies"].length - 1
              ? each["name"]
              : each["name"] + `, `
          )}
        </p>
        {tmdb["crew"].map((each) => (
          <p key={each["name"]}>{each["job"] + `: ` + each["name"]}</p>
        ))}
        {media["homepage"] ? (
          <p key={media["homepage"]}>Homepage: {media["homepage"]}</p>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
