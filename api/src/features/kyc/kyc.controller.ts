import { Controller, Get } from '@nestjs/common';

@Controller()
export class KycController {
  constructor() {}

  @Get('kyc')
  getKyc(): any {
    return {
      kyc: true
    }
  }
}
