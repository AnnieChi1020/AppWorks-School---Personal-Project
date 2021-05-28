export const sendEvent = () => {
  const gapi = window.gapi;
  const CLIENT_ID =
    "481297438683-me82g21ocdupqagkgq80e8ar10vf669b.apps.googleusercontent.com";
  const API_KEY = "AIzaSyC9Rq_urtS76m8vtjJzBzCmcYIhYiwPMYQ";
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
};
