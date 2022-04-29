const express = require("express");
const router = express.Router();
const multer = require('multer')
const path = require('path');
const { getAllFood, addFood, getFood, deleteFood, updateFood, getMyFood, getMyPosting, getReservation } = require("../controllers/foodController");

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(path.dirname(__dirname), "images"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    },
});

const upload = multer({ storage: fileStorage })
const { uploadFile } = require('../controllers/s3')

router.post("/addFood", addFood);
router.get("/getAllFood", getAllFood);
router.delete("/deleteFood/:id", deleteFood);
router.get("/getFood/:id", getFood);
router.put("/updateFood/:id", updateFood);
router.get("/getMyFood/:customerId", getMyFood);
router.get("/getMyPosting/:ownerId", getMyPosting);
router.get("/getReservation/:ownerId", getReservation);

router.post(
    "/uploadImage",
    upload.single('image'), async (req, res) => {
        try {
            const result = await uploadFile(req.file)
            res.send(result.Location)
        } catch (error) {
            res.send(error.message)
        }

    },
)

module.exports = router;