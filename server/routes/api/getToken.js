const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

module.exports = (app) => {
  app.post("/api/getToken", function (req, res, next) {
    const TOKEN_PATH = "token.json";

    const client_secret = "KhqWFC1f-MkZSc81KtCrnGqT";
    const client_id =
      "265366252371-meqnc3qhk3ttmps84mqtikte25ujrjar.apps.googleusercontent.com";
    const redirect_uris = ["http://localhost:8080/googleauth"];
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    oAuth2Client.getToken(req.body, async (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);

      let events = await listEvents(oAuth2Client);
      console.log("events1", events);
      res.status(200).json(events);
    });

    /**
     * Lists the next 10 events on the user's primary calendar.
     * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
     */
  });
};

function listEvents(auth) {
  return new Promise((resolve, reject) => {
    const calendar = google.calendar({ version: "v3", auth });
    calendar.events.list(
      {
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: "startTime",
      },
      (err, res) => {
        if (err) return console.log("The API returned an error: " + err);
        const events = res.data.items;
        console.log("events", events);
        resolve(events);
        if (events.length) {
          console.log("Upcoming 10 events:");
          events.map((event, i) => {
            const start = event.start.dateTime || event.start.date;
            console.log(`${start} - ${event.summary}`);
          });
        } else {
          console.log("No upcoming events found.");
        }
      }
    );
  });
}
