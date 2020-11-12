import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

function Detail(props) {
  const [trip, setTrip] = useState({});

  // When this component mounts, grab the trip with the _id of props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  const { id } = useParams();
  useEffect(() => {
    API.getTrip(id)
      .then((res) => setTrip(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col size="md-12">
          <Jumbotron>
            <h1>
              {trip.title} to {trip.location}
            </h1>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col size="md-10 md-offset-1">
          <article>
            <h1>Description</h1>
            <p>{trip.description}</p>
          </article>
        </Col>
      </Row>
      <Row>
        <Col size="md-2">
          <Link to="/trips">← Back to All Trips</Link>
        </Col>
      </Row>
      <Row>
        <Col size="md-2">
          <Link to="/trips/uid">← Back to Your Trips</Link>
        </Col>
      </Row>
    </Container>
  );
}

export default Detail;
