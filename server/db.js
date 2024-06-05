const express = require("express");
const router = express.Router();
const pg = require("pg");

const client = new pg.Client("postgres://localhost/acme_reservation_planner");
// client.connect();

const getAllCustomers = async () => {
  const response = await client.query(`SELECT * FROM customer ORDER BY id ASC`);
  return response.rows;
};

const getSingleCustomer = async (id) => {
  const response = await client.query(`SELECT * FROM customer WHERE id = $1`, [
    id,
  ]);
  return response.rows[0];
};

const createCustomer = async (body) => {
  await client.query(`INSERT INTO customer(name) VALUES($1)`, [body.name]);
  return {
    name: body.name,
  };
};
const createRestaurant = async (body) => {
  await client.query(`INSERT INTO restaurant(name) VALUES($1)`, [body.name]);
  return {
    name: body.name,
  };
};

const deleteReservation = async (id) => {
  await client.query(`DELETE from reservation WHERE id = $1`, [Number(id)]);
  return {
    id: id,
  };
};

// const updateFire = async (id, body) => {
//   const response = await client.query(
//     `UPDATE fires SET name=$1, intensity=$2 WHERE id=$3 RETURNING *`,
//     [body.name, Number(body.intensity), Number(id)]
//   );
//   return response.rows[0];
// };

const getAllRestaurants = async () => {
  const response = await client.query(
    `SELECT * FROM restaurant ORDER BY id ASC`
  );
  return response.rows;
};
const getAllReservations = async () => {
  const response = await client.query(
    `SELECT * FROM reservation ORDER BY id ASC`
  );
  return response.rows;
};
const getReservationByCustomerId = async (params_id) => {
  const response = await client.query(`SELECT * FROM customer WHERE id= $1`, [
    params_id,
  ]);
  const { id, name } = response.rows[0];
  const reservation_response = await client.query(
    `SELECT * FROM reservation WHERE customer_id = $1`,
    [params_id]
  );
  return {
    id,
    name,
    reservation: reservation_response.rows[0],
  };
};
// const getSingleEmergency = async (params_id) => {
//   const response = await client.query(
//     `SELECT * FROM emergencies WHERE id = $1`,
//     [params_id]
//   );

//   const { id, fire_id, location_id, resolved } = response.rows[0];
//   const fire_response = await client.query(
//     `SELECT * FROM fires WHERE id = $1`,
//     [fire_id]
//   );
//   return {
//     id,
//     fire_id,
//     location_id,
//     resolved,
//     fire: fire_response.rows[0],
//   };
// };

// const getEmergenciesByFireId = async (params_id) => {
//   const response = await client.query(
//     `SELECT * FROM emergencies WHERE fire_id = $1`,
//     [params_id]
//   );
//   return response.rows;
// };

module.exports = {
  getAllCustomers,
  getSingleCustomer,
  createCustomer,
  createRestaurant,
  deleteReservation,
  //   updateFire,
  getAllRestaurants,
  getReservationByCustomerId,
  //   getSingleEmergency,
  //   getEmergenciesByFireId,
  client,
};
