import { ApiCode } from '../enums';
import { ApiMessage } from '../enums/api-message.enum';
import { CommonException, ExceptionResponse } from './common.exception';

export class UnauthorizedException extends CommonException {
  constructor(response?: ExceptionResponse) {
    super(
      CommonException.createResponse(response, {
        code: ApiCode.UNAUTHORIZED,
        message: ApiMessage.UNAUTHORIZED,
      }),
    );
  }
}
