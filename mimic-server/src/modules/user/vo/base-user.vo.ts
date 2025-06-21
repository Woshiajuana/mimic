import { CommonVo } from '@app/boss/common';

export class BaseUserVo extends CommonVo {
  constructor(partial: any) {
    super();
    this.merge(partial);
  }

  /**
   * id
   */
  id: number;

  /**
   * openid
   */
  openid: string;
}
