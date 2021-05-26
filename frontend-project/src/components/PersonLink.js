import { useState, useEffect } from "react";
import "../styles/personInfo.css";

const PersonLink = ({ id, last, personName }) => {
  let [person, setPerson] = useState();
  // let [credits, setCredits] = useState();
  const [loading, setLoading] = useState(false);

  let baseURL =
    window.location.protocol + "//" + window.location.host + "/info/";

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      const getDetails = await fetch(
        "https://api.themoviedb.org/3/person/" +
          id +
          "?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US"
      )
        .then((res) => res.json())
        .catch((error) => console.error("fetch error:", error));

      setPerson(getDetails);
      // setCredits(getCredits);
      setLoading(false);
    };
    fetchInfo();
  }, [id]);

  // console.log(typeof personName);
  // console.log(credits);

  if (loading) {
    return <></>;
  }

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
};

export default PersonLink;
