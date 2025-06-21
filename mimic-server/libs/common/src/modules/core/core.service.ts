import { CommonException } from '@app/common/exceptions';
import { formatPathParams, isObject } from '@daysnap/utils';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom, map } from 'rxjs';

import { filterLogContent } from '../../utils';

@Injectable()
export class CoreService {
  constructor(
    private readonly logger: Logger,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * 核心服务请求分装
   */
  async request<T = any>(
    url: string,
    data: any = {},
    options: Omit<AxiosRequestConfig, 'params' | 'data' | 'url'> = {},
  ): Promise<T> {
    const config = this.configService.get('core-service');
    const { method, headers, ...rest } = Object.assign(
      {
        headers: {},
        method: 'get',
      },
      config,
      options,
    );

    // 转换 url path params
    if (!(data instanceof FormData) && isObject(data)) {
      ({ path: url, rest: data } = formatPathParams(url, data));
    }

    this.logger.log(
      `核心服务：${url} [${method}] 请求参数 => ${filterLogContent(data)}`,
    );

    const resp = await lastValueFrom<{ code: number; msg: string } & T>(
      this.httpService
        .request({
          ...rest,
          url,
          method,
          headers,
          [method.toLocaleLowerCase() === 'get' ? 'params' : 'data']: data,
        })
        .pipe(map((res) => res.data)),
    );

    this.logger.log(
      `核心服务：${url} [${method}] 请求返回 => ${filterLogContent(resp)}`,
    );

    const { code, msg, ...respData } = resp;
    if (code !== 200) {
      throw new CommonException(msg);
    }

    return respData as T;
  }
}
