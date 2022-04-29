const AWS = require("aws-sdk");
const uuid = require("uuid");

const {
  DYNAMO_REGION,
  DYNAMO_KEY,
  DYNAMO_SECRET_KEY,
} = require("../config/index");

AWS.config.update({
  region: DYNAMO_REGION,
  accessKeyId: DYNAMO_KEY,
  secretAccessKey: DYNAMO_SECRET_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "Reservation";

const getAllReservation = async (req, res) => {
  try {
    const params = {
      TableName: TABLE_NAME,
    };
    const reservations = await dynamoClient.scan(params).promise();
    return res.status(200).json({
      message: "Reservation details retrieved Successfully",
      success: true,
      data: reservations,
    });
    //return foods;
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Unable to get all Reservation Details!!",
      success: false,
    });
  }
};

const addReservation = async (req, res) => {
  try {
    const Item = { ...req.body };
    Item.id = uuid.v1();
    const params = {
      TableName: TABLE_NAME,
      Item: Item,
    };
    await dynamoClient
      .put(params)
      .promise()
      .then(() => {
        return res
          .status(201)
          .json({ message: "Reservation is Successfull!!", success: true });
      });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Unable to Add Details!!",
      success: false,
    });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const id = req.params.id;
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id,
      },
    };
    const reservation = await dynamoClient.get(params).promise();
    const count = Object.keys(reservation).length;
    if (count == 0) {
      return res
        .status(404)
        .json({ message: "Reservation Details not found!!", success: false });
    }

    await dynamoClient
      .delete(params)
      .promise()
      .then(() => {
        return res.status(200).json({
          message: "Reservation Details Deleted Successfully",
          success: true,
        });
      });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Unable to Delete!!",
      success: false,
    });
  }
};

const getReservation = async (req, res) => {
  try {
    const id = req.params.id;
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id,
      },
    };
    const reservation = await dynamoClient.get(params).promise();
    const count = Object.keys(reservation).length;
    if (count == 0) {
      res.status(404).json({
        message: "No Reservation Details Available",
        success: false,
      });
    } else {
      res.status(200).json({
        message: "Reservation Details Retrieved Successfully",
        success: true,
        data: reservation,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error!!",
      success: false,
      error: error.message,
    });
  }
};

const updateReservation = async (req, res) => {
  try {
    const id = req.params.id;
    const params = {
      TableName: TABLE_NAME,
      Key: {
        id,
      },
    };
    const reservation = await dynamoClient.get(params).promise();
    const count = Object.keys(reservation).length;
    if (count == 0) {
      return res
        .status(404)
        .json({ message: "Reservation Details not found!!", success: false });
    }

    const Item = { ...req.body };
    Item.id = id;

    const param = {
      TableName: TABLE_NAME,
      Item: Item,
    };

    await dynamoClient
      .put(param)
      .promise()
      .then(() => {
        return res.status(201).json({
          message: "Reservation Details Updated Successfully",
          success: true,
        });
      });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      message: "Unable to Update Details!!",
      success: false,
    });
  }
};

const getMyReservation = async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const params = {
      TableName: TABLE_NAME,
      FilterExpression: "customerId = :customerId ",
      ExpressionAttributeValues: {
        ":customerId": customerId,
      },
    };
    const myReservation = await dynamoClient.scan(params).promise();
    const count = Object.keys(myReservation).length;
    if (count == 0) {
      res.status(404).json({
        message: "No Reservation Details Available",
        success: false,
      });
    } else {
      res.status(200).json({
        message: "Reservation Details Retrieved Successfully",
        success: true,
        data: myReservation,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error!!",
      success: false,
      error: error.message,
    });
  }
};
module.exports = {
  getAllReservation,
  addReservation,
  deleteReservation,
  getReservation,
  updateReservation,
  getMyReservation,
};
