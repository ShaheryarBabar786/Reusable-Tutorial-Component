import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TutorialController } from './tutorial/tutorial.controller';

@Module({
  imports: [],
  controllers: [AppController, TutorialController],
  providers: [AppService],
})
export class AppModule {}
