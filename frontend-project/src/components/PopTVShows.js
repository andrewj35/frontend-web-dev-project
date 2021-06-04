import ListMedia from "./ListMedia";

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
