import { useState, useEffect } from "react";

const TMDBCard = ({ type, id, element, title, year }) => {
  const [url, setURL] = useState();
  const [loading, setLoading] = useState(false);
  const [omdb, setOmdb] = useState(false);
  const [secondaryUrl, setURL2] = useState();

  let baseURL =
    window.location.protocol + "//" + window.location.host + "/info/";

  if (type === "/tv/") {
    id = id + "/external_ids";
  }

  // console.log(id);
  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      const res = await fetch(
        "https://api.themoviedb.org/3" +
          type +
          id +
          "?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US"
      )
        .then((res) => res.json())
        .catch((error) => console.error("fetch error:", error));
      // console.log(res);
      setURL(res["imdb_id"] + type + res["id"]);

      // making a call to omdb if there is no poster from tmdb
      if (type === "/tv/" || type === "/movie/") {
        if (!element["poster_path"]) {
          // console.log(element);
          const secondRes = await fetch(
            "https://www.omdbapi.com/?i=" + res["imdb_id"] + "&apikey=5371282f"
          )
            .then((res) => res.json())
            .catch((error) => setOmdb(false));
          // if we have a poster in the response
          if (secondRes["Response"] !== "False") {
            if (secondRes["Poster"] !== "N/A") {
              setURL2(secondRes["Poster"]);
              setOmdb(true);
            }
          }
        }
      }
      setLoading(false);
    };
    fetchMedia();
  }, [id, type, element]);

  if (loading) {
    return <></>;
  }

  // we may need to link, I'll ask Caterina though
  // <Link to={{ pathname: "/info", search: "id=" + url, hash: "" }}>

  // console.log(element);

  // error checking for edge cases when title isn't named something we would normally expect
  if (!(`title` in element)) {
    if (!(`original_title` in element)) {
      title = `name`;
    } else {
      title = `original_title`;
    }
  }

  let image = "https://image.tmdb.org/t/p/original/";
  if (!element["poster_path"] && omdb && !element["backdrop_path"]) {
    image = secondaryUrl;
  } else if (element["media_type"] === "person" && element["profile_path"]) {
    image = image + element["profile_path"];
  } else if (element["poster_path"]) {
    image = image + element["poster_path"];
  } else if (element["backdrop_path"]) {
    image = image + element["backdrop_path"];
  } else {
    // no image available - from wiki
    image =
      "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
  }

  return (
    <a href={baseURL + url}>
      <figure id={element[title]}>
        {`year` in element ? (
          <>
            <img
              className="center"
              src={image}
              alt={
                `poster for ` +
                element[title] +
                ` (` +
                element[year].substring(0, 4) +
                `)`
              }
              title={
                element[title] + ` (` + element[year].substring(0, 4) + `)`
              }
            />
            <figcaption>
              {element[title]} ({element[year].substring(0, 4)})
            </figcaption>
          </>
        ) : (
          <>
            <img
              className="center"
              src={image}
              alt={`poster for ` + element[title]}
              title={element[title]}
            />
            <figcaption>{element[title]}</figcaption>
          </>
        )}
      </figure>
    </a>
  );
};

export default TMDBCard;
