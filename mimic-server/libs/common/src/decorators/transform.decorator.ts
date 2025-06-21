import { isUndefined } from '@daysnap/utils';
import { Transform } from 'class-transformer';

export function TransformNumber() {
  return Transform((data) =>
    isUndefined(data.value) ? undefined : +data.value,
  );
}
