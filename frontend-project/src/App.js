import React from "react";
import "./App.css";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import {
  PopMovies,
  PopTVShows,
  TopRatedMovies,
  TopRatedTVShows,
  Info,
  Results,
  NotFound,
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
  /**
   * Initialize the searchText variable we will use to hold our user's search input.
   * Once the form is submitted, we DON'T want the page to reload, so we preventDefault reload behavior.
   */
  constructor(props) {
    super(props);

    this.state = {
      searchText: "",
    };
    this.afterSubmission = this.afterSubmission.bind(this);
  }

  /**
   * Handles routing based on navbar route selected
   * @param {*} route
   * @returns void
   */
  handleRoute = (route) => () => {
    this.props.history.push({ pathname: route });
  };

  /**
   * Handles setting our searchText when the input changes
   * @param {*} event
   */
  handleSearchInput = (event) => {
    this.setState({
      searchText: event.target.value,
    });
  };

  /**
   * Handles changing the page when form (aka the search) is submitted.
   * We send out an alert when the input is empty to inform user there should be text there.
   */
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

  /**
   * Handles when user presses enter when search bar is in focus - we want this to be accessible.
   * @param {*} e
   */
  handleKeyPress = (e) => {
    if (e.key === "Enter") {
      this.handleSearchSubmit();
    }
  };

  /**
   * The aforementioned preventDefault reload behavior when our form (aka the search component of the header) is submitted.
   * @param {*} event
   */
  afterSubmission(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div className="custom-navbar">
        <Navbar id="navbar" bg="black" variant="dark" expand="lg">
          <Navbar.Brand className="active" href="/">App Name</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav id="nav" className="mr-auto" bg="black">
              <Nav.Link id= "current" href="/movie/popular/">Popular Movies</Nav.Link>
              <Nav.Link href="/tv/popular/">Popular TV Shows</Nav.Link>
              <Nav.Link href="/movie/top_rated/">Top Rated Movies</Nav.Link>
              <Nav.Link href="/tv/top_rated/">Top Rated TV Shows</Nav.Link>
            </Nav>

            <Form id="search-form" inline onSubmit={this.afterSubmission}>
              <FormGroup>
                <Form.Label className="hidden" htmlFor="searchBar">
                  Search
                </Form.Label>
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
          {/* Routing for the Popular Movies page which will take the last arg as an indicator of which page to load from the popular movies list */}
          <Redirect exact from="/" to="/movie/popular/" />
          {/* <Redirect exact path="/movie/popular/" to="/movie/popular/1" /> */}
          <Route exact path="/movie/popular/" component={PopMovies} />
          {/* Routing for the Popular TV Shows page which will take the last arg as an indicator of which page to load from the popular tv shows list */}
          {/* <Redirect exact path="/tv/popular/" to="/tv/popular/1" /> */}
          <Route exact path="/tv/popular/" component={PopTVShows} />
          {/* Routing for the top rated Movies page which will take the last arg as an indicator of which page to load from the top rated movies list */}
          {/* <Redirect exact path="/movie/top_rated/" to="/movie/top_rated/1" /> */}
          <Route exact path="/movie/top_rated/" component={TopRatedMovies} />
          {/* Routing for the top rated TV Shows page which will take the last arg as an indicator of which page to load from the top rated tv shows list */}
          {/* <Redirect exact path="/tv/top_rated/" to="/tv/top_rated/1" /> */}
          <Route exact path="/tv/top_rated/" component={TopRatedTVShows} />
          {/* test routing for dashboard part of app */}
          <Route
            exact
            path="/info/:imdbID/:mediaType/:tmdbID?"
            component={Info}
          />
          {/* <Route exact path="/info" component={Info} /> */}
          {/* <Redirect exact path="/results/:title/" to="/results/:title/1" /> */}
          <Route exact path="/results/:title/" component={Results} />

          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Main);
// we don't reload our page when the search is submitted, instead we export our params variable with the input text that the results page will handle
