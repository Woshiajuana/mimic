import { Status } from '@app/db';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export abstract class CommonDto {
  /**
   * 备注
   */
  @IsOptional()
  @IsString()
  @MaxLength(500)
  remark?: string;

  /**
   * 状态: (0: 禁用、1: 正常) 默认: 1
   */
  @ApiProperty({ default: Status.NORMAL })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;
}
