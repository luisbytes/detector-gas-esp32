import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
  ) { }

  @Get('/start/:value')
  async startDrain(
    @Param('value') value: number
  ): Promise<void> {
    return await this.appService.startDrain(value);
  }

  @Get('/end/:value/:time')
  async endDrain(
    @Param('value') value: number,
    @Param('time') time: number,
  ): Promise<void> {
    return await this.appService.endDrain(value, time);
  }
}
