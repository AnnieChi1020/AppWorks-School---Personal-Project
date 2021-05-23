import React from "react";
// import { checkAuthStatus } from "./utils/firebase.js";

import { useSelector, useDispatch } from "react-redux";
// import { increment, decrement } from "./actions";

import Header from "./components/Header.js";
import HomePage from "./Pages/HomePage/HomePage.js";
import CreateEvent from "./Pages/CreateEventPage/index.js";
import EventDetail from "./Pages/EventDetailPage/index.js";
import ProfilePage from "./Pages/ProfilePage/ProfilePage.js";
import EventsPage from "./Pages/EventsPage/index.js";
import ManageParticipantPage from "./Pages/ProfilePage/HosterEvents/ManageParticipantsPage/index.js";
import EventComments from "./Pages/ProfilePage/UserEvents/CommentsPage/CommentsPage.js";
import PastEvents from "./Pages/PastEventsPage/index.js";
import EventResult from "./Pages/ProfilePage/HosterEvents/EventResultPage/EventResultPage.js";
import EditEvent from "./Pages/ProfilePage/HosterEvents/EditEventPage/EditEventPage.js";

import {
  BrowserRouter as Router,
  redirect,
  Route,
  Link,
} from "react-router-dom";

function App() {
  // const getLoginStatus = async () => {
  //   const data = await checkAuthStatus();
  //   console.log(data);
  // };
  // getLoginStatus();

  // const counter = useSelector((state) => state.counter);
  const isLogged = useSelector((state) => state.isLogged.isLogged);
  console.log(isLogged);
  // const dispatch = useDispatch();

  return (
    <Router>
      <div className="App">
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
      </div>
    </Router>
  );
}

export default App;
