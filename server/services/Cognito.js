// IMPORTS
import { SignUpCommand } from "@aws-sdk/client-cognito-identity-provider";


// CONSTANTS


// CLASS
class Cognito {
    constructor(cognitoClient) {
        this.cognito = cognitoClient;
        this.ClientId = process.env.COGNITO_CLIENT_ID;
    }

    async signUp(email, password) {
        const params = {
            ClientId: this.ClientId,
            Password: password,
            Username: email
        };
        return await this.cognito.send(new SignUpCommand(params));
    }
}


// EXPORTS
export default Cognito;