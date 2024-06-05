const express = require("express");
const router = express.Router();
const pg = require("pg");
const {
  getAllReservations,
  deleteReservation,
  getReservationByCustomerId,
} = require("./db");

const client = new pg.Client("postgres://localhost/acme_reservation_planner");
client.connect();

// get all Reservations
router.get("/", async (req, res, next) => {
  try {
    const response = await client.query(
      `SELECT * FROM reservation ORDER BY id ASC`
    );
    res.send(response.rows);
    res.send(await getAllReservations());
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    res.send(await deleteReservation(req.params.id));
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    res.send(await getReservationByCustomerId(req.params.id));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
