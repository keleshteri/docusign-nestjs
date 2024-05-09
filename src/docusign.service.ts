import { Inject, Injectable } from "@nestjs/common";
import * as docusign from "docusign-esign";
import { DocusignConfig } from "./config/docusign.config";
// import docusign from 'docusign-esign';
 
@Injectable()
export class DocusignService {
  private apiClient: docusign.ApiClient;

  constructor(@Inject('DOCUSIGN_CONFIG') private config: DocusignConfig) {
    this.apiClient = new docusign.ApiClient();
    this.apiClient.setOAuthBasePath(this.config.oAuthBasePath);
    console.log("DocusignService constructor called");
    console.log(this.config);
  }
}
