import { Module } from '@nestjs/common';
import { ResourceModule } from './resources/resources.module';

@Module({
  imports: [ResourceModule],
})
export class AppModule {}
