/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
import {
  getEvents,
  updateEvent,
  checkAuthStatus,
  getUserProfile,
} from "./utils/firebase.js";
import { useDispatch } from "react-redux";

import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import HomePage from "./Pages/HomePage/index.js";
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

function App() {
  const dispatch = useDispatch();

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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
