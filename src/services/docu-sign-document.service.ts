import { Inject, Injectable, Logger } from '@nestjs/common';
import { DocusignModuleOptions } from '../interfaces/docusign-options.interface';
import * as docusign from 'docusign-esign';

/**
 * Service responsible for handling document operations
 */
@Injectable()
export class DocuSignDocumentService {
  private readonly logger = new Logger(DocuSignDocumentService.name);
  private apiClient: docusign.ApiClient;

  constructor(@Inject('DOCUSIGN_CONFIG') private config: DocusignModuleOptions) {
    this.apiClient = new docusign.ApiClient();
    this.apiClient.setOAuthBasePath(this.config.oAuthBasePath);
    this.apiClient.setBasePath(this.config.basePath);
  }

  /**
   * Get document by its ID
   * @param documentId
   * @returns
   */
  async getDocument(documentId: string): Promise<docusign.EnvelopeDocument> {
    this.logger.log('Getting document...');
    try {
      const results = await this.apiClient.getEnvelopeDocument(
        this.config.accountId,
        documentId,
      );
      return results;
    } catch (error) {
      this.logger.error('Failed to get document:', error);
      throw error;
    }
  }
}
