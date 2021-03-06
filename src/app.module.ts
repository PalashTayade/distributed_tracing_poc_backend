import { Employees } from './model/employee.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeHydrator } from './hydrators/employee.hydrator';

@Module({
  imports: [
  //  TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  //  TypeOrmModule.forFeature([Employees]),
  ],
  controllers: [AppController],
  providers: [AppService, EmployeeHydrator],
})
export class AppModule {}
