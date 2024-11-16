// IMPORTS


// CONSTANTS


// CLASS
class Cognito {
    constructor(cognitoClient) {
        this.cognito = cognitoClient;
        this.ClientId = process.env.COGNITO_CLIENT_ID;
    }
}


// EXPORTS
export default Cognito;