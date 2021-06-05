import ListMedia from "./ListMedia";

/**
 * Invokes ListMedia with itself identified as the Top Rated TV Show page with the page #
 * @param {*} props
 * @returns List of movies with pagination
 */
export default function TopRatedTVShows(props) {
  return (
    <div>
      <h1>Top Rated TV Shows</h1>
      <ListMedia
        param={"/tv/top_rated"}
        page={props["match"]["params"]["page"]}
      />
    </div>
  );
}
