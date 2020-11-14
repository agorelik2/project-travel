import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import UpdateBtn from "../components/UpdateBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import Nav from "../components/Nav";

function UserTrips(props) {
  // Setting our component's initial state
  const [trips, setTrips] = useState([]);
  const [formObject, setFormObject] = useState({});

  // Load all trips and store them with setTrips
  useEffect(() => {
    loadUserTrips();
  }, []);

  // Loads all trips for the user, user populated with trips
  function loadUserTrips() {
    console.log("loading user trips");
    API.getTripsByUser()
      .then((res) => {
        console.log("////////////");
        console.log(res);

        return setTrips(res.data);
      })
      .catch((err) => console.log(err));
  }

  // Updates a trip with a given id, then reloads trips from the db
  function updateTrip(id) {
    //LOAD FORM with: the trip title, location and description
    API.updateTrip(id)
      .then((res) => loadUserTrips())
      .catch((err) => console.log(err));
  }

  // Deletes a trip from the database with a given id, then reloads trips from the db
  function deleteTrip(id) {
    API.deleteTrip(id)
      .then((res) => loadUserTrips())
      .catch((err) => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value });
  }

  // When the form is submitted, use the API.saveTrip method to save the trip data
  // Then reload trips from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.location) {
      //Change from save to update !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      API.saveTrip({
        title: formObject.title,
        location: formObject.location,
        description: formObject.description,
      })
        .then((res) => loadUserTrips())
        .catch((err) => console.log(err));
    }
  }

  return (
    <Container fluid>
      <Nav logOut={props.logOut} />
      <Row>
        <Col size="md-6">
          <Jumbotron>
            <h1>Update Your Trip</h1>
          </Jumbotron>
          <form>
            <Input
              onChange={handleInputChange}
              name="title"
              placeholder="Title (required)"
              value={formObject.title}
            />
            <Input
              onChange={handleInputChange}
              name="location"
              placeholder="Location (required)"
              value={formObject.location}
            />
            <TextArea
              onChange={handleInputChange}
              name="description"
              placeholder="Description (Optional)"
              value={formObject.description}
            />
            <FormBtn
              disabled={!(formObject.location && formObject.title)}
              onClick={handleFormSubmit}
            >
              Update Trip
            </FormBtn>
          </form>
        </Col>
        <Col size="md-6 sm-12">
          <Jumbotron>
            <h1>View All {props.firstName}'s Trips </h1>
            <h3>
              <Link to="/trips">← Back to All Trips</Link>
            </h3>
          </Jumbotron>
          {trips.length ? (
            <List>
              {trips.map((trip) => (
                <ListItem key={trip._id}>
                  <Link to={"/trips/" + trip._id}>
                    <strong>
                      {trip.title} to {trip.location}
                    </strong>
                  </Link>
                  <DeleteBtn onClick={() => deleteTrip(trip._id)} />
                  <UpdateBtn onClick={() => updateTrip(trip._id)} />
                </ListItem>
              ))}
            </List>
          ) : (
            <h3>No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default UserTrips;
