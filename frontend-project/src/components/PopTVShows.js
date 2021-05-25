import ListMedia from "./ListMedia";

export default function PopTVShows(props) {
  // console.log(props["match"]["params"]["pageNumber"]);
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
