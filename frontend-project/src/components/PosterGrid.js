import TMDBCard from "./TMDBCard";

const PosterGrid = ({ media, loading, param }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  } else {
    let items = [];
    let count = 1; // so we can uniquely identify our key values

    // These will be used to get correct information from the returned object depending on media type (movie vs tv show)
    // console.log(media);
    media.forEach((element) => {
      let title = "title";
      let year = "release_date";
      let type = "/movie/";
      // console.log(param);
      if (param === "/tv/popular" || param === "/tv/top_rated") {
        title = "name";
        year = "first_air_date";
        type = "/tv/";
      } else if (param !== "/movie/popular" && param !== "/movie/top_rated") {
        if (element["media_type"] === "tv") {
          title = "name";
          year = "first_air_date";
          type = "/tv/";
        } else if (element["media_type"] === "movie") {
          // movie
          title = "title";
          year = "release_date";
          type = "/movie/";
        } else {
          // person
          title = "name";
          year = "release_date";
          type = "/person/";
        }
      }
      // console.log(element);
      items.push(
        // <div className="grid-item" id="grid-item" tabIndex={count} key={count}>
        <div className="grid-item" id="grid-item" key={count}>
          <TMDBCard
            type={type}
            id={element["id"]}
            element={element}
            title={title}
            year={year}
          />
        </div>
      );
      count++;
    });

    return (
      <>
        <div className="grid-container">{items}</div>
      </>
    );
  }
};

export default PosterGrid;
