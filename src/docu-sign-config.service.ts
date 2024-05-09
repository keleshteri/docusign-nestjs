import { Injectable } from '@nestjs/common';
import { DocuSignConfig } from './config/docusign.config';
/**
 * Service to provide configuration for DocuSign
 */
@Injectable()
export class DocuSignConfigService {
  private config: DocuSignConfig;

  /**
   * Constructor
   * @param config
   */
  constructor(config: DocuSignConfig) {
    this.config = config;
  }

  //setConfig
  setConfig(config: DocuSignConfig) {
    this.config = config;
  }

  /**
   * Get the configuration
   */
  getConfig(): DocuSignConfig {
    return this.config;
  }

  /**
   * Get the base URL
   */
  getBaseUrl(): string {
    return this.config.baseUrl;
  }

  /**
   * Get the account ID
   */
  getAccountId(): string {
    return this.config.accountId;
  }

  /**
   * Get the integration key
   */
  getIntegrationKey(): string {
    return this.config.integrationKey;
  }

  /**
   * Get the RSA private key
   */
  getRsaPrivateKey(): string {
    return this.config.rsaPrivateKey;
  }

  /**
   * Get the OAuth base path
   */
  getOAuthBasePath(): string {
    return this.config.oAuthBasePath;
  }

  /**
   * Get the user ID
   */

  getUserId(): string {
    return this.config.userId;
  }
}
