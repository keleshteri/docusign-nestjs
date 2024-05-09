import { Inject, Injectable } from '@nestjs/common';
import * as docusign from 'docusign-esign';
import { DocusignModuleOptions } from '../interfaces/docusign-options.interface';
 
@Injectable()
export class DocuSignAuthenticationService {
  private apiClient: docusign.ApiClient;

  constructor(@Inject('DOCUSIGN_CONFIG') private config: DocusignModuleOptions) {
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
    console.log('Access Token:', accessToken);
    this.apiClient.addDefaultHeader('Authorization', 'Bearer ' + accessToken);
    console.log('Account ID:', this.config.accountId);
    this.apiClient.setBasePath(this.config.basePath);
    const userInfo = await this.apiClient.getUserInfo(accessToken);
    console.log('UserInfo:', userInfo);
    return userInfo;
  }
}
