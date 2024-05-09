import { Injectable } from '@nestjs/common';
import { DocusignModuleOptions } from '../interfaces/docusign-options.interface';
/**
 * Service to provide configuration for DocuSign
 */
@Injectable()
export class DocuSignConfigService {
  private config: DocusignModuleOptions;

  /**
   *  Constructor
   * @param initialConfig
   */
  constructor(initialConfig: DocusignModuleOptions) {
    this.config = initialConfig;
  }

  updateConfig(newConfig: Partial<DocusignModuleOptions>) {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Get the configuration
   */
  getConfig(): DocusignModuleOptions {
    return this.config;
  }
}
