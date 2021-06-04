import ListMedia from "./ListMedia";

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
