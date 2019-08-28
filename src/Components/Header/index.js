import React from "react";
import "./style.css";
import { GoogleLogout } from "react-google-login";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quicknoteStyle: {
        fontWeight: "bold",
        fontSize: "20px",
        pointerEvents: "none"
      },
      mynotesStyle: {
        fontSize: "15px"
      }
    };
  }

  logout = () => {
    console.log("logout");
    this.props.updateIsLoggedIn(false, null);
  };

  changeView = status => {
    if (status) {
      this.setState({
        quicknoteStyle: {
          fontWeight: "bold",
          fontSize: "20px",
          pointerEvents: "none"
        },
        mynotesStyle: {
          fontSize: "15px"
        }
      });
    } else {
      this.setState({
        quicknoteStyle: {
          fontSize: "15px"
        },
        mynotesStyle: {
          fontWeight: "bold",
          fontSize: "20px",
          pointerEvents: "none"
        }
      });
    }

    this.props.updateIsNewNote(status);
  };

  render() {
    return (
      <div className="container">
        <nav>
          <ul>
            <li>
              <p
                id="quicknote"
                style={this.state.quicknoteStyle}
                onClick={() => this.changeView(true)}
              >
                Quick Note
              </p>
            </li>
            <li>
              <p>|</p>
            </li>
            <li>
              <p
                id="mynotes"
                style={this.state.mynotesStyle}
                onClick={() => this.changeView(false)}
              >
                My Notes
              </p>
            </li>
          </ul>
        </nav>

        <div className="logout">
          <p id="email">{this.props.email}</p>

          <GoogleLogout
            clientId="66241017808-jigdc126ij995tc57se20kbjbv33ahp2.apps.googleusercontent.com"
            render={renderProps => (
              <p
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                id="logout"
              >
                Logout
              </p>
            )}
            onLogoutSuccess={this.logout}
          />
        </div>
      </div>
    );
  }
}

export default Header;
