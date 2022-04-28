import { Module } from '@nestjs/common';
import { SharedModule } from '@app/shared';
import { ReaderController } from './reader.controller';

@Module({
  imports: [SharedModule],
  controllers: [ReaderController],
  providers: [],
})
export class ReaderModule {}
