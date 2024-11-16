// IMPORTS
import { SignUpCommand, InitiateAuthCommand, ConfirmSignUpCommand } from "@aws-sdk/client-cognito-identity-provider";


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
            Username: email,
            UserAttributes: [
                {
                    Name: 'email',
                    Value: email
                }
            ]
        };
        return await this.cognito.send(new SignUpCommand(params));
    }

    async signIn(email, password) {
        const params = {
            AuthFlow: "USER_PASSWORD_AUTH",
            ClientId: this.ClientId,
            AuthParameters: {
                USERNAME: email,
                PASSWORD: password
            }
        };
        const response = await this.cognito.send(new InitiateAuthCommand(params));
        const decodedToken = JSON.parse(Buffer.from(response.AuthenticationResult.IdToken.split('.')[1], 'base64').toString('utf-8'));
        return decodedToken.sub;
    }

    async verify(email, code) {
        const params = {
            ClientId: this.ClientId,
            ConfirmationCode: code,
            Username: email
        };
        return await this.cognito.send(new ConfirmSignUpCommand(params));
    }
}


// EXPORTS
export default Cognito;