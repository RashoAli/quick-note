import React from "react";
import "./App.css";
import LoginPage from "./Components/LoginPage";
import HomePage from "./Components/HomePage";
import Firebase from "firebase";
import config from "./config";

class App extends React.Component {
  constructor() {
    super();

    console.log("config   "+config.databaseURL);
    
    
    Firebase.initializeApp(config);

    this.state = {
      isLoggedIn: false,
      userData: null,
      firebaseRef: Firebase.database().ref("/")
    };
  }

  updateIsLoggedIn = (status, data) => {
    this.setState({
      isLoggedIn: status,
      userData: data
    });
  };

  updateUserData = data => {
    this.setState({
      userData: data
    });
  };

  render() {
    return (
      <div className="App">
        {this.state.isLoggedIn ? (
          <HomePage
            isLoggedIn={this.state.isLoggedIn}
            userData={this.state.userData}
            updateIsLoggedIn={this.updateIsLoggedIn}
            updateUserData={this.updateUserData}
            firebaseRef={this.state.firebaseRef}
          />
        ) : (
          <LoginPage
            isLoggedIn={this.state.isLoggedIn}
            userData={this.state.userData}
            updateIsLoggedIn={this.updateIsLoggedIn}
            updateUserData={this.updateUserData}
          />
        )}
      </div>
    );
  }
}

export default App;
