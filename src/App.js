/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  getEvents,
  updateEvent,
  checkAuthStatus,
  getUserProfile,
} from "./utils/firebase.js";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import HomePage from "./Pages/HomePage/index.js";
import LoginPage from "./Pages/LoginPage/index.js";
import CreateEvent from "./Pages/CreateEventPage/index.js";
import EventDetail from "./Pages/EventDetailPage/index.js";
import ProfilePage from "./Pages/ProfilePage/ProfilePage.js";
import EventsPage from "./Pages/EventsPage/index.js";
import ManageParticipantPage from "./Pages/ProfilePage/HosterEvents/ManageParticipantsPage/index.js";
import EventComments from "./Pages/ProfilePage/UserEvents/CommentsPage/CommentsPage.js";
import PastEvents from "./Pages/PastEventsPage/index.js";
import EventResult from "./Pages/ProfilePage/HosterEvents/EventResultPage/EventResultPage.js";
import EditEvent from "./Pages/ProfilePage/HosterEvents/EditEventPage/EditEventPage.js";

import { BrowserRouter as Router, Route } from "react-router-dom";

const Styles = styled.div`
  .Toastify__toast-container {
    width: 250px;
  }
  .Toastify__close-button {
    display: none;
  }
  .Toastify__toast--success {
    background-color: white;
    border: 1px solid #e7e7e9;
    text-align: center;
    box-shadow: 3px 3px 3px 2px rgba(0, 0, 0, 0.1);
  }
  .Toastify__toast--error {
    background-color: white;
    border: 1px solid #e7e7e9;
    text-align: center;
    box-shadow: 3px 3px 3px 2px rgba(0, 0, 0, 0.1);
  }
  .Toastify__toast--warning {
    background-color: #fef7e0;
    border: 1px solid #e7e7e9;
    text-align: center;
    box-shadow: 3px 3px 3px 2px rgba(0, 0, 0, 0.1);
  }
  .Toastify__toast--info {
    background-color: white;
    border: 1px solid #e7e7e9;
    text-align: center;
    box-shadow: 3px 3px 3px 2px rgba(0, 0, 0, 0.1);
  }
`;

function App() {
  const dispatch = useDispatch();

  const loginAlert = useSelector((state) => state.alert.loginAlert);

  const checkLoginStatus = async () => {
    const userId = await checkAuthStatus();

    if (userId) {
      const userProfile = await getUserProfile(userId);
      dispatch({ type: "SIGN_IN", data: true });
      dispatch({ type: "GET_USERID", data: userId });
      dispatch({ type: "GET_USERROLE", data: userProfile.role });
    }
    return;
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const updatePassedEvent = async () => {
    const activeEvents = await getEvents(0);
    activeEvents.map((event) => {
      const startT = event.startTime.seconds * 1000;
      const currentT = new Date().getTime();
      if (startT < currentT) {
        event.eventStatus = 1;
        updateEvent(event.eventId, event);
      }
      return true;
    });
  };
  updatePassedEvent();

  return (
    <Router>
      <div
        className="App"
        style={{
          minHeight: "calc(100vh - 50px)",
        }}
      >
        <Header />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/createEvent" component={CreateEvent} />
        <Route exact path="/events" component={EventsPage} />
        <Route exact path="/events/:id" component={EventDetail} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route
          exact
          path="/profile/manage-participants/:id"
          component={ManageParticipantPage}
        />
        <Route exact path="/profile/edit-event/:id" component={EditEvent} />

        <Route exact path="/profile/event-result/:id" component={EventResult} />
        <Route exact path="/profile/comments/:id" component={EventComments} />
        <Route exact path="/pastEvents" component={PastEvents} />
        {/* <Footer /> */}
        <Styles>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            closeButton={false}
            limit={1}
          ></ToastContainer>
        </Styles>
      </div>
    </Router>
  );
}

export default App;
