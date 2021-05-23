import DonutChart from "./DonutChart";
import { useState, useEffect } from "react";
import Person from "./PersonLink";

export default function Info(props) {
  const [media, setMedia] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [omdb, setOmdb] = useState(true);
  const [tmdb, setTmdb] = useState([]);

  let [type, setType] = useState(props["match"]["params"]["mediaType"]);
  // setType(props["match"]["params"]["mediaType"]);

  let [id, setID] = useState(props["match"]["params"]["imdbID"]);
  // setID(props["match"]["params"]["imdbID"]);

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      const res = await fetch(
        "https://www.omdbapi.com/?i=" + id + "&apikey=5371282f"
      )
        .then((res) => res.json())
        .catch((error) => console.error("fetch error:", error));

      if (!res || res["Response"] === "False") {
        if (type !== "person") {
          const specificRes = await fetch(
            "https://api.themoviedb.org/3/" +
              type +
              "/" +
              id +
              "?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US"
          )
            .then((res) => res.json())
            .catch((error) => console.error("fetch error:", error));
          setMedia(specificRes);

          const resCredits = await fetch(
            "https://api.themoviedb.org/3/movie/" +
              id +
              "/credits?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US"
          )
            .then((res) => res.json())
            .catch((error) => console.error("fetch error:", error));
          setTmdb(resCredits);
        } else {
          console.log("person");
        }

        // setTmdb(specificRes);
        // // we failed the first fetch to omdb, now we try TMDB, TV show
        // if (res["Response"] === "False") {
        // const resTV = await fetch(
        //   "https://api.themoviedb.org/3/tv/" +
        //     props["match"]["params"]["imdbID"] +
        //     "?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US"
        // )
        //   .then((res) => res.json())
        //   .catch((error) => console.error("fetch error:", error));
        // // try TMDB, movie
        // if (resTV.success === false) {
        //   const resMovie = await fetch(
        //     "https://api.themoviedb.org/3/movie/" +
        //       props["match"]["params"]["imdbID"] +
        //       "?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US"
        //   )
        //     .then((res) => res.json())
        //     .catch((error) => console.error("fetch error:", error));
        //   const resCredits = await fetch(
        //     "https://api.themoviedb.org/3/movie/" +
        //       props["match"]["params"]["imdbID"] +
        //       "/credits?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US"
        //   )
        //     .then((res) => res.json())
        //     .catch((error) => console.error("fetch error:", error));
        //   setMedia(resMovie);
        //   setTmdb(resCredits);
        //   // try TMDB, tv
        // } else {
        //   const resCredits = await fetch(
        //     "https://api.themoviedb.org/3/tv/" +
        //       props["match"]["params"]["imdbID"] +
        //       "/credits?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US"
        //   )
        //     .then((res) => res.json())
        //     .catch((error) => console.error("fetch error:", error));
        //   setMedia(resTV);
        //   setTmdb(resCredits);
        // }

        // flag that we have used TMDB to get the info, not OMDb
        setOmdb(false);
      } else {
        setMedia(res);

        const resCredits = await fetch(
          "https://api.themoviedb.org/3/movie/" +
            id +
            "/credits?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US"
        )
          .then((res) => res.json())
          .catch((error) => console.error("fetch error:", error));

        setTmdb(resCredits);

        setRatings(res["Ratings"]);
      }

      setLoading(false);
    };
    fetchMedia();
  }, [type, id]);

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
        {tmdb ? (
          <p>
            Cast:{" "}
            {tmdb["cast"].map((each, i) =>
              i === tmdb["cast"].length - 1 ? (
                <Person
                  key={each["id"]}
                  id={each["id"]}
                  last={true}
                  personName={each["name"]}
                ></Person>
              ) : (
                // each["name"] + `, `
                <Person
                  key={each["id"]}
                  id={each["id"]}
                  last={false}
                  personName={each["name"]}
                ></Person>
              )
            )}
          </p>
        ) : (
          <p>Cast: {media["Actors"]}</p>
        )}
        <p>Writers: {media["Writer"]}</p>
        <p>Runtime: {media["Runtime"]}</p>
        {ratings ? (
          ratings.map((each) => (
            <DonutChart rating={each} key={each["Source"]} />
          ))
        ) : (
          <></>
        )}
      </div>
    );
    // tmdb fields
  } else if (props["match"]["params"]["mediaType"] !== "person") {
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
              <Person
                key={each["id"]}
                id={each["id"]}
                last={true}
                personName={each["name"]}
              ></Person>
            ) : (
              // each["name"] + `, `
              <Person
                key={each["id"]}
                id={each["id"]}
                last={false}
                personName={each["name"]}
              ></Person>
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
  } else {
    return (
      <div className="container">
        <p>nice</p>
      </div>
    );
  }
}
