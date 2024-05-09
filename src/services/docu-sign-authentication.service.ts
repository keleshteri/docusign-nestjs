import { Injectable } from '@nestjs/common';
import * as docusign from 'docusign-esign';
import { DocuSignConfig } from '../config/docusign.config';

@Injectable()
export class DocuSignAuthenticationService {
  private apiClient: docusign.ApiClient;

  constructor(private config: DocuSignConfig) {
    this.apiClient = new docusign.ApiClient();
    this.apiClient.setOAuthBasePath(this.config.oAuthBasePath);
  }
  /**
   *
   * @returns
   */
  async getAccessTokenByJWTUser(): Promise<string> {
    // Set the base path for the OAuth
    this.apiClient.setBasePath(this.config.basePath);
    try {
      const jwtLifeSec = this.config.expiresIn || 3600;

      if (
        !this.config.integrationKey ||
        !this.config.userId ||
        !this.config.rsaPrivateKey
      ) {
        throw new Error('Please provide integrationKey, userId, rsaPrivateKey');
      }
      const results = await this.apiClient.requestJWTUserToken(
        this.config.integrationKey,
        this.config.userId,
        this.config.scopes || ['signature'],
        this.config.rsaPrivateKey,
        jwtLifeSec,
      );
      return results.body.access_token;
    } catch (error) {
      console.error('Failed to get JWT token:', error);
      throw error;
    }
  }

  /**
   *  Authenticate
   * @returns
   */
  async authenticate(): Promise<docusign.UserInfo> {
    const accessToken = await this.getAccessTokenByJWTUser();
    this.apiClient.addDefaultHeader('Authorization', 'Bearer ' + accessToken);

    const usersApi = new docusign.UsersApi(this.apiClient);
    return usersApi.get(this.config.accountId);
  }
}
