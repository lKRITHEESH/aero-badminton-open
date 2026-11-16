/*
  AERO BADMINTON OPEN: DATA CONNECTION
  1. Copy your chess Google Sheet. Keep tabs named exactly: Settings, Players, Matches.
  2. Share it: Anyone with the link -> Viewer.
  3. Paste the sheet ID below (the part between /d/ and /edit in its address).

  Players:  id | name | paid | status
  Matches:  round | player1 | player2 | date | time | court | score | result   (result = P1, P2 or Pending)
  Settings (two columns): eventDate, time, venue, format, prizeNote, winner, runnerUp
*/
const SHEET_ID = "1qPVsGHSQphinLdd4ydsIY9ovki3zz8sSppwHfnhz3fY";
const SHEET_TABS = { settings: "Settings", players: "Players", matches: "Matches" };
const CONTACT_EMAIL = "businesschime1@gmail.com";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Synthetic+Badminton+Court+Behind+Vasistha";
const REFRESH_MS = 30000;
