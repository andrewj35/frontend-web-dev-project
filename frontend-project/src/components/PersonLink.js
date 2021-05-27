import { useState, useEffect } from "react";
import "../styles/personInfo.css";

const PersonLink = ({ id, last, personName }) => {
  // error handling so we don't swallow exceptions from actual bugs in components
  const [error, setError] = useState(null);
  let [person, setPerson] = useState();
  // let [credits, setCredits] = useState();
  const [loading, setLoading] = useState(false);

  let baseURL =
    window.location.protocol + "//" + window.location.host + "/info/";

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      await fetch(
        "https://api.themoviedb.org/3/person/" +
          id +
          "?api_key=" +
          process.env.REACT_APP_TMDB_API_KEY +
          "&language=en-US"
      )
        .then((res) => res.json())
        .then(
          (result) => {
            setPerson(result);
            setLoading(false);
          },
          (error) => {
            setError(error);
            setLoading(false);
          }
        );
    };
    fetchInfo();
  }, [id]);

  // console.log(typeof personName);
  // console.log(credits);

  if (error) {
    return <div>Error: {error.messsage}</div>;
  } else if (loading) {
    return <></>;
  } else {
    if (person) {
      let name = person["name"];
      if (!last) {
        name = name + ",";
      }
      return (
        <a
          href={baseURL + person["tmdb_id"] + "/person/" + person["id"]}
          key={id}
        >
          {name}{" "}
        </a>
      );
    } else {
      return personName;
    }
  }
};

export default PersonLink;
