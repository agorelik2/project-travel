import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";

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
          // update the state to redirect to home
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
    //show sign-up page
    return (
      <div className="SigninForm">
        <form className="form-horizontal">
          <div className="form-group">
            <div className="col-1 col-ml-auto">
              <label className="form-label" htmlFor="email">
                E-mail:
              </label>
            </div>
            <div className="col-3 col-mr-auto">
              <input
                className="form-input"
                type="text"
                id="email"
                placeholder="john@abc.com"
                name="email"
                value={emailInput}
                onChange={handleEmailInput}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-1 col-ml-auto">
              <label className="form-label" htmlFor="password">
                Password:
              </label>
            </div>
            <div className="col-3 col-mr-auto">
              <input
                className="form-input"
                placeholder="password"
                type="password"
                name="password"
                value={passwordInput}
                onChange={handlePasswordInput}
              />
            </div>
          </div>

          <div className="form-group ">
            <div className="col-7"></div>

            <button
              className="btn btn-primary col-1 col-mr-auto"
              onClick={handleSignIn}
            >
              Sign In
            </button>
            {/* sign up link here */}
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
