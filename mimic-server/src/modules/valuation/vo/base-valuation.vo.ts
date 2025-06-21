import { CommonVo } from '@app/boss/common';

import { BaseUserVo } from '../../user/vo/base-user.vo';

export class BaseValuationVo extends CommonVo {
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
   * 类型: (1: 快速估值、2: 精准定价)
   */
  type: string;

  /**
   * 类型: (1: 买车、2: 卖车)
   */
  intentionType: string;

  /**
   * 车辆名称
   */
  vehicleName: string;

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
   * 车型名称
   */
  modelName: string;

  /**
   * 年款
   */
  modelYear: string;

  /**
   * levelId
   */
  levelId: string;

  /**
   * 销售名称
   */
  selledName: string;

  /**
   * 首次上牌
   */
  firstRegistrationDate: string;

  /**
   * 行驶里程‌
   */
  mileage: string;

  /**
   * 所在省份
   */
  province: string;

  /**
   * 所在城市
   */
  city: string;

  /**
   * 车身颜色
   */
  bodyColor: string;

  /**
   * 过户次数
   */
  transferCount: string;

  /**
   * 营运性质
   */
  operatingNature: string;

  /**
   * 骨架外观
   */
  facade: string;

  /**
   * 车辆内饰
   */
  interior: string;

  /**
   * 工况电器
   */
  condElect: string;

  /**
   * 原厂加装配置总金额
   */
  addAmount: string;

  /**
   * 估值结果
   */
  result: Record<string, any>;

  /**
   * 用户信息
   */
  user: BaseUserVo;
}
