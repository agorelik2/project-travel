import React from "react";
// import Carousel from "../components/Carousel";
import { Container, Row, Col } from "react-bootstrap";
import SignUpForm from "../components/signUpForm";

function SignUp(props) {
  return (
    <>
      {/* <Carousel /> */}
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
            <SignUpForm {...props} />
          </Col>
          {/* <Col xs={{ span: 12, order: 1 }} md={{ span: 6, order: 2 }}>
            <h1
              style={{
                textAlign: "center",
                paddingTop: "100px",
                paddingBottom: "100px",
              }}
            >
              Sign Up to be able to create trips on UTravel!
            </h1>
          </Col> */}
        </Row>
      </Container>
    </>
  );
}
export default SignUp;
