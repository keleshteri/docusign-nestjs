import { DynamicModule, Module, OnModuleInit, Provider } from '@nestjs/common';
import { DocusignService } from './services/docusign.service';
import { DocuSignAuthenticationService } from './services/docu-sign-authentication.service';
import { DocusignModuleAsyncOptions, DocusignModuleOptions, DocusignModuleOptionsFactory } from './interfaces/docusign-options.interface';
import { DocuSignConfigService } from './services/docu-sign-config.service';

@Module({})
export class DocusignModule {
  //static forRoot
  static forRoot(options: DocusignModuleOptions): DynamicModule {
    const providers: Provider[] = [
      {
        provide: 'DOCUSIGN_CONFIG',
        useValue: options,
      },
      DocuSignConfigService,
      DocuSignAuthenticationService,
      DocusignService,
      
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
      imports: options.imports || [],
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
        DocuSignConfigService,
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
        DocuSignConfigService,
      ];
    }
    throw new Error('Invalid DocusignModuleAsyncOptions');
  }
}
