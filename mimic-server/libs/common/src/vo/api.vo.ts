import { ApiProperty } from '@nestjs/swagger';

/**
 * 基础响应类
 */
export class ApiBaseVo {
  @ApiProperty({ description: '状态码' })
  code: string;

  @ApiProperty({ description: '信息' })
  message: string;

  @ApiProperty({ description: '信息参数' })
  messageParams: Record<string, any> | null;
}

/**
 * 响应类
 */
export class ApiVo<T = any> extends ApiBaseVo {
  @ApiProperty({ description: '数据' })
  data: T;
}

/**
 * 分页响应类
 */
export class ApiPagerVo<T = any> extends ApiBaseVo {
  @ApiProperty({ description: '数据' })
  data: {
    list: T[];
    count: number;
  };
}
