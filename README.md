# Aero Badminton Open
Tournament site for the Aerospace Badminton Tournament (Aero Games Organisation).

## Deploy
1. New public GitHub repo named `aero-badminton-open`. Upload all files here (index.html, style.css, app.js, config.js, poster.jpg, README.md) to the repo root.
2. Settings -> Pages -> Deploy from a branch -> main -> / (root). Live at `https://lkritheesh.github.io/aero-badminton-open/`.

## Connect data
Copy the chess Google Sheet, keep tabs `Settings`, `Players`, `Matches`, share as "Anyone with the link: Viewer", paste the sheet ID into `config.js`.
- Players: `id | name | paid | status`
- Matches: `round | player1 | player2 | date | time | court | score | result` (result = P1, P2 or Pending; score e.g. 21-15, 18-21, 21-17)
- Settings (name, value): `eventDate`, `time`, `format`, `winner`, `runnerUp`

## Add to the hub
In the hub's `data.js`, set this tournament's `url` to the live address.
