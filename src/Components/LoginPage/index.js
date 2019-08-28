import React, { Component } from "react";
import "./style.css";
import { GoogleLogin } from "react-google-login";
import clientId from "../../clientId";

class LoginPage extends Component {
  responseGoogle = response => {
    if (response.profileObj !== undefined) {
      this.props.updateIsLoggedIn(true, response.profileObj);
    }
  };

  render() {
    return (
      <div className="box">
        <h1 className="title">Quick Note</h1>
        <br />
        <GoogleLogin
          clientId={clientId}
          render={renderProps => (
            <input
              type="button"
              value="Login with Google"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            />
          )}
          isSignedIn={true}
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    );
  }
}

export default LoginPage;
