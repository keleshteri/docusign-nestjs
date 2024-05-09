import { Type } from "@nestjs/common";

export interface DocusignConfig {
  accountId: string;
  baseUrl: string;
  integrationKey: string;
  rsaPrivateKey: string;
  oAuthBasePath: string;
  userId: string;
}

//OptionsFactory
export interface DocusignModuleOptionsFactory {
  createDocusignModuleOptions(): Promise<DocusignConfig> | DocusignConfig;
}
//AsyncOptions
export interface DocusignModuleAsyncOptions {
  useClass?: Type<DocusignModuleOptionsFactory>;
  useExisting?: Type<DocusignModuleOptionsFactory>;
  useFactory?: (...args: any[]) => DocusignConfig | Promise<DocusignConfig>;
  inject?: any[];
}
