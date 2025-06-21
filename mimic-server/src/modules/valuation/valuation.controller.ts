import { ApiResultResponse } from '@app/common';
import { Body, Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PagerValuationDto } from './dto/pager-valuation.dto';
import { ValuationService } from './valuation.service';
import { PagerValuationVo } from './vo/pager-valuation.vo';

@ApiTags('估值')
@Controller({
  path: 'valuation',
  version: '1',
})
export class ValuationController {
  constructor(private readonly valuationService: ValuationService) {}

  @ApiOperation({ summary: '列表' })
  @ApiResultResponse({ model: PagerValuationVo, isPager: true })
  @Get()
  async pager(@Body() pagerValuationDto: PagerValuationDto) {
    const { count, list } =
      await this.valuationService.pager(pagerValuationDto);
    return { count, list: list.map((item) => new PagerValuationVo(item)) };
  }
}
