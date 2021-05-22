import { useState, useEffect } from "react";

const GetID = ({ type, id, element, title, year }) => {
  const [url, setURL] = useState();
  const [loading, setLoading] = useState(false);

  let baseURL =
    window.location.protocol + "//" + window.location.host + "/info/";
  if (type === "/tv/") {
    id = id + "/external_ids";
  }
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
      //   console.log(res);
      setURL(res["imdb_id"]);
      setLoading(false);
    };
    fetchMedia();
  }, [id, type]);

  if (loading) {
    return <></>;
  }

  return (
    <a href={baseURL + url}>
      <figure id={element[title]}>
        <img
          className="center"
          src={`https://image.tmdb.org/t/p/original/` + element["poster_path"]}
          alt={
            `poster for ` +
            element[title] +
            ` (` +
            element[year].substring(0, 4) +
            `)`
          }
          title={element[title] + ` (` + element[year].substring(0, 4) + `)`}
        ></img>
        <figcaption>
          {element[title]} ({element[year].substring(0, 4)})
        </figcaption>
      </figure>
    </a>
  );
};

export default GetID;
