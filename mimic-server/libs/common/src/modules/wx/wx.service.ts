import { base64ToBlob } from '@daysnap/utils';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { Cache } from 'cache-manager';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class WxService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 微信小程序相关配置
   *
   * @returns
   */
  getConfig() {
    return this.configService.get<{
      appid: string;
      secret: string;
    }>('wx');
  }

  /**
   * 请求微信服务端封装
   *
   * @param config
   */
  async request<T = any>(
    config: AxiosRequestConfig,
  ): Promise<
    T & {
      errcode: number;
      errmsg: string;
    }
  > {
    // eslint-disable-next-line prefer-const
    let { url, ...options } = Object.assign(
      {
        baseURL: 'https://api.weixin.qq.com/',
      },
      config,
    );

    if (url.includes('ACCESS_TOKEN')) {
      const accessToken = await this.getAccessToken();
      url = url.replace('ACCESS_TOKEN', accessToken);
    }

    const res = await lastValueFrom<
      T & {
        errcode: number;
        errmsg: string;
      }
    >(
      this.httpService
        .request({
          ...options,
          url,
        } as any)
        .pipe(map((response) => response.data)),
    );

    // access_token 过期
    if (res.errcode === 40001) {
      await this.cacheManager.del('wechat:access_token');

      return this.request<T>(config);
    }

    return res;
  }

  /**
   * 获取与小程序全局唯一后台接口调用凭据
   * https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/mp-access-token/getAccessToken.html
   *
   * @returns
   */
  async getAccessToken() {
    const key = 'wechat:access_token';
    // 从缓存中获取 access_token
    const token = await this.cacheManager.get<string>(key);
    if (token) {
      return token;
    }

    const { appid, secret } = this.getConfig();
    const params = {
      grant_type: 'client_credential',
      appid,
      secret,
    };
    const { errcode, errmsg, access_token, expires_in } = await this.request<{
      access_token: string;
      expires_in: number;
    }>({
      url: 'cgi-bin/token',
      method: 'GET',
      params,
    });

    if (!!errcode) {
      throw new BadRequestException({
        errcode,
        errmsg,
      });
    }

    // 存储 access_token
    // expires_in 单位是秒 需要转成毫秒
    // 防止过期两边对不上 过期时间减去 60s
    this.cacheManager.set(key, access_token, (expires_in - 60) * 1000);

    return access_token;
  }

  /**
   * 用户登录
   * https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-login/code2Session.html
   *
   * @param code wx.login 获取到的 code
   * @returns
   */
  async code2Session(code: string) {
    const { appid, secret } = this.getConfig();
    const params = {
      js_code: code,
      appid,
      secret,
      grant_type: 'authorization_code',
    };

    // 获取 openid
    const { errcode, errmsg, openid, unionid } = await this.request<{
      openid: string;
      session_key: string;
      unionid: string;
    }>({
      url: 'sns/jscode2session',
      method: 'GET',
      params,
    });

    if (!!errcode) {
      throw new BadRequestException({
        errcode,
        errmsg,
      });
    }

    return { openid, unionid };
  }

  /**
   * 校验一张图片是否含有违法违规内容
   * https://developers.weixin.qq.com/miniprogram/dev/framework/security.imgSecCheck.html
   *
   * @param base64 文件内容
   * @returns
   */
  async imgSecCheck(base64: string) {
    const data = new FormData();
    data.append('media', base64ToBlob(base64));

    const { errcode, errmsg } = await this.request({
      url: 'wxa/img_sec_check?access_token=ACCESS_TOKEN',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    });

    if (errcode === 87014) {
      return false;
    }

    if (!!errcode) {
      throw new BadRequestException({
        errcode,
        errmsg,
      });
    }

    return true;
  }

  /**
   * 用于检查一段文本是否含有违法违规内容。
   * 需检测的文本内容，文本字数的上限为 2500 字，需使用 UTF-8 编码
   * scene 1 资料；2 评论；3 论坛；4 社交日志
   * https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/sec-center/sec-check/msgSecCheck.html
   *
   * @param options
   */
  async msgSecCheck(options: {
    content: string;
    openid: string;
    scene: 1 | 2 | 3 | 4;
  }) {
    const { errcode, errmsg, result } = await this.request<{
      result: { suggest: 'risky' | 'pass' | 'review'; label: number };
    }>({
      url: 'wxa/msg_sec_check?access_token=ACCESS_TOKEN',
      method: 'POST',
      data: {
        ...options,
        version: 2,
      },
    });

    if (!!errcode) {
      throw new BadRequestException({
        errcode,
        errmsg,
      });
    }

    return result.suggest !== 'risky';
  }

  /**
   * 获取手机号
   * https://developers.weixin.qq.com/miniprogram/dev/OpenApiDoc/user-info/phone-number/getPhoneNumber.html
   */
  async getPhoneNumber(options: { code: string; openid: string }) {
    const { errcode, errmsg, phone_info } = await this.request<{
      phone_info: { phoneNumber: string };
    }>({
      url: `https://api.weixin.qq.com/wxa/business/getuserphonenumber?access_token=ACCESS_TOKEN`,
      method: 'POST',
      data: options,
    });

    if (!!errcode) {
      throw new BadRequestException({
        errcode,
        errmsg,
      });
    }

    return phone_info;
  }
}
