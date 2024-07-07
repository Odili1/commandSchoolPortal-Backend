import { Controller, Get, Post, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { Public } from './common/decorators/auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/hey')
  async getHello(): Promise<any> {
    return await this.appService.getHello();
  }

  @Public(true)
  @Post('/logout')
  async logout(@Res({passthrough: true}) res: Response): Promise<any>{
    res.clearCookie('access_token');
    console.log('Logout route:', res.cookie);
    
    return {message: "You've Logged out"};
  }
}
