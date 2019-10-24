import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import axios from 'axios';

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
    this.handleSignOut = this.handleSignOut.bind(this);
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(userr => {
      if (userr !== null) {
        this.setState({
          loggedInStatus: !!userr,
          user: {
            name: firebase.auth().currentUser.displayName,
            email: firebase.auth().currentUser.email,
            imageURL: firebase.auth().currentUser.photoURL,
            uid: firebase.auth().currentUser.uid,
          }
        })
        // firebase.auth().currentUser.getIdToken()
        //   .then((token) => {
        //     console.log('token', token);
        //   }).catch((error) => {
        //     console.log('token error', error);
        //   })
        // console.log('uid', firebase.auth().currentUser.uid)
      }
      // console.log('userr--------------->', userr)
    })
  }
  handleSignOut() {
    firebase.auth().signOut();
    this.setState({
      loggedInStatus: false,
      user: {},
    })
  }
  componentDidUpdate() {
    axios.post('http://localhost:3001/create', this.state.user)
      .then(response => {
        console.log('auth response', response)
      }).catch(error => {
        console.log('auth error', error);
      });
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
            <button onClick={() => this.handleSignOut()}>Sign out</button>
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
