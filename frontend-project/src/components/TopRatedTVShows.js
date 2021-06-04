import ListMedia from "./ListMedia";

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
