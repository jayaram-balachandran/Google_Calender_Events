import React, { Component } from "react";
import queryString from "query-string";
import axios from "axios";
import moment from "moment";

class googleAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    console.log(location.search);

    const parsed = queryString.parse(location.search);
    console.log("code:", parsed.code);
    let code = parsed.code;

    axios
      .post("/api/getToken", { code })

      .then((data) => {
        console.log("data", data.data);
        this.setState({ events: data.data });
        console.log("map", this.state.events);
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { events } = this.state;

    return (
      <div>
        <div className="col">
          <h1>Upcoming 10 Events in calender are listed below : </h1>
          <p>Attend it without Fail! </p>
        </div>

        <table class="table table-dark">
          <thead>
            <tr>
              <td>Date</td>
              <td>Event Name</td>
              <td>Organiser</td>
              <td>Event Status</td>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
                {event.start.date ? (
                  <td>
                    {moment(event.start.date).format("MMMM Do YYYY, h:mm:ss a")}
                  </td>
                ) : (
                  <td>
                    {moment(event.start.dateTime).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </td>
                )}
                <td>{event.summary}</td>
                <td>{event.organizer.email}</td>
                <td>{event.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default googleAuth;
