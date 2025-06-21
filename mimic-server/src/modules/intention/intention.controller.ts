import { ApiResultResponse } from '@app/common';
import { Body, Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PagerIntentionDto } from './dto/pager-intention.dto';
import { IntentionService } from './intention.service';
import { PagerIntentionVo } from './vo/pager-intention.vo';

@ApiTags('意向单')
@Controller({
  path: 'intention',
  version: '1',
})
export class IntentionController {
  constructor(private readonly intentionService: IntentionService) {}

  @ApiOperation({ summary: '列表' })
  @ApiResultResponse({ model: PagerIntentionVo, isPager: true })
  @Get()
  async pager(@Body() pagerIntentionDto: PagerIntentionDto) {
    const { count, list } =
      await this.intentionService.pager(pagerIntentionDto);
    return { count, list: list.map((item) => new PagerIntentionVo(item)) };
  }
}
