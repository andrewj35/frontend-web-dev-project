import "./Home.css";
import PopMovieList from "./ListMovies";

export default function Home(props) {
  // console.log(props["match"]["params"]["pageNumber"]);
  return (
    <div>
      <h1>Popular Movies</h1>
      <PopMovieList
        param={"/movie/popular"}
        page={props["match"]["params"]["pageNumber"]}
      />
    </div>
  );
}
