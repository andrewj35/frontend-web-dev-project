import ListMedia from "./ListMedia";

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
