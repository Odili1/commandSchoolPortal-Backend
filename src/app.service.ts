import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(): Promise<any> {
    console.log('started');
    
    return {
      data: 'Hello Command School!'
    }
  }
}
