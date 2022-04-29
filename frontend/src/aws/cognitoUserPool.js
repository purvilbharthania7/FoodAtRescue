import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "<UserPoolId>",
  ClientId: "<ClientId>",
};

export default new CognitoUserPool(poolData);
