const express = require("express");
const AWS = require('aws-sdk');
const { DYNAMO_REGION, DYNAMO_KEY, DYNAMO_SECRET_KEY } = require('./src/config/index');


const client = () => {
    AWS.config.update({
        region: DYNAMO_REGION,
        accessKeyId: DYNAMO_KEY,
        secretAccessKey: DYNAMO_SECRET_KEY,
    });
    const dynamoClient = new AWS.DynamoDB.DocumentClient();
    return dynamoClient;
}



module.exports = { dynamoClient };