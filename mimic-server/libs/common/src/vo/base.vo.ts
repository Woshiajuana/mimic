import { pick } from '@daysnap/utils';

export class BaseVo {
  // 简单分派
  assign(partial: Partial<BaseVo>) {
    if (partial) {
      Object.assign(this, pick(partial, Object.keys(this) as any));
    }
  }

  // 合并
  merge(
    partial?: any,
    transform?: (source: Record<string, any>) => Record<string, any>,
  ) {
    if (!partial) {
      return;
    }
    Object.assign(this, pick(partial, Object.keys(this)), transform?.(partial));
  }
}
