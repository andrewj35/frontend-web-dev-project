import React from "react";
import "./App.css";
import { NavLink, Redirect, Route, Switch, withRouter } from "react-router-dom";
import {
  PopMovies,
  PopTVShows,
  TopRatedMovies,
  TopRatedTVShows,
  Info,
  Results,
  NotFound,
  About,
} from "./components";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  FormGroup,
  // NavDropdown,
} from "react-bootstrap";

// Main class => the navbar + routing
class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
    };
    this.afterSubmission = this.afterSubmission.bind(this);
  }

  handleRoute = (route) => () => {
    this.props.history.push({ pathname: route });
  };

  handleSearchInput = (event) => {
    this.setState({
      searchText: event.target.value,
    });
  };

  handleSearchSubmit = () => {
    if (document.getElementById("searchBar").value) {
      this.props.history.replace({
        pathname:
          "/results/" +
          encodeURIComponent(document.getElementById("searchBar").value),
        state: {
          searchText: document.getElementById("searchBar").value,
        },
      });
    } else {
      alert("Please enter text in search bar!");
    }
  };

  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleSearchSubmit();
    }
  };

  afterSubmission(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="custom-navbar">
        <Navbar id="navbar" bg="black" variant="dark" expand="lg">
          <Navbar.Brand className="active" href="/">
            Movie Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav id="nav" className="mr-auto" bg="black" expand="md">
              <NavLink
                to="/movie/popular/1"
                href="/movie/popular/1"
                activeClassName="current"
              >
                Popular Movies
              </NavLink>
              <NavLink
                to="/tv/popular/1"
                href="/tv/popular/1"
                activeStyle={{ color: "red" }}
              >
                Popular TV Shows
              </NavLink>
              <NavLink
                to="/movie/top_rated/1"
                href="/movie/top_rated/1"
                activeStyle={{ color: "red" }}
              >
                Top Rated Movies
              </NavLink>
              <NavLink
                to="/tv/top_rated/1"
                href="/tv/top_rated/1"
                activeStyle={{ color: "red" }}
              >
                Top Rated TV Shows
              </NavLink>
              <NavLink to="/About" href="/About" activeStyle={{ color: "red" }}>
                About
              </NavLink>
            </Nav>

            <Form id="search-form" inline onSubmit={this.afterSubmission}>
              <FormGroup>
                
                <FormControl
                  onKeyDown={this.handleKeyPress}
                  type="text"
                  placeholder="Search"
                  required
                  className="mr-sm-1"
                  id="searchBar"
                />
              </FormGroup>
              <Button variant="outline-light" onClick={this.handleSearchSubmit}>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          {/* Popular movies */}
          <Redirect exact from="/" to="/movie/popular/1" />
          <Redirect exact path="/movie/popular/" to="/movie/popular/1" />
          <Route exact path="/movie/popular/:page" component={PopMovies} />

          {/* Popular tv shows */}
          <Redirect exact path="/tv/popular/" to="/tv/popular/1" />
          <Route exact path="/tv/popular/:page" component={PopTVShows} />

          {/* Top rated movies */}
          <Redirect exact path="/movie/top_rated/" to="/movie/top_rated/1" />
          <Route
            exact
            path="/movie/top_rated/:page"
            component={TopRatedMovies}
          />

          {/* About */}
          <Route exact path="/About" component={About} />

          {/* Top rated tv shows */}
          <Redirect exact path="/tv/top_rated/" to="/tv/top_rated/1" />
          <Route exact path="/tv/top_rated/:page" component={TopRatedTVShows} />

          {/* Display information about movie/tv show/short/person */}
          <Route
            exact
            path="/info/:imdbID/:mediaType/:tmdbID?"
            component={Info}
          />

          {/* Search results page */}
          <Redirect exact path="/results/:title/" to="/results/:title/1" />
          <Route exact path="/results/:title/:page" component={Results} />

          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Main);
