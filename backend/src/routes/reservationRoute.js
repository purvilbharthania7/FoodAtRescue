const express = require("express");
const router = express.Router();

const { getAllReservation, addReservation, getReservation, deleteReservation, updateReservation, getMyReservation } = require("../controllers/reservationController")

router.post("/addReservation", addReservation);
router.get("/getAllReservation", getAllReservation);
router.delete("/deleteReservation/:id", deleteReservation);
router.get("/getReservation/:id", getReservation);
router.put("/updateReservation/:id", updateReservation);
router.get("/getMyReservation/:customerId", getMyReservation);

module.exports = router;