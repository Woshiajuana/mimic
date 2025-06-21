import { Injectable } from '@nestjs/common';
import CryptoJS from 'crypto-js';
import { customAlphabet, nanoid } from 'nanoid';

@Injectable()
export class HelperService {
  /**
   * 生成一个uuid
   */
  getUUID() {
    return nanoid();
  }

  /**
   * 生成一个随机数
   */
  getRandom(
    length: number,
    alphabet = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM',
  ) {
    return customAlphabet(alphabet, length)();
  }

  /**
   * 生成一个数字随机数
   */
  getRandomNumber(length: number) {
    return this.getRandom(length, '1234567890');
  }

  /**
   * md5加密
   */
  md5(message: string) {
    return CryptoJS.MD5(message).toString();
  }

  /**
   * AES加密
   */
  aesEncrypt(message: string, secret: string): string {
    return CryptoJS.AES.encrypt(message, secret).toString();
  }

  /**
   * AES解密
   */
  aesDecrypt(encrypted: string, secret: string): string {
    return CryptoJS.AES.decrypt(encrypted, secret).toString(CryptoJS.enc.Utf8);
  }
}
