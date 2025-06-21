import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';

import { CoreService } from './core.service';
import { ValuationCoreService } from './valuation-core.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [CoreService, ValuationCoreService],
  exports: [CoreService, ValuationCoreService],
})
export class CoreModule {}
