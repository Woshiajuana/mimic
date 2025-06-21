import { CommonVo } from '@app/boss/common';

import { BaseUserVo } from '../../user/vo/base-user.vo';

export class BaseIntentionVo extends CommonVo {
  constructor(partial: any) {
    super();
    this.merge(partial, () => {
      return {
        user: new BaseUserVo(partial.user),
      };
    });
  }

  /**
   * ID
   */
  id: string;

  /**
   * 类型: (1: 买车、2: 卖车)
   */
  type: string;

  /**
   * 品牌名称
   */
  brandName: string;

  /**
   * 车系名称
   */
  seriesName: string;

  /**
   * 制造方
   */
  manufacturer: string;

  /**
   * 所在省份
   */
  province: string;

  /**
   * 所在城市
   */
  city: string;

  /**
   * 手机号码
   */
  mobile: string;

  /**
   * 用户信息
   */
  user: BaseUserVo;

  /**
   * 估值id
   */
  valuationId: string;
}
