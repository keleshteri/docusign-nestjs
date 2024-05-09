import { DynamicModule, Module, OnModuleInit, Provider } from '@nestjs/common';
import { DocusignService } from './docusign.service';
import {
  DocuSignConfig,
  DocusignModuleAsyncOptions,
  DocusignModuleOptionsFactory,
} from './config/docusign.config';
import { DocuSignAuthenticationService } from './docu-sign-authentication.service';

@Module({})
export class DocusignModule {
  //static forRoot
  static forRoot(options: DocuSignConfig): DynamicModule {
    const providers: Provider[] = [
      {
        provide: 'DOCUSIGN_CONFIG',
        useValue: options,
      },
      DocusignService,
      DocuSignAuthenticationService,
    ];

    return {
      module: DocusignModule,
      providers: providers,
      exports: providers,
    };
  }

  //static forRootAsync
  static forRootAsync(options: DocusignModuleAsyncOptions): DynamicModule {
    const providers = this.createAsyncProviders(options);
    return {
      module: DocusignModule,
      providers: providers,
      exports: providers,
    };
  }
  //createAsyncProviders
  private static createAsyncProviders(options: DocusignModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useClass) {
      return [
        {
          provide: 'DOCUSIGN_CONFIG',
          useFactory: async (optionsFactory: DocusignModuleOptionsFactory) => {
            return optionsFactory.createDocusignModuleOptions();
          },
          inject: [options.useExisting || options.useClass],
        },
        DocusignService,
        DocuSignAuthenticationService,
      ];
    } else if (options.useFactory) {
      return [
        {
          provide: 'DOCUSIGN_CONFIG',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        DocusignService,
        DocuSignAuthenticationService,
      ];
    }
    throw new Error('Invalid DocusignModuleAsyncOptions');
  }
}
