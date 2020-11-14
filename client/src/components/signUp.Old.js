import React, { useEffect, useState } from "react";
import Api from "../utils/API";
import { Link, Redirect } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

//SignUp component
function SignUp(props) {
  // const classes = useStyles();

  console.log("****************** Props from signup ************");
  console.log(props.firstName);

  //Redirect hook
  const [redirect, setRedirect] = useState("");

  //Hook for email
  const [email, setEmail] = useState("");

  //handle input for email
  const handleEmailInput = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };

  //Password hook
  const [password, setPassword] = useState("");

  //Handle input for password
  const handlePasswordInput = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  //firstName hook
  const [firstName, setFirstName] = useState("");

  //Handle input for first name
  const handleFirstNameInput = (event) => {
    setFirstName(event.target.value);
    console.log(firstName);
  };

  //Last name hook
  const [lastName, setLastName] = useState("");

  //Handle input for last name
  const handleLastNameInput = (event) => {
    setLastName(event.target.value);
    console.log(lastName);
  };

  //Saving person in database
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("clicked");
    Api.signup({
      firstName,
      lastName,
      email,
      password,
    })
      .then((response) => {
        console.log("signup response: ");
        console.log(response);
        if (response.status === 200) {
          // update App.js state
          props.updateUser(response.data);
          // update the state to redirect to trips
          setRedirect("/trips");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //If redirect is true redirect, or else show signin page
  if (redirect) {
    return <Redirect to={{ pathname: redirect }} />;
  } else {
    //show sign-up page
    return (
      <Container className="my-5">
        <h1
          style={{
            textAlign: "center",
            paddingTop: "100px",
            paddingBottom: "100px",
          }}
        >
          Welcome to UTravel! Please sign up to share your travel experiences
          and create new trips!
        </h1>
        <Row>
          <Col>
            <div className="SignupForm">
              <form className="form-horizontal">
                <div className="form-group">
                  <div className="col-1 col-ml-auto">
                    <label className="form-label" htmlFor="firstName">
                      First Name:
                    </label>
                  </div>
                  <div className="col-3 col-mr-auto">
                    <input
                      className="form-input"
                      type="text"
                      id="firstName"
                      placeholder="John"
                      name="firstName"
                      value={firstName}
                      onChange={handleFirstNameInput}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-1 col-ml-auto">
                    <label className="form-label" htmlFor="lastName">
                      Last Name:
                    </label>
                  </div>
                  <div className="col-3 col-mr-auto">
                    <input
                      className="form-input"
                      type="text"
                      id="lastName"
                      placeholder="John"
                      name="lastName"
                      value={lastName}
                      onChange={handleLastNameInput}
                    />
                  </div>
                </div>

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
                      value={email}
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
                      placeholder="Password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={handlePasswordInput}
                    />
                  </div>
                </div>

                <div className="form-group ">
                  <div className="col-7"></div>

                  <button
                    className="btn btn-primary col-3 col-mr-auto"
                    onClick={handleSubmit}
                  >
                    Sign up
                  </button>
                  {/* sign in link here */}
                  <Link to={"/signin"}>Sign In Here </Link>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(SignUp);
