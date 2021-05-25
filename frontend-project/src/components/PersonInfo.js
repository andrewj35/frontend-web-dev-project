import { useState, useEffect } from "react";

const PersonInfo = ({ tmdbID }) => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState([]);
  // const [credits, setCredits] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      await fetch(
        "https://api.themoviedb.org/3/person/" +
          tmdbID +
          "?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US"
      )
        .then((res) => res.json())
        .then((res) => setPerson(res))
        .then(setLoading(false))
        .catch((error) => console.error(error));
    };
    fetchInfo();
  }, [tmdbID]);

  if (loading) {
    return <></>;
  } else {
    console.log(person);
    let image = "https://image.tmdb.org/t/p/original/";
    if (person) {
      if (person["profile_path"]) {
        image = image + person["profile_path"];
      } else {
        image =
          "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
      }
    } else {
      image =
        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
    }
    return (
      <div>
        {`profile_path` in person ? (
          person["profile_path"] ? (
            <img src={image} alt={`poster of ` + person["name"]}></img>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        <h1>{person["name"]}</h1>

        {`birthday` in person ? (
          person["birthday"] ? (
            <p>Birthday: {person["birthday"]}</p>
          ) : (
            <p>Birthday: Unknown</p>
          )
        ) : (
          <></>
        )}
        {`biography` in person ? <p>About: {person["biography"]}</p> : <></>}
        {`homepage` in person ? (
          person["homepage"] ? (
            <a href={person["homepage"]}>Homepage</a>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        {`place_of_birth` in person ? (
          <p>Place of birth: {person["place_of_birth"]}</p>
        ) : (
          <></>
        )}
        {`deathday` in person ? (
          person["deathday"] ? (
            <p>Died: {person["deathday"]}</p>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </div>
    );
  }
};

export default PersonInfo;

/**
 * Example series of calls:
 * https://api.themoviedb.org/3/person/287?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US
 * done*
 *
 * https://api.themoviedb.org/3/person/287/combined_credits?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US
 * OR
 * https://api.themoviedb.org/3/person/287/movie_credits?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US
 * and
 * https://api.themoviedb.org/3/person/287/tv_credits?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US
 *
 * then to get more info about a credit:
 * https://api.themoviedb.org/3/credit/52570765760ee3776a03124d?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US
 *
 *
 */
