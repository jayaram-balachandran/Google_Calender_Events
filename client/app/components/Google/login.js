import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Url: "",
    };
  }

  successResponse = () => {
    axios
      .get("/api/getInfo")

      .then((data) => {
        console.log("data", data.data);
        this.setState({ Url: data.data });
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  failedResponse = (response) => {
    console.log("error", response);
  };

  render() {
    const { Url } = this.state;

    return (
      <div>
        {Url ? (
          <div className="jumbotron">
            <h1 className="display-4">Click below to authorise !</h1>
            <p className="lead"></p>
            <hr className="my-4" />
            <p></p>
            <a type="button" className="btn btn-primary" href={Url}>
              Click here
            </a>
          </div>
        ) : (
          <div className="jumbotron">
            <h1 className="display-4">Google Calender Events</h1>
            <p className="lead">
              This is a simple web app to access your google calender and fetch
              events.
            </p>
            <hr className="my-4" />
            <p>Click below icon to sign in with Google !</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={this.successResponse}
            >
              <img src="data:image/png;base64,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" />{" "}
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
