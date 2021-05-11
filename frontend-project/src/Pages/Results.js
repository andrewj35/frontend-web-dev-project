import { params } from "../App";
import "./Results.css";

let search = "";

export default function Results() {
  // Check if we are searching for the first time or a new search
  if (params && (search === "" || search !== params)) {
    search = params;
  }

  return (
    <div>
      <h1>Results</h1>
      <Child name={params} />
    </div>
  );
}

/**
 * Just a function to test if we're getting the correct input from our search bar
 * @param {*} param0
 * @returns
 */
function Child({ name }) {
  return (
    <div>
      {name ? <h2>{name}</h2> : <h2>There is no name in the query string</h2>}
    </div>
  );
}
