import axios from "axios";

export default {
  getTripsByUser: function () {
    return axios.get("/api/trips/uid"); //ALG get trips by UID
  },

  // getUserTrips: function () {
  //   return axios.get("/api/trips/user"); //ALG User
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

  updateTrip: function (id) {
    return axios.put(`/api/trips/${id}`);
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
  signup: function (userData) {
    return axios.post("/api/users/signup", userData);
  },
  logout: function () {
    return axios.get("/api/users/logout");
  },
};
