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
        try {
            const data = await this.cognito.send(new SignUpCommand(params));
            return data;
        } catch (err) {
            console.error(err);
            return err;
        }
    }
}


// EXPORTS
export default Cognito;