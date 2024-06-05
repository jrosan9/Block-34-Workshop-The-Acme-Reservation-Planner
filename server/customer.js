const express = require("express");
const router = express.Router();
const pg = require("pg");
// const {getAllCustomers, getSingleFire, addFire, deleteFire, updateFire, getEmergenciesByFireId}= require("../db/db");
const { getAllCustomers, createCustomer, getSingleCustomer } = require("./db");

const client = new pg.Client("postgres://localhost/acme_reservation_planner");
client.connect();

// get all customers
router.get("/", async (req, res, next) => {
  try {
    const response = await client.query(
      `SELECT * FROM customer ORDER BY id ASC`
    );
    res.send(response.rows);
    res.send(await getAllCustomers());
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const response = await client.query(
      `Select * FROM customer WHERE id = $1 `,
      [req.params.id]
    );
    res.send(response.rows[0]);
    res.send(await getSingleCustomer(req.params.id));
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const response = await client.query(
      `INSERT INTO customer(name) VALUES($1)`,
      [req.body.name]
    );
    // res.send({
    //   name: req.body.name,
    // });
    res.send(await createCustomer(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
