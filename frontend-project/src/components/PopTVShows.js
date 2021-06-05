import ListMedia from "./ListMedia";

/**
 * Invokes ListMedia with itself identified as the Popular TV Show page with the page #
 * @param {*} props
 * @returns List of movies with pagination
 */
export default function PopTVShows(props) {
  return (
    <div>
      <h1>Popular TV Shows</h1>
      <ListMedia
        param={"/tv/popular"}
        page={props["match"]["params"]["page"]}
      />
    </div>
  );
}
