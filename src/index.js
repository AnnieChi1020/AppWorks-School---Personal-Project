import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import allReducers from "./reducers";
import { Provider } from "react-redux";
import firebase from "firebase/app";

const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

firebase.initializeApp({
  apiKey: "AIzaSyB3u52FblPOqzBp4GUIASlMLohB5NcyLqs",
  authDomain: "volunteer-c29d0.firebaseapp.com",
  projectId: "volunteer-c29d0",
  storageBucket: "volunteer-c29d0.appspot.com",
  messagingSenderId: "564139543350",
  appId: "1:564139543350:web:751d761b341c8429358197",
  measurementId: "G-W7VWKB20YX",
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
