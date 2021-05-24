import { useState, useEffect } from "react";

const PersonInfo = ({ id }) => {
  useEffect(() => {
    const fetchInfo = async () => {};
    fetchInfo();
  }, []);
  return <h1>Person {id}</h1>;
};

export default PersonInfo;

/**
 * Example series of calls:
 * https://api.themoviedb.org/3/person/287?api_key=b0011e93f013cfbed3110a3729a3e3c5&language=en-US
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
