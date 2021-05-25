import "./PopMovies.css";
import ListMedia from "./ListMedia";


export default function PopMovies(props) {
  // console.log(props["match"]["params"]["pageNumber"]);
  return (
    <div className="current">
      <h1>Popular Movies</h1>
      <ListMedia
        param={"/movie/popular"}
        page={props["match"]["params"]["pageNumber"]}
      />
    </div>
  );
}
