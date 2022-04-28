import { SharedModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { WriterController } from './writer.controller';

@Module({
  imports: [SharedModule],
  controllers: [WriterController],
  providers: [],
})
export class WriterModule {}
