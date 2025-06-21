export enum ApiCode {
  // 成功
  SUCCESS = 'S0000',

  // 失败
  FAIL = 'F9999',

  // 未授权
  UNAUTHORIZED = 'F4001',

  // token 被挤下线
  ACCOUNT_OFFLINE = 'F4101',

  // 资源没找到
  RESOURCE_NOT_FOUND = 'F4004',

  // 状态码-禁用
  STATUS_DISABLED = 'F6003',
}
