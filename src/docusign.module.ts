import { Module, OnModuleInit } from "@nestjs/common";
import { DocusignService } from "./docusign.service";

@Module({
  imports: [],
  controllers: [],
  providers: [DocusignService],
  exports: [],
})
export class DocusignModule implements OnModuleInit {
  onModuleInit() {
    console.log(`The module has been initialized.`);
  }
  
}
