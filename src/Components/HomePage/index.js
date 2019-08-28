import React from "react";
import Header from "../Header";
import NewNote from "../NewNote";
import MyNotes from "../MyNotes";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNewNote: true
    };
  }

  updateIsNewNote = status => {
    this.setState({
      isNewNote: status
    });
  };

  render() {
    return (
      <div>
        <Header
          email={this.props.userData.email}
          updateIsLoggedIn={this.props.updateIsLoggedIn}
          updateUserData={this.props.updateUserData}
          updateIsNewNote={this.updateIsNewNote}
        />
        {this.state.isNewNote ? (
          <NewNote
            googleId={this.props.userData.googleId}
            firebaseRef={this.props.firebaseRef}
          />
        ) : (
          <MyNotes
            googleId={this.props.userData.googleId}
            firebaseRef={this.props.firebaseRef}
          />
        )}
      </div>
    );
  }
}
export default HomePage;
