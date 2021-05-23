import React from "react";
import { useState, useEffect } from "react";
import "./ListMedia.css";
import PosterGrid from "./PosterGrid";
import Pagination from "react-js-pagination";

const ListMedia = (props) => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  let [page, setPage] = useState();
  let [total_pages, setTotal_pages] = useState(1);

  let param = props["param"];

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
      // total_pages = res.total_pages;
      setTotal_pages(res.total_pages);
      setLoading(false);
    };

    fetchMedia();
  }, [param, page]); // there is a dependency on param being initialized - if we could get rid of it it'd be nice

  // console.log(media);

  // return the container with the Movies and Pagination children components
  return (
    <>
      <div className="container">
        <PosterGrid media={media} loading={loading} param={props["param"]} />
        <br />
        <div className="pagination justify-content-center">
          <Pagination
            itemClass="page-item"
            linkClass="page-link"
            itemsCountPerPage={20}
            activePage={page}
            totalItemsCount={total_pages * 20}
            pageRangeDisplayed={5}
            onChange={(event) => setPage(event)}
            hideNavigation={true}
          />
        </div>
        <br />
      </div>
    </>
  );
};

export default ListMedia;
