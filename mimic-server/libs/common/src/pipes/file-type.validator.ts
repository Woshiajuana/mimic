import { isArray } from '@daysnap/utils';
import { FileValidator } from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';

interface FileTypeValidatorOptions {
  fileType: (string | RegExp) | (string | RegExp)[];
  errorMessage?: string;
}

export class FileTypeValidator extends FileValidator<
  FileTypeValidatorOptions,
  IFile
> {
  constructor(options: FileTypeValidatorOptions) {
    super(options);
  }

  isValid(file?: IFile): boolean | Promise<boolean> {
    if (!this.validationOptions) {
      return true;
    }
    if (file && file.mimetype) {
      const { fileType } = this.validationOptions;
      const regexp = isArray(fileType) ? fileType.join('|') : fileType;
      return !!file.mimetype.match(regexp);
    }
    return false;
  }
  buildErrorMessage(): string {
    const { fileType, errorMessage } = this.validationOptions;
    return (
      errorMessage ||
      `类型验证失败 (期望类型: ${isArray(fileType) ? fileType.join('|') : fileType})`
    );
  }
}
