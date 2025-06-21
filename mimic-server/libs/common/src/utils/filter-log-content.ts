import { cloneSimple, isObject } from '@daysnap/utils';

export const filterLogContent = (data: Record<string, any>) => {
  const target = cloneSimple(data);

  const loop = (data: Record<string, any>) => {
    Object.entries(data).forEach(([key, value]) => {
      if (isObject(value)) {
        loop(value);
      } else if (/data:(.*?);base64,/.test(value)) {
        // 过滤 base64
        data[key] = '[base64 data removed]';
      } else if (['password'].includes(key)) {
        // 过滤敏感字段
        data[key] = '[value data removed]';
      }
    });
  };

  loop(target);

  return JSON.stringify(target);
};
