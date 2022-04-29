// Author: Anuj Dev (B00900887)

const sendgrid = require("@sendgrid/mail");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const AWS = require("aws-sdk");
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
const AWS_SES = new AWS.SES();

const sendEmail = async (email, subject, payload, template) => {
  const source = fs.readFileSync(path.join(__dirname, template), "utf8");
  const compiledTemplate = handlebars.compile(source);
  try {
    let params = {
      Source: "foodatrescuecloud@gmail.com",
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: compiledTemplate(payload),
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
      },
    };
    return AWS_SES.sendEmail(params).promise();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  sendEmail,
};
