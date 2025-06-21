import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('ok')
  health() {
    return `I'm OK`;
  }
}
