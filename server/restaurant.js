const express = require("express");
const router = express.Router();
const pg = require("pg");
const { getAllRestaurants, createRestaurant } = require("./db");

const client = new pg.Client("postgres://localhost/acme_reservation_planner");
client.connect();

// get all Restaurants
router.get("/", async (req, res, next) => {
  try {
    const response = await client.query(
      `SELECT * FROM restaurant ORDER BY id ASC`
    );
    res.send(response.rows);
    res.send(await getAllRestaurants());
  } catch (err) {
    next(err);
  }
});
// create Restaurant

router.post("/", async (req, res, next) => {
  try {
    const response = await client.query(
      `INSERT INTO restaurant(name) VALUES($1)`,
      [req.body.name]
    );

    res.send(await createRestaurant(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
