import ListMedia from "./ListMedia";

/**
 * Invokes ListMedia with itself identified as the Popular Movie page with the page #
 * @param {*} props
 * @returns List of movies with pagination
 */
export default function PopMovies(props) {
  return (
    <div>
      <h1>Popular Movies</h1>
      <ListMedia
        param={"/movie/popular"}
        page={props["match"]["params"]["page"]}
      />
    </div>
  );
}
