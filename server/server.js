const express = require("express");
const { client } = require("./db");
const app = express();
const baseQuery = `/api/`;
app.use(express.json());
client.connect();

app.get(baseQuery, (req, res) => {
  res.json({
    success: true,
  });
});
app.use(baseQuery + "customer", require("./customer"));
app.use(baseQuery + "restaurant", require("../server/restaurant.js"));
app.use(baseQuery + "reservation", require("../server/reservation.js"));

app.listen(8000, () => {
  console.log("App is running at port 8000");
});
