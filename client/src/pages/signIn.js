import React, { useState } from "react";

import { Link, Redirect } from "react-router-dom";

import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

//Signin component
function SignIn(props) {
  //   const classes = useStyles();

  //Email hook
  const [emailInput, setEmailInput] = useState("");

  //Setting the state of email
  const handleEmailInput = (event) => {
    setEmailInput(event.target.value);
    console.log(emailInput);
  };

  //Password Hook
  const [passwordInput, setPasswordInput] = useState("");

  //Setting the state of password
  const handlePasswordInput = (event) => {
    setPasswordInput(event.target.value);
    console.log(passwordInput);
  };

  //Redirect hook
  const [redirect, setRedirect] = useState("");

  const handleSignIn = (event) => {
    event.preventDefault();
    console.log("handleSignIn");
    API.login({
      email: emailInput,
      password: passwordInput,
    })
      .then((response) => {
        console.log("login response: ");
        console.log(response);
        if (response.status === 200) {
          // update App.js state
          props.updateUser(response.data);
          // update the state to redirect to trips
          setRedirect("/trips");
        }
      })
      .catch((error) => {
        console.log("login error: ");
        console.log(error);
      });
  };
  //If redirect is true redirect, or else show signup page
  if (redirect) {
    return <Redirect to={{ pathname: redirect }} />;
  } else {
    //show sign-ip page
    return (
      <Container>
        <div className="section-content m-5">
          <h1 className="section-header">
            Share your memories with{" "}
            <span
              className="content-header wow fadeIn "
              data-wow-delay="0.2s"
              data-wow-duration="2s"
            >
              {" "}
              UTravel
            </span>
          </h1>
          <h3 className="subt">log in and start sharing</h3>
        </div>
        <div className="container w-50 shadow-lg round flex-d ">
          <div className="row justify-content-center p-5 ">
            <div className="contact-section col-lg-6 p-0 m-0 ">
              <form>
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email:
                  </label>
                  <input
                    className="form-control"
                    value={emailInput}
                    name="email"
                    id="email"
                    onChange={handleEmailInput}
                    type="text"
                    placeholder="john@abc.com"
                  />
                  {/* <p style={{ color: "red", fontSize: "20px" }}>
            {this.state.errorUsername}
          </p> */}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="form-control"
                    value={passwordInput}
                    name="password"
                    onChange={handlePasswordInput}
                    type="password"
                    placeholder="Password"
                  />
                  {/* <p style={{ color: "red", fontSize: "20px" }}>
            {this.state.errorPassword}
          </p> */}
                </div>
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="btn btn-primary w-100"
                >
                  {" "}
                  Sign In
                </button>
                <br />
                <Link to={"/signup"}>Sign Up Here </Link>
              </form>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

export default SignIn;
