import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();
  });

  describe('getHello', () => {
    // it('should return hello message', () => {
    //   const appController = app.get<AppController>(AppController);
    //   expect(appController.getHello()).toBe('Hello from NestJS!');
    // });
  });
});
