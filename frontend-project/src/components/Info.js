import DonutChart from "./DonutChart";
import { useState, useEffect } from "react";
import PersonLink from "./PersonLink";

export default function Info(props) {
  const [media, setMedia] = useState([]);
  const [ratings, setRatings] = useState();
  const [loading, setLoading] = useState(false);
  const [omdb, setOmdb] = useState(true);
  const [tmdb, setTmdb] = useState([]);

  let [type] = useState(props["match"]["params"]["mediaType"]);
  let [id] = useState(props["match"]["params"]["imdbID"]);
  let [tmdbID] = useState(props["match"]["params"]["tmdbID"]);

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
        } else {
          console.log("person");
        }

        setOmdb(false); // we couldn't use omdb
      } else {
        setMedia(res);

        setRatings(res["Ratings"]);
      }

      let resCredits = await fetch(
        "https://api.themoviedb.org/3/" +
          type +
          "/" +
          id +
          "/credits?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US"
      )
        .then((res) => res.json())
        .catch((error) => console.error("fetch error:", error));

      if (resCredits["success"] === false && tmdbID) {
        resCredits = await fetch(
          "https://api.themoviedb.org/3/" +
            type +
            "/" +
            tmdbID +
            "/credits?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US"
        )
          .then((res) => res.json())
          .catch((error) => console.error("fetch error:", error));
      }
      setTmdb(resCredits);

      setLoading(false);
    };
    fetchMedia();
  }, [type, id, tmdbID]);

  if (loading) {
    return <></>;
  }

  // console.log(media);
  console.log(tmdb);

  if (omdb && media && tmdb !== []) {
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
        {ratings ? (
          ratings.map((each) => (
            <DonutChart rating={each} key={each["Source"]} />
          ))
        ) : (
          <>No ratings available</>
        )}
      </div>
    );
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
