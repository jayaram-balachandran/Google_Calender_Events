const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

module.exports = (app) => {
  app.get("/api/getInfo", function (req, res, next) {
    //Google Calender :

    // If modifying these scopes, delete token.json.
    const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    const TOKEN_PATH = "token.json";

    // Load client secrets from a local file.
    fs.readFile("credentials.json", (err, content) => {
      if (err) return console.log("Error loading client secret file:", err);
      // Authorize a client with credentials, then call the Google Calendar API.
      authorize(JSON.parse(content));

      //   authorize(JSON.parse(content), listEvents);
    });

    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * @param {Object} credentials The authorization client credentials.
     * @param {function} callback The callback to call with the authorized client.
     */

    function authorize(credentials, callback) {
      const client_secret = "KhqWFC1f-MkZSc81KtCrnGqT";
      const client_id =
        "265366252371-meqnc3qhk3ttmps84mqtikte25ujrjar.apps.googleusercontent.com";
      const redirect_uris = ["http://localhost:8080/googleauth"];
      //   const { client_secret, client_id, redirect_uris } = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
      );

      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
      });
    }

    /**
     * Get and store new token after prompting for user authorization, and then
     * execute the given callback with the authorized OAuth2 client.
     * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
     * @param {getEventsCallback} callback The callback for the authorized client.
     */
    function getAccessToken(oAuth2Client, callback) {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
      });
      console.log("Authorize this app by visiting this url:", authUrl);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      res.status(200).json(authUrl);
    }
  });
};
