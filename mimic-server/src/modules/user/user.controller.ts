import { ApiResultResponse } from '@app/common';
import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { PagerUserDto } from './dto/pager-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { PagerUserVo } from './vo/pager-user.vo';

@ApiTags('用户')
@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '列表' })
  @ApiResultResponse({ model: PagerUserVo, isPager: true })
  @Get()
  async pager(@Query() pagerUserDto: PagerUserDto) {
    const { count, list } = await this.userService.pager(pagerUserDto);
    return { count, list: list.map((item) => new PagerUserVo(item)) };
  }

  @ApiOperation({ summary: '更新' })
  @ApiResultResponse()
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    await this.userService.update(id, updateUserDto);
  }
}
