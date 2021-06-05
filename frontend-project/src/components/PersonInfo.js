import { useState, useEffect } from "react";
import TMDBCard from "./TMDBCard";
import "../styles/personInfo.css";

const PersonInfo = ({ tmdbID }) => {
  // error handling so we don't swallow exceptions from actual bugs in components
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState([]);
  const [credits, setCredits] = useState([]);

  useEffect(() => {
    const fetchInfo = async () => {
      setLoading(true);
      await fetch(
        "https://api.themoviedb.org/3/person/" +
          tmdbID +
          "?api_key=" +
          process.env.REACT_APP_TMDB_API_KEY +
          "&language=en-US"
      )
        .then((res) => res.json())
        .then(
          (res) => {
            setPerson(res);
          },
          (error) => {
            setError(error);
          }
        );

      await fetch(
        "https://api.themoviedb.org/3/person/" +
          tmdbID +
          "/combined_credits?api_key=" +
          process.env.REACT_APP_TMDB_API_KEY +
          "&language=en-US"
      )
        .then((res) => res.json())
        .then(
          (res) => {
            setCredits(res);
          },
          (error) => {
            setError(error);
          }
        )
        .then(setLoading(false));
    };
    fetchInfo();
  }, [tmdbID]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (loading) {
    return <></>;
  } else {
    let image =
      "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
    if (person) {
      if (person["profile_path"]) {
        image = "https://image.tmdb.org/t/p/original/" + person["profile_path"];
      }
    }

    let acting = [];
    if (credits !== []) {
      if (`cast` in credits) {
        credits.cast.forEach((element, i) => {
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
            </div>
          );
        });
      }
    }

    return (
      <div>
        {person["name"] ? (
          <h1>{person["name"]}</h1>
        ) : (
          // if the id in the url isn't a valid id
          <h1>Unknown actor</h1>
        )}

        <div className="Personal">
          {`profile_path` in person ? (
            person["profile_path"] ? (
              <img
                src={image}
                alt={`poster of ` + person["name"]}
                height="300px"
                width="250px"
              ></img>
            ) : (
              // profile path not in object
              <></>
            )
          ) : (
            // profile path no in object
            <></>
          )}

          {`birthday` in person ? (
            person["birthday"] ? (
              <p>
                <b>Birthday :</b> {person["birthday"]}
              </p>
            ) : (
              // unknown/unrecorded birthday
              <p>
                <b>Birthday :</b> Unknown
              </p>
            )
          ) : (
            // if there is no birthday in the object
            <></>
          )}

          {`place_of_birth` in person ? (
            person["place_of_birth"] ? (
              <p>
                <b>Place of birth :</b> {person["place_of_birth"]}
              </p>
            ) : (
              // unknown/unrecorded place of birth
              <p>
                <b>Place of birth :</b> Unknown
              </p>
            )
          ) : (
            // if there is no place of birth in the object
            <></>
          )}
          {`biography` in person ? (
            person["biography"] ? (
              <p>
                <b>About :</b> {person["biography"]}
              </p>
            ) : (
              // if they don't have a biography - newer actors don't
              <></>
            )
          ) : (
            // homepage not in the object
            <></>
          )}
          {`homepage` in person ? (
            person["homepage"] ? (
              <a href={person["homepage"]}>
                <b>Homepage</b>
              </a>
            ) : (
              // if they don't have a homepage
              <></>
            )
          ) : (
            // homepage not in the record
            <></>
          )}

          {`deathday` in person ? (
            person["deathday"] ? (
              <p>
                <b>Died :</b> {person["deathday"]}
              </p>
            ) : (
              // may or not be dead
              <></>
            )
          ) : (
            // deathday not in the object
            <></>
          )}
        </div>
        {person["name"] ? (
          <div className="MovList">
            {acting !== [] ? (
              <div>
                <h2>
                  <b>Acting credits :</b>
                </h2>{" "}
                {acting}
              </div>
            ) : (
              // should never be no acting credits, or else how are they in the database
              <></>
            )}
          </div>
        ) : (
          // if the url contains two ids that are unknown in either database output nothing
          <></>
        )}
      </div>
    );
  }
};

export default PersonInfo;
