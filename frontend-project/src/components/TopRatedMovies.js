import ListMedia from "./ListMedia";

/**
 * Invokes ListMedia with itself identified as the Top Rated Movie page with the page #
 * @param {*} props
 * @returns List of movies with pagination
 */
export default function TopRatedMovies(props) {
  return (
    <div>
      <h1>Top Rated Movies</h1>
      <ListMedia
        param={"/movie/top_rated"}
        page={props["match"]["params"]["page"]}
      />
    </div>
  );
}
