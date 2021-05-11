import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { Home, Results, NotFound } from "./Pages";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  FormGroup,
  NavDropdown,
} from "react-bootstrap";

// our export variable that Results will query in our APIs
let params;

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
    if (this.state.searchText) {
      params = this.state.searchText;
      this.props.history.push({
        pathname: "results",
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
      <>
        <Navbar id="navbar" bg="dark" variant="dark" expand="md">
          <Navbar.Brand href="/">App Name</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav id="nav" className="mr-auto">
              <Nav.Link onClick={this.handleRoute("/")}>Home</Nav.Link>
              <NavDropdown title="Categories" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Option 1</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Option 2</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Option 3</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Something else
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form id="search-form" inline onSubmit={this.afterSubmission}>
              <FormGroup controlId="header-search">
                <FormControl
                  onKeyDown={this.handleKeyPress}
                  onChange={this.handleSearchInput}
                  value={this.state.searchText}
                  type="text"
                  placeholder="Search"
                  required
                  className="mr-sm-2"
                />
              </FormGroup>
              <Button onClick={this.handleSearchSubmit} variant="outline-info">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/results" component={Results} />
          {/* need to figure out how to expect url query params before adding 404 page */}
          <Route component={NotFound} />
        </Switch>
      </>
    );
  }
}

export default withRouter(Main);
// we don't reload our page when the search is submitted, instead we export our params variable with the input text that the results page will handle
export { params };
