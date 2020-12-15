import firebase from 'firebase';

const firebaseConfig = require('./firebaseCfg.env.json');

// Initialize Firebase with a "default" Firebase project
const myFirebase = firebase.initializeApp(firebaseConfig);

const myFirestore = myFirebase.firestore();

function firebaseModule() {
  function signIn() {
    // Sign into Firebase using popup auth & Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider);
  }

  function signOut() {
    // Sign out of Firebase.
    return firebase.auth().signOut();
  }

  function initFirebaseAuth(cb) {
    // Listen to auth state changes.
    return firebase.auth().onAuthStateChanged(cb);
  }

  function getUserName() {
    return firebase.auth().currentUser.displayName;
  }

  function isUserSignedIn() {
    return !!firebase.auth().currentUser;
  }

  function create(collection, document) {
    // Add a new message entry to the database.
    return myFirestore
      .collection(collection)
      .add(document)
      .then((docRef) => {
        return docRef.id;
      })
      .catch((error) => {
        console.error('Error writing data to database', error);
      });
  }

  function read(collection, uid) {
    if (uid) {
      return firebase
        .firestore()
        .collection(collection)
        .doc(uid)
        .get()
        .then(console.log('individual doc retrieval not implemented'));
    } else {
      return firebase
        .firestore()
        .collection(collection)
        .get()
        .then((qs) => {
          const obj = {};
          qs.forEach((qds) => {
            obj[qds.id] = qds.data();
          });
          return obj;
        });
    }
  }

  function update(collection, uid, data) {
    return firebase
      .firestore()
      .collection(collection)
      .doc(uid)
      .set(data)
      .catch((error) => console.error(error));
  }

  function destroy(collection, uid) {
    return firebase
      .firestore()
      .collection(collection)
      .doc(uid)
      .delete()
      .catch((error) => {
        console.error(error);
      });
  }

  return {
    signIn,
    signOut,
    initFirebaseAuth,
    getUserName,
    isUserSignedIn,
    create,
    read,
    update,
    destroy,
  };
}

export default firebaseModule;
