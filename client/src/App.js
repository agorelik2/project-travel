import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import API from "./utils/API";
// import Trips from "./pages/Trips";
// import Item from "./pages/Item";
// import NoMatch from "./pages/NoMatch";
//import NavBar from "./components/NavBar";
import "./App.css";

class App extends Component {
  //Constructor for states
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      email: "",
      id: "",
      firstName: "",
      lastName: "",
    };
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  //when component mounts get user
  componentDidMount() {
    this.logIn();
  }

  //Update the user
  updateUser(userObject) {
    this.setState(userObject);
    console.log(userObject);
  }

  logIn = () => {
    return API.getUser().then((response) => {
      console.log("Get user response: ");
      console.log(response.data);
      if (response.data.user) {
        console.log("Get User: There is a user saved in the server session: ");
        this.setState({
          loggedIn: true,
          email: response.data.user.email,
          id: response.data.user._id,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          loggedIn: false,
          email: "",
          firstName: "",
          lastName: "",
          id: null,
        });
      }
    });
  };

  logOut = () => {
    API.logout().then((res) => {
      this.setState({
        isLoggedIn: false,
        email: "",
        firstName: "",
        lastName: "",
        id: null,
      });
    });
  };

  render() {
    return (
      <Router>
        <Container fluid className="p-0">
          {/* <NavBar
            logOut={this.logOut}
            isLoggedIn={this.state.isLoggedIn}
            email={this.state.email}
          /> */}
          <Switch>
            <Route
              exact
              path="/signup"
              render={(props) => <SignUp {...props} login={this.logIn} />}
            />
            <Route
              exact
              path="/"
              // render={() => <SignIn updateUser={this.updateUser} />}
              render={(props) => <SignUp {...props} login={this.logIn} />}
            />
            <Route
              exact
              path="/signin"
              render={() => <SignIn updateUser={this.updateUser} />}
            />
            {/* <Route
              path="/trips"
              render={() => (
                <Trips
                  email={this.state.email}
                  isloggedIn={this.state.isloggedIn}
                />
              )}
            />
            <Route exact path="/trips/:id">
              <Item />
            </Route> */}
            <Route
              exact
              path="*"
              render={() => <SignIn updateUser={this.updateUser} />}
            />
          </Switch>
        </Container>
      </Router>
    );
  }
}
export default App;