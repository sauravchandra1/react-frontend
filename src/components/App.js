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
        loggedInStatus: !!user
      })
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
          </span>
        ) : (
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}

        {/* <BrowserRouter>
          <Switch>
            <Route exact
              path={'/'}
              render={props => (
                <TwitterAuth {...props}
                />
              )} />
            <Route
              exact
              path={'/dashboard'}
              render={props => (
                <Dashboard {...props}
                />
              )} />
          </Switch>
        </BrowserRouter> */}
      </div>
    );
  }
}
