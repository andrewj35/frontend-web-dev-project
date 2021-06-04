import DonutChart from "./DonutChart";
import { useState, useEffect } from "react";
import PersonLink from "./PersonLink";
import Person from "./PersonInfo";
import "../styles/Info.css";

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

  const [type] = useState(props["match"]["params"]["mediaType"]);
  const [id] = useState(props["match"]["params"]["imdbID"]);
  const [tmdbID] = useState(props["match"]["params"]["tmdbID"]);

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
          ).then(
            (res) => res.json(),
            (error) => {
              setError(error);
            }
          );
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
          ).then(
            (res) => res.json(),
            (error) => setError(error)
          );
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

      if (
        (resCredits.length === undefined || resCredits.length === 0) &&
        tmdbID
      ) {
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
    // if we have omdb, media, and tmdb isn't empty aka movie
    if (omdb && media && tmdb !== []) {
      return (
        <div className="container">
          {`Title` in media && `Year` in media ? (
            <h2>
              {media["Title"]} ({media["Year"]})
            </h2>
          ) : `Title` in media ? (
            // if Title is in the object it SHOULD have a title
            <h2>{media["Title"]}</h2>
          ) : (
            // output nothing if neither title nor year in object
            <></>
          )}

          <div className="box1">
            {`Poster` in media ? (
              media["Poster"] ? (
                <img
                  src={media["Poster"]}
                  width="300px"
                  height="440px"
                  alt={
                    `poster for ` + media["Title"] + ` (` + media["Year"] + `)`
                  }
                />
              ) : (
                // Poster field is empty
                <></>
              )
            ) : (
              // Poster isn't in media
              <></>
            )}</div>
          <div className="Box1a">
            {`Plot` in media ? (
              media["Plot"] ? (
                <p>Plot: {media["Plot"]}</p>
              ) : (
                // Plot is empty
                <></>
              )
            ) : (
              // Plot isn't in object
              <></>
            )}
            {`Genre` in media ? (
              media["Genre"] ? (
                <p>Genre(s): {media["Genre"]}</p>
              ) : (
                // Genre is empty
                <></>
              )
            ) : (
              // Genre isn't in object
              <></>
            )}

            {`BoxOffice` in media ? (
              media["BoxOffice"] ? (
                <p key={media["BoxOffice"]}>Box Office: {media["BoxOffice"]}</p>
              ) : (
                // BoxOffice is empty
                <></>
              )
            ) : (
              // BoxOffice isn't in object
              <></>
            )}

            <p>Director(s): {media["Director"]}</p>

            {tmdb.length !== 0 && `cast` in tmdb ? (
              <p>
                Cast:
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
            {`BoxOffice` in media ? (
              media["BoxOffice"] ? (
                <p key={media["BoxOffice"]}>Box Office: {media["BoxOffice"]}</p>
              ) : (
                // BoxOffice is empty
                <></>
              )
            ) : (
              // BoxOffice isn't in object
              <></>
            )}

            {`Writer` in media ? (
              media["Writer"] ? (
                <p>Writers: {media["Writer"]}</p>
              ) : (
                // Writer is empty
                <></>
              )
            ) : (
              // Writer isn't in object
              <></>
            )}
            {`Runtime` in media ? (
              <p>Runtime: {media["Runtime"]}</p>
            ) : (
              // Runtime isn't in object
              <></>
            )}
          </div>

          {ratings ? (
            <div className="box2">
              {ratings.map((each) => (
                <DonutChart rating={each} key={each["Source"]} />
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      );
      // tv show
    } else if (type !== "person") {
      return (
        <div className="container">
          {`title` in media && `release_date` in media ? (
            <h2>
              {media["title"]} ({media["release_date"].slice(0, 4)})
            </h2>
          ) : `title` in media ? (
            <h2>{media["title"]} </h2>
          ) : (
            <h2>Unknown {type}</h2>
          )}
          {`release_date` in media || `overview` in media ? (
            <div className="TMDB-box">
              {`release_date` in media ? (
                media["release_date"] ? (
                  <img
                    height="350px"
                    width="350px"
                    src={
                      `https://image.tmdb.org/t/p/original/` +
                      media["poster_path"]
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
                      `https://image.tmdb.org/t/p/original/` +
                      media["poster_path"]
                    }
                    alt={`poster for ` + media["title"]}
                  />
                )
              ) : (
                <></>
              )}
              {`overview` in media ? (
                media["overview"] ? (
                  <p>
                    <br></br>
                    <b>Overview: </b>
                    <br></br> {media["overview"]}
                  </p>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}

          {`cast` in tmdb ||
          `budget` in media ||
          `production_companies` in media ||
          `crew` in tmdb ||
          `homepage` in media ? (
            <div className="TMDB-box2">
              {`cast` in tmdb ? (
                tmdb["cast"] ? (
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
                ) : (
                  // cast is empty - haven't seen a case but just in case we have this
                  <></>
                )
              ) : (
                // cast not in object
                <></>
              )}
              {`budget` in media ? (
                media["budget"] ? (
                  <p key={media["budget"]}>Budget: {media["budget"]}</p>
                ) : (
                  // budget not set
                  <></>
                )
              ) : (
                // budget not in media
                <></>
              )}
              {`production_companies` in media ? (
                media["production_companies"] ? (
                  <p>
                    Production Companies: <br></br>
                    {media["production_companies"].map((each, i) =>
                      i === media["production_companies"].length - 1
                        ? each["name"]
                        : each["name"] + `, `
                    )}
                  </p>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}

              {`crew` in tmdb ? (
                tmdb["crew"] ? (
                  tmdb["crew"].map((each) => (
                    <p key={each["name"]}>
                      {each["job"] + `: ` + each["name"]}
                    </p>
                  ))
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}

              {`homepage` in media ? (
                media["homepage"] ? (
                  <a href={media["homepage"]} key={media["homepage"]}>
                    Homepage
                  </a>
                ) : (
                  // homepage not set
                  <></>
                )
              ) : (
                // homepage not in object
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
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
