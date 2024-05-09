import { Type } from "@nestjs/common";


//DO WE NEED TO ADD DocuSignConfig OR NEED USE ON METHOD
  //Tokens
  // accessToken: string;
  // refreshToken: string;
  // expiresIn: number;
  // tokenType: string;
  // //Authentication scopes
export interface DocuSignConfig {
  baseUrl: string;
  accountId: string;
  integrationKey: string;
  //rsaPrivateKey or secretKey
  rsaPrivateKey: string;
  oAuthBasePath: string;
  userId: string;
}


//OptionsFactory
export interface DocusignModuleOptionsFactory {
  createDocusignModuleOptions(): Promise<DocuSignConfig> | DocuSignConfig;
}
//AsyncOptions
export interface DocusignModuleAsyncOptions {
  useClass?: Type<DocusignModuleOptionsFactory>;
  useExisting?: Type<DocusignModuleOptionsFactory>;
  useFactory?: (...args: any[]) => DocuSignConfig | Promise<DocuSignConfig>;
  inject?: any[];
}
