import { Inject, Injectable, Logger } from '@nestjs/common';
import * as docusign from 'docusign-esign';
import { DocusignModuleOptions } from '../interfaces/docusign-options.interface';

@Injectable()
export class DocuSignAuthenticationService {
  private readonly logger = new Logger(DocuSignAuthenticationService.name);
  private apiClient: docusign.ApiClient;

  constructor(@Inject('DOCUSIGN_CONFIG') private config: DocusignModuleOptions) {
    this.apiClient = new docusign.ApiClient();
    this.apiClient.setOAuthBasePath(this.config.oAuthBasePath);
  }
  /**
   *  Get Authorization URI
   * @returns
   */
  async getAuthorizationUri(): Promise<string> {
    const authUri = this.apiClient.getAuthorizationUri(
      this.config.integrationKey,
      this.config.scopes || ['signature'],
      this.config.redirectUri,
      'code',
    );
    return authUri;
  }

  /**
   * Get Access Token by Code
   * @param code
   * @returns
   */
  async getAccessTokenByCode(code: string): Promise<string> {
    this.logger.log('Getting access token by code...');
    this.apiClient.setBasePath(this.config.basePath);
    try {
      // Get the access token
      const results = await this.apiClient.generateAccessToken(
        this.config.integrationKey,
        this.config.clientSecret,
        code,
      );
      return results.body.access_token;
    } catch (error) {
      console.error('Failed to get access token:', error);
      throw error;
    }
  }

  /**
   * Get Access Token by JWT User
   * @returns
   */
  async getAccessTokenByJWTUser(): Promise<string> {
    this.logger.log('Getting access token by JWT User...');
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
    this.logger.log('Authenticating...');
    const accessToken = await this.getAccessTokenByJWTUser();
    this.apiClient.addDefaultHeader('Authorization', 'Bearer ' + accessToken);
    this.apiClient.setBasePath(this.config.basePath);
    const userInfo = await this.apiClient.getUserInfo(accessToken);
    return userInfo;
  }
}
