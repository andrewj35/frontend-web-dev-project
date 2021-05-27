import DonutChart from "./DonutChart";
import { useState, useEffect } from "react";
import PersonLink from "./PersonLink";
import Person from "./PersonInfo";
import "../styles/Info.css";

/**
 * Maybe be worth it to look into switching our tmdb search calls to
 * https://developers.themoviedb.org/3/find/find-by-id
 *
 * Edge case movies to test:
 * Mortal Kombal (omdb + tmdb)
 * 22 vs earth (only in tmdb, not omdb)
 * No-Input Pixels (no imdb id, no cast, only director)
 *
 * Things we can still output:
 * - providers (tmdb)
 * - display person page (output information - tmdb)
 * -
 */

export default function Info(props) {
  // error handling so we don't swallow exceptions from actual bugs in components
  const [error, setError] = useState(null);
  // Array of objects for our output
  const [media, setMedia] = useState([]);
  // Array of ratings, if omdb call was successful, to output
  const [ratings, setRatings] = useState();
  // If all the API fetch calls have been completed
  const [loading, setLoading] = useState(false);
  // Flag if omdb call was successful
  const [omdb, setOmdb] = useState(true);
  // Array of objects, if omdb call wasn't successful, to output
  const [tmdb, setTmdb] = useState([]);

  let [type] = useState(props["match"]["params"]["mediaType"]);
  let [id] = useState(props["match"]["params"]["imdbID"]);
  let [tmdbID] = useState(props["match"]["params"]["tmdbID"]);

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      const res = await fetch(
        "https://www.omdbapi.com/?i=" +
          id +
          "&apikey=" +
          process.env.REACT_APP_OMDB_API_KEY
      )
        .then(
          (res) => res.json(),
          (error) => {
            setError(error);
          }
        )
        .catch(() => setOmdb(false));

      // If omdb doesn't have the media, thus we need to get the information from tmdb
      if (
        res === undefined ||
        res.length === 0 ||
        res["Response"] === "False"
      ) {
        let specificRes = [];
        if (type !== "person" && type !== "null" && id !== "null") {
          specificRes = await fetch(
            "https://api.themoviedb.org/3/" +
              type +
              "/" +
              id +
              "?api_key=" +
              process.env.REACT_APP_TMDB_API_KEY +
              "&language=en-US"
          )
            .then(
              (res) => res.json(),
              (error) => {
                setError(error);
              }
            )
            .catch((err) => console.error("fetch error:", err));
        }
        if (specificRes.length === 0 || specificRes["success"] === false) {
          specificRes = await fetch(
            "https://api.themoviedb.org/3/" +
              type +
              "/" +
              tmdbID +
              "?api_key=" +
              process.env.REACT_APP_TMDB_API_KEY +
              "&language=en-US"
          )
            .then(
              (res) => res.json(),
              (error) => setError(error)
            )
            .catch((error) => console.error("fetch error:", error));
        }

        setMedia(specificRes);

        setOmdb(false); // we couldn't use omdb
      } else {
        setMedia(res);

        setRatings(res["Ratings"]);
      }

      // Always grab the list of credits - tmdb contains the most and we can link to profiles
      let resCredits = [];
      if (id !== "null")
        resCredits = await fetch(
          "https://api.themoviedb.org/3/" +
            type +
            "/" +
            id +
            "/credits?api_key=" +
            process.env.REACT_APP_TMDB_API_KEY +
            "&language=en-US"
        )
          .then((res) => res.json())
          .catch((error) => console.error("fetch error:", error));

      if (resCredits.length === 0 && tmdbID) {
        resCredits = await fetch(
          "https://api.themoviedb.org/3/" +
            type +
            "/" +
            tmdbID +
            "/credits?api_key=" +
            process.env.REACT_APP_TMDB_API_KEY +
            "&language=en-US"
        )
          .then((res) => res.json())
          .catch((error) => console.error("fetch error:", error));
      }
      setTmdb(resCredits);

      setLoading(false);
    };
    fetchMedia();
  }, [type, id, tmdbID]);

  if (error) {
    <div>Error: {error.message}</div>;
  } else if (loading) {
    return <></>;
  } else {
    if (omdb && media && tmdb !== []) {
      // console.log(media);
      return (
        <div className="container">
          <h2>
            {media["Title"]} ({media["Year"]})
          </h2>
          <div className="box1">
            <img
              src={media["Poster"]}
              width="300px"
              height="440px"
              alt={`poster for ` + media["Title"] + ` (` + media["Year"] + `)`}
            />
            <p>Plot: {media["Plot"]}</p>
            <p>Genre(s): {media["Genre"]}</p>

            {media["BoxOffice"] ? (
              <p key={media["BoxOffice"]}>Box Office: {media["BoxOffice"]}</p>
            ) : (
              <p></p>
            )}

            <p>Director(s): {media["Director"]}</p>

            {tmdb.length !== 0 && `cast` in tmdb ? (
              <p>
                Cast:{" "}
                {tmdb["cast"].map((each, i) =>
                  i === tmdb["cast"].length - 1 ? (
                    <PersonLink
                      key={each["id"]}
                      id={each["id"]}
                      last={true}
                      personName={each["name"]}
                    />
                  ) : (
                    <PersonLink
                      key={each["id"]}
                      id={each["id"]}
                      last={false}
                      personName={each["name"]}
                    />
                  )
                )}
              </p>
            ) : (
              <p>Cast: {media["Actors"]}</p>
            )}
            <p>Writers: {media["Writer"]}</p>
            <p>Runtime: {media["Runtime"]}</p>
          </div>
          <div className="box2">
            {ratings ? (
              ratings.map((each) => (
                <DonutChart rating={each} key={each["Source"]} />
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      );
      // tmdb only and a person wasn't selected
    } else if (type !== "person") {
      return (
        <div className="container">
          {`title` in media && `release_date` in media ? (
            <h2>
              {media["title"]} ({media["release_date"].slice(0, 4)})
            </h2>
          ) : (
            <h2>{media["title"]} </h2>
          )}
          <div className="TMDB-box">
            {`release_date` in media ? (
              <img
                height="350px"
                width="350px"
                src={
                  `https://image.tmdb.org/t/p/original/` + media["poster_path"]
                }
                alt={
                  `poster for ` +
                  media["title"] +
                  ` (` +
                  media["release_date"].slice(0, 4) +
                  `)`
                }
              />
            ) : (
              <img
                src={
                  `https://image.tmdb.org/t/p/original/` + media["poster_path"]
                }
                alt={`poster for ` + media["title"]}
              />
            )}

            <p>
              <br></br>
              <b>Overview: </b>
              <br></br> {media["overview"]}
            </p>
          </div>

          {/* <p>Box Office: {media["revenue"]}</p> */}
          <div className="TMDB-box2">
            <p>
              <br></br>
              Cast: <br></br>
              {tmdb["cast"].map((each, i) =>
                i === tmdb["cast"].length - 1 ? (
                  <PersonLink
                    key={each["id"]}
                    id={each["id"]}
                    last={true}
                    personName={each["name"]}
                  />
                ) : (
                  // each["name"] + `, `
                  <PersonLink
                    key={each["id"]}
                    id={each["id"]}
                    last={false}
                    personName={each["name"]}
                  />
                )
              )}
            </p>
            {media["budget"] ? (
              <p key={media["budget"]}>Budget: {media["budget"]}</p>
            ) : (
              <p></p>
            )}
            {`production_companies` in media ? (
              <p>
                Production Companies: <br></br>
                {media["production_companies"].map((each, i) =>
                  i === media["production_companies"].length - 1
                    ? each["name"]
                    : each["name"] + `, `
                )}
              </p>
            ) : (
              <p></p>
            )}

            {tmdb["crew"].map((each) => (
              <p key={each["name"]}>{each["job"] + `: ` + each["name"]}</p>
            ))}

            {media["homepage"] ? (
              <a href={media["homepage"]} key={media["homepage"]}>
                Homepage
              </a>
            ) : (
              <></>
            )}
          </div>
        </div>
      );
      // output person
    } else {
      return (
        <div className="container">
          <Person tmdbID={tmdbID} />
        </div>
      );
    }
  }
}
