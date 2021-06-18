import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp({
  apiKey: "AIzaSyB3u52FblPOqzBp4GUIASlMLohB5NcyLqs",
  authDomain: "volunteer-c29d0.firebaseapp.com",
  databaseURL: "https://volunteer-c29d0.firebaseio.com",
  projectId: "volunteer-c29d0",
  storageBucket: "volunteer-c29d0.appspot.com",
  messagingSenderId: "564139543350",
  appId: "1:564139543350:web:751d761b341c8429358197",
  measurementId: "G-W7VWKB20YX",
});

export const createNewDoc = () => {
  const db = firebase.firestore();
  let newEventRef = db.collection("events").doc();
  return newEventRef;
};

export const postEventInfo = (newEventRef, eventDetail) => {
  return newEventRef
    .set(eventDetail)
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
      return false;
    });
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

export const getImageURL = (hosterId, file) => {
  let storageRef = firebase
    .storage()
    .ref(`${hosterId}_${new Date().toISOString()}`);
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

export const getEvents = (status) => {
  const db = firebase.firestore();
  let events = [];
  return db
    .collection("events")
    .where("eventStatus", "==", status)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        events.push(doc.data());
      });
      return events;
    })
    .catch((error) => {});
};

export const updateEvent = (eventId, updateInfo) => {
  const db = firebase.firestore();
  const eventRef = db.collection("events").doc(eventId);
  return eventRef
    .update(updateInfo)
    .then(() => {})
    .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });
};

export const getHosterEvents = (hosterId, eventStatus) => {
  const db = firebase.firestore();
  let events = [];
  return db
    .collection("events")
    .where("hosterId", "==", `${hosterId}`)
    .where("eventStatus", "==", eventStatus)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        events.push(doc.data());
      });
      return events;
    })
    .catch((error) => {});
};

export const getParticipants = (eventId, status) => {
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
      return applications;
    })
    .catch((error) => {});
};

export const getParticipantInfo = (eventId, userId) => {
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
        return doc.data();
      } else {
      }
    })
    .catch((error) => {});
};

export const onSnapshotParticipantInfo = (eventId, userId) => {
  const db = firebase.firestore();
  db.collection("events")
    .doc(eventId)
    .collection("participants")
    .doc(userId)
    .onSnapshot((doc) => {
      console.log("New Data", doc.data());
    });
};

export const updateParticipantStatus = (eventId, userId, updateInfo) => {
  const db = firebase.firestore();
  const participantRef = db
    .collection("events")
    .doc(eventId)
    .collection("participants")
    .doc(userId);
  return participantRef
    .update(updateInfo)
    .then(() => {})
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
};

export const getUserProfile = (id) => {
  const db = firebase.firestore();
  const userRef = db.collection("users").doc(id);
  return userRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        return doc.data();
      } else {
      }
    })
    .catch((error) => {});
};

export const getUserEvents = (userId, status) => {
  const db = firebase.firestore();
  let events = [];
  const userRef = db
    .collectionGroup("participants")
    .where("participantInfo.participantId", "==", userId)
    .where("participantInfo.participantStatus", "==", status);
  return userRef
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        events.push(doc.data().participantInfo.eventId);
      });
      return events;
    })
    .catch((error) => {});
};

export const getUserAttendedEvents = (userId) => {
  const db = firebase.firestore();
  let events = [];
  const userRef = db
    .collectionGroup("participants")
    .where("participantInfo.participantId", "==", userId)
    .where("participantInfo.participantAttended", "==", true);
  return userRef
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        events.push(doc.data().participantInfo.eventId);
      });
      return events;
    })
    .catch((error) => {});
};

export const getEventsByTagsAndArea = (tag, city) => {
  const db = firebase.firestore();
  let events = [];
  const eventRef = db
    .collection("events")
    .where("eventTags", "array-contains", tag)
    .where("eventAddress.address_components[4].long_name", "==", city)
    .where("eventStatus", "==", 0);
  return eventRef
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        events.push(doc.data());
      });
      return events;
    })
    .catch((error) => {});
};

export const getEventsByTags = (tag) => {
  const db = firebase.firestore();
  let events = [];
  const eventRef = db
    .collection("events")
    .where("eventTags", "array-contains", tag)
    .where("eventStatus", "==", 0);
  return eventRef
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        events.push(doc.data());
      });
      return events;
    })
    .catch((error) => {});
};

export const getEventsByArea = (city) => {
  const db = firebase.firestore();
  let events = [];
  const eventRef = db
    .collection("events")
    .where("eventAddress.address_components[4].long_name", "==", city)
    .where("eventStatus", "==", 0);
  return eventRef
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        events.push(doc.data());
      });
      return events;
    })
    .catch((error) => {});
};

export const createUserAuth = (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      let user = userCredential.user;
      return user.uid;
    })
    .catch((error) => {
      let errorCode = error.code;
      // let errorMessage = error.message;
      return errorCode;
    });
};

export const userSignIn = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user.uid;
    })
    .catch((error) => {
      const errorCode = error.code;
      // const errorMessage = error.message;
      return errorCode;
    });
};

export const addNewUserInfo = (userId, userData) => {
  const db = firebase.firestore();
  let newUserRef = db.collection("users").doc(userId);
  return newUserRef
    .set(userData)
    .then(() => {
      return;
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

export const getCurrentUser = () => {
  let user = firebase.auth().currentUser;
  if (user) {
    return true;
  } else {
    return false;
  }
};

export const checkAuthStatus = async () => {
  const promise = new Promise((resolve) => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        let userId = user.uid;
        resolve(userId);
      } else {
        resolve(false);
      }
    });
  });
  let response = await promise;
  return response;
};

export const userSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then(function () {
      return true;
    });
};

export const getAllUsers = () => {
  const db = firebase.firestore();
  let users = [];
  return db
    .collection("users")
    .where("role", "==", 0)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      return users;
    })
    .catch((error) => {});
};

export const getParticipantNumber = (eventId) => {
  const db = firebase.firestore();
  let number = 0;
  return db
    .collection("events")
    .doc(eventId)
    .collection("participants")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // applications.push(doc.data());
        number += 1;
      });
      return number;
    })
    .catch((error) => {});
};
