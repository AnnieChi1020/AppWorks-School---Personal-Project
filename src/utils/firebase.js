import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyB3u52FblPOqzBp4GUIASlMLohB5NcyLqs",
  authDomain: "volunteer-c29d0.firebaseapp.com",
  projectId: "volunteer-c29d0",
  storageBucket: "volunteer-c29d0.appspot.com",
  messagingSenderId: "564139543350",
  appId: "1:564139543350:web:751d761b341c8429358197",
  measurementId: "G-W7VWKB20YX",
});

export const createNewDoc = () => {
  const db = firebase.firestore();
  let newEventRef = db.collection("events").doc();
  console.log(newEventRef);
  return newEventRef;
};

export const postEventDetailtoDoc = (newEventRef, eventDetail) => {
  newEventRef
    .set(eventDetail)
    .then(() => {
      console.log("Document successfully written!");
      console.log(eventDetail);
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
  return newEventRef.id;
};

export const postParticipantInfo = (eventId, participantInfo) => {
  const db = firebase.firestore();
  let participantRef = db
    .collection("events")
    .doc(eventId)
    .collection("participants")
    .add({ participantInfo });
  return participantRef;
};

export const getImageURL = (file) => {
  let storageRef = firebase.storage().ref(file.name);
  return storageRef.put(file).then((snapshot) => {
    return snapshot.ref.getDownloadURL();
  });
};

export const getEventInfo = (eventId) => {
  const db = firebase.firestore();
  let eventRef = db.collection("events").doc(eventId);
  return eventRef.get().then((doc) => {
    const data = doc.data();
    return data;
  });
};
