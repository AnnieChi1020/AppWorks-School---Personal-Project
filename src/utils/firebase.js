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

export const postParticipantInfo = (
  eventId,
  participantId,
  participantInfo
) => {
  const db = firebase.firestore();
  let participantRef = db
    .collection("events")
    .doc(eventId)
    .collection("participants")
    .doc(participantId)
    .set({ participantInfo });
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

export const getEvents = () => {
  const db = firebase.firestore();
  let events = [];
  return db
    .collection("events")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        events.push(doc.data());
      });
      return events;
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};

export const getHosterEvents = (hosterId) => {
  const db = firebase.firestore();
  let events = [];
  return db
    .collection("events")
    .where("hosterId", "==", `${hosterId}`)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        events.push(doc.data());
      });
      console.log(events);
      return events;
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};

export const getUserList = (eventId, status) => {
  const db = firebase.firestore();
  let applications = [];
  return db
    .collection("events")
    .doc(eventId)
    .collection("participants")
    .where("participantInfo.participantStatus", "==", status)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        applications.push(doc.data());
      });
      // console.log(applications);
      return applications;
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};

export const getCurrentStatus = (eventId, userId) => {
  const db = firebase.firestore();
  const participantRef = db
    .collection("events")
    .doc(eventId)
    .collection("participants")
    .doc(userId);
  return participantRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log(doc.data());
        return doc.data();
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
};

export const updateNewStatus = (eventId, userId, updateInfo) => {
  const db = firebase.firestore();
  const participantRef = db
    .collection("events")
    .doc(eventId)
    .collection("participants")
    .doc(userId);
  return participantRef
    .update(updateInfo)
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
};
