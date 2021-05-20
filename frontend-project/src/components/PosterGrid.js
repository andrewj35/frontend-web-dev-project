const PosterGrid = ({ media, loading, param }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  } else {
    let items = [];
    let count = 1;
    let title = "title";

    if (param === "/tv/popular" || param === "/tv/top_rated") {
      title = "name";
    }
    media.forEach((element) => {
      items.push(
        <div className="grid-item" id="grid-item" tabIndex={count} key={count}>
          <figure id={element[title]}>
            <img
              className="center"
              src={
                `https://image.tmdb.org/t/p/original/` + element["poster_path"]
              }
              alt={`poster for ` + element[title]}
              title={element[title]}
            ></img>
            <figcaption>{element[title]}</figcaption>
          </figure>
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
