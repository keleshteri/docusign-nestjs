/**
 * DocuSign Configuration
 */
export interface DocuSignConfig {
  //basePath defaults https://www.docusign.net/restapi - every API call's (relative) path
  basePath: string;
  //oAuthBasePath - every authentication API call's (relative) path.
  oAuthBasePath: string;
  //accountId
  accountId: string;
  // integrationKey or Client Id
  integrationKey: string;
  //Client secret
  clientSecret: string;
  //RSA Private Key -
  rsaPrivateKey: string;
  //Redirect/Callback URI
  redirectUri: string;
  // userId
  userId: string;
  //Authentication scopes
  scopes: string[];
  //Tokens
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}
