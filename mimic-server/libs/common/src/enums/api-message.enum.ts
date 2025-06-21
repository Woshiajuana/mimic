export enum ApiMessage {
  // 成功
  SUCCESS = 'success',

  // 失败
  FAIL = 'fail',

  // 未授权
  UNAUTHORIZED = '未授权',

  // 状态码-禁用
  STATUS_DISABLED = '已禁用',

  // not found
  RESOURCE_NOT_FOUND = '资源不存在',

  // 验证码错误
  CAPTCHA_ERROR = '验证码错误',

  // 应用
  PERMISSION_DENIED = '权限被拒绝',

  // 账号被挤下线
  ACCOUNT_OFFLINE = '您的账号在另一地点登录({date})，已被强迫下线，如果不是本人操作，建议你修改密码',

  // 数据库字段重复
  DUP_ENTRY_ERROR = '{value}已存在',
}
