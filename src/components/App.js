import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'


firebase.initializeApp({
  apiKey: 'AIzaSyDlnmINxt_OEGu9YB2NXRL-nJSZgPcah4M',
  authDomain: 'twitterauth-c4c69.firebaseapp.com',
})

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedInStatus: false,
      user: {}
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        loggedInStatus: !!user,
        user: {
          name: firebase.auth().currentUser.displayName,
          email: firebase.auth().currentUser.email,
          imageURL: firebase.auth().currentUser.photoURL,
          uid: firebase.auth().currentUser.uid,
        }
      })
      // console.log('user===>', this.state.user);
      // firebase.auth().currentUser.getIdToken()
      //   .then((response) => {
      //     console.log(response);
      //   })
    })
  }
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false
    }
  }
  render() {
    return (
      <div className='App'>
        <h1>{this.state.loggedInStatus}</h1>
        {this.state.loggedInStatus ? (
          <span>
            <p>Signed In</p>
            <button onClick={() => firebase.auth().signOut()}>Sign out</button>
            <h4>Welcome {firebase.auth().currentUser.displayName}</h4>
            <img src={firebase.auth().currentUser.photoURL} />
          </span>
        ) : (
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}
      </div>
    );
  }
}
