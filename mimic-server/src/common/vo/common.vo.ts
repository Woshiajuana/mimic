import { BaseVo } from '@app/common';
import { Status } from '@app/db';

export class CommonVo extends BaseVo {
  /**
   * 创建时间
   */
  createdAt: number;

  /**
   * 更新时间
   */
  updatedAt: number;

  /**
   * 备注
   */
  remark: string;

  /**
   * 状态
   */
  status: Status;
}
