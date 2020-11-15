import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Link, Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import API from "./utils/API";
import Trips from "./pages/trips";
import UserTrips from "./pages/userTrips";
import Detail from "./pages/detail";
// import NoMatch from "./pages/NoMatch";
//import NavBar from "./components/NavBar";

import "./App.css";

//import { redirect } from "../../passport/localStrategy";

class App extends Component {
  //Constructor for states
  constructor() {
    super();
    this.state = {
      isloggedIn: false,
      email: "",
      id: "",
      firstName: "",
      lastName: "",
      redirect: false,
    };
    this.logIn = this.logIn.bind(this);
    // this.logOut = this.logOut.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  //when component mounts get user
  componentDidMount() {
    this.logIn();
  }

  //Update the user
  updateUser(userObject) {
    let tempuser = {
      email: userObject.email,
      firstName: userObject.firstName,
      lastName: userObject.lastName,
    };
    if (userObject._id) {
      tempuser.id = userObject._id;
    } else {
      tempuser.id = userObject.id;
    }
    this.setState(tempuser);
    console.log(tempuser);
  }

  logIn = () => {
    console.log("login method");
    return API.getUser().then((response) => {
      console.log("Get user response: ");
      console.log(response.data);
      if (response.data._id && response.data._id !== "undefined") {
        console.log("Get User: There is a user saved in the server session: ");
        console.log(response.data_id);
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++=");
        this.setState({
          isloggedIn: true,
          email: response.data.email,
          id: response.data._id,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
        });
      } else {
        console.log("Get user: no user");
        this.setState({
          isloggedIn: false,
          email: "",
          firstName: "",
          lastName: "",
          id: null,
          redirect: false,
        });
      }
    });
  };

  // logOut = (e) => {
  //   e.preventDefault();
  //   console.log("logging out");
  //   API.logout().then((res) => {
  //     this.setState({
  //       isLoggedIn: false,
  //       email: "",
  //       firstName: "",
  //       lastName: "",
  //       id: null,
  //       redirect: true,
  //     });

  //     // console.log("go somewhere else");
  //     if (res) {
  //       console.log("successfully logged out");
  //       //this.props.history.push("/signin");
  //       //this.context.router.replace("/signin");
  //     }
  //   });
  // };

  render() {
    //if (this.state.redirect) return <Redirect to="/" />;
    // const { isAuthenticated, user } = this.props.auth;
    // if (!isAuthenticated) return <Redirect to="/" />;
    return (
      <Router>
        <Container fluid className="p-0">
          <Switch>
            <Route
              exact
              path="/signup"
              render={(props) => (
                <SignUp
                  {...props}
                  logIn={this.logIn}
                  updateUser={this.updateUser}
                />
              )}
            />
            <Route
              exact
              path="/"
              render={() => <SignIn updateUser={this.updateUser} />}
              //render={(props) => <SignUp {...props} logIn={this.logIn} />}
            />
            <Route
              exact
              path="/signin"
              render={() => <SignIn updateUser={this.updateUser} />}
            />
            <Route
              exact
              path="/trips"
              render={() => (
                <Trips
                  email={this.state.email}
                  isloggedIn={this.state.isloggedIn}
                  id={this.state.id}
                  firstName={this.state.firstName}
                  lastName={this.state.lastName}
                  // logOut={this.logOut}
                />
              )}
            />
            <Route exact path="/trips/uid">
              <UserTrips
                email={this.state.email}
                isloggedIn={this.state.isloggedIn}
                id={this.state.id}
                firstName={this.state.firstName}
                lastName={this.state.lastName}
              />
            </Route>

            <Route exact path="/trips/:id">
              <Detail />
            </Route>
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
