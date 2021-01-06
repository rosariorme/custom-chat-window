import firebase from 'firebase';
class Firebase {
  constructor() {
    this.init();
    this.observeAuth();
  }
  init = () => firebase.initializeApp({
      apiKey: 'AIzaSyAg98Vd0BAYkA-omZbm2oAiUoorCZrKARc',
      authDomain: 'mi-chat-f48e5.firebaseapp.com',
      databaseURL: 'https://mi-chat-f48e5.firebaseapp.com',
      projectId: 'mi-chat-f48e5',
      storageBucket: '',
      messagingSenderId: '570396547642',
  });
  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  onAuthStateChanged = user => {
    if (!user) {
      try { firebase.auth().signInAnonymously(); } catch ({ message }) { alert(message); }
    }
  };
  get uid() { return (firebase.auth().currentUser || {}).uid; }
  get ref() { return firebase.database().ref('messages'); }
  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = { _id, timestamp, text, user};
    return message;
  };
  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));
  get timestamp() { return firebase.database.ServerValue.TIMESTAMP; }
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = { text, user, timestamp: this.timestamp };
      this.append(message);
    }
  };
  append = message => this.ref.push(message);
  off() {
    this.ref.off();
  }
}
Firebase.shared = new Firebase();
export default Firebase;
