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
      }
    }

    return (
      <div>
        <h1>{person["name"]}</h1>

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
              <></>
            )
          ) : (
            <></>
          )}

          {`birthday` in person ? (
            person["birthday"] ? (
              <p>Birthday: {person["birthday"]}</p>
            ) : (
              <p>Birthday: Unknown</p>
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
        <div className="MovList">
          {acting !== [] ? (
            <div>
              <h2>Acting credits:</h2> {acting}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
};

export default PersonInfo;
