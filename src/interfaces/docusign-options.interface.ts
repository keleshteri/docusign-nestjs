import { Type } from "@nestjs/common";
import { DocuSignConfig } from "../config/docusign.config";


/**
 * Interface for DocusignModuleOptions
 */
export interface DocusignModuleOptions extends DocuSignConfig {}

/**
 * Interface for DocusignModuleAsyncOptions
 */
export interface DocusignModuleAsyncOptions {
  imports?: any[];
  useClass?: Type<DocusignModuleOptionsFactory>;
  useExisting?: Type<DocusignModuleOptionsFactory>;
  useFactory?: (...args: any[]) => DocuSignConfig | Promise<DocuSignConfig>;
  inject?: any[];
}

//OptionsFactory
export interface DocusignModuleOptionsFactory {
  createDocusignModuleOptions(): Promise<DocuSignConfig> | DocuSignConfig;
}
 
