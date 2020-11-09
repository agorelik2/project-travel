import axios from "axios";

export default {
  // getUserTrips: function () {
  //   return axios.get("/api/trips/populated"); //ALG Populated
  // },

  // getUserTrips: function () {
  //   return axios.get("/api/trips"); //ALG Populated
  // },
  deleteTrip: function (id) {
    return axios.delete(`/api/trips/${id}`);
  },
  getTrips: function () {
    return axios.get("/api/trips");
  },
  getTrip: function (id) {
    return axios.get(`/api/trips/${id}`);
  },
  saveTrip: function (tripData) {
    console.log(tripData);
    return axios.post("/api/trips", tripData);
  },

  login: function (userData) {
    return axios.post("/api/users/login", userData);
  },
  getUser: function (id) {
    return axios.get(`/api/users/${id}`);
  },
  // Gets all users
  getUsers: function () {
    return axios.get("/api/users");
  },
  // Saves a user to the database
  saveUser: function (userData) {
    return axios.post("/api/users/", userData);
  },
  logout: function () {
    return axios.get("/api/users/logout");
  },
};
