import React from "react";
import { useState, useEffect } from "react";
import "./ListMedia.css";
import Pages from "./Pages";
import PosterGrid from "./PosterGrid";

let total_pages;
let page;

const ListMedia = (props) => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);

  let param = props["param"];
  page = props["page"];

  useEffect(() => {
    const fetchMedia = async () => {
      setLoading(true);
      const res = await fetch(
        "https://api.themoviedb.org/3" +
          param +
          "?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US&page=" +
          page
      )
        .then((res) => res.json())
        .catch((error) => console.error("fetch error:", error));
      setMedia(res.results);
      page = res.page;
      total_pages = res.total_pages;
      setLoading(false);
    };

    fetchMedia();
  }, [param]); // there is a dependency on param being initialized - if we could get rid of it it'd be nice

  // return the container with the Movies and Pagination children components
  return (
    <div className="container">
      <PosterGrid media={media} loading={loading} param={props["param"]} />
      <br />
      <Pages
        page={page}
        loading={loading}
        total_pages={total_pages}
        param={props["param"]}
      />
    </div>
  );
};

export default ListMedia;
