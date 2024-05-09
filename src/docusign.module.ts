import { DynamicModule, Module, OnModuleInit, Provider } from '@nestjs/common';
import { DocusignService } from './docusign.service';
import {
  DocusignConfig,
  DocusignModuleAsyncOptions,
  DocusignModuleOptionsFactory,
} from './config/docusign.config';

@Module({
  // providers: [DocusignService],
  // exports: [DocusignService],
})
export class DocusignModule implements OnModuleInit {
  onModuleInit() {
    console.log(`The module has been initialized.`);
  }

  //static forRoot
  static forRoot(options: DocusignConfig): DynamicModule {
    const providers: Provider[] = [
      {
        provide: 'DOCUSIGN_CONFIG',
        useValue: options,
      },
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
      ];
    } else if (options.useFactory) {
      return [
        {
          provide: 'DOCUSIGN_CONFIG',
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        DocusignService,
      ];
    }
    throw new Error('Invalid DocusignModuleAsyncOptions');
  }
}
