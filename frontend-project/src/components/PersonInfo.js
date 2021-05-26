import { useState, useEffect } from "react";
import TMDBCard from "./TMDBCard";
import "./personInfo.css";

const PersonInfo = ({ tmdbID }) => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState([]);
  const [credits, setCredits] = useState([]);

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
        .catch((error) => console.error(error));

      await fetch(
        "https://api.themoviedb.org/3/person/" +
          tmdbID +
          "/combined_credits?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US"
      )
        .then((res) => res.json())
        .then((res) => setCredits(res))
        .then(setLoading(false))
        .catch((error) => console.error(error));
    };
    fetchInfo();
  }, [tmdbID]);

  if (loading) {
    return <></>;
  } else {
    console.log(credits);
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

    let acting = [];
    // let other = []; // for listing crew credits (producing, directing, etc)
    // need to link all of these movies/credits => get the credit_id? and media_type => get the id? => get the tmdb_id? => rdy to link?
    if (credits !== []) {
      if (`cast` in credits) {
        credits.cast.forEach((element, i) => {
          console.log(`/` + element["media_type"] + `/`);
          let title = "title";
          let year = "release_date";
          let type = "/movie/";
          if (element["media_type"] === "tv") {
            title = "name";
            year = "first_air_date";
            type = "/tv/";
          }
          acting.push(
            <div className="grid-item" id="grid-item" key={i}>
              <TMDBCard
                type={type}
                id={element["id"]}
                element={element}
                title={title}
                year={year}
              />
              {`character` in element ? (
                element["character"] ? (
                  <p>as {element["character"]}</p>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
              {/* <p>{element["title"]}</p> */}
            </div>
          );
        });
        // credits.cast.forEach((element, i) => {
        //   acting.push(
        //     <div key={i}>
        //       {`name` in element ? (
        //         <h1>{element["name"]}</h1>
        //       ) : `title` in element ? (
        //         <h1>{element["title"]}</h1>
        //       ) : (
        //         <></>
        //       )}
        //       {`poster_path` in element ? (
        //         element["poster_path"] ? (
        //           <img
        //             width="225px"
        //             height="300px"
        //             src={
        //               "https://image.tmdb.org/t/p/original/" +
        //               element["poster_path"]
        //             }
        //             alt={`poster for ` + element["name"]}
        //           />
        //         ) : (
        //           <></>
        //         )
        //       ) : (
        //         <></>
        //       )}{" "}
        //       {`character` in element ? <p>{element["character"]}</p> : <></>}
        //     </div>
        //   );
        // });
      }
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
        {`biography` in person ? (
          person["biography"] ? (
            <p>About: {person["biography"]}</p>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
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
          person["place_of_birth"] ? (
            <p>Place of birth: {person["place_of_birth"]}</p>
          ) : (
            <p>Place of birth: Unknown</p>
          )
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
        {acting !== [] ? (
          <div>
            <h2>Acting credits:</h2> {acting}
          </div>
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
 * Maybe use something like https://jsfiddle.net/davidliang2008/cu0p613v/ to collapse/expand list of credits?
 *
 * then to get more info about a credit:
 * https://api.themoviedb.org/3/credit/5d294e6ba294f00c1729118d?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US
 *
 *
 */
