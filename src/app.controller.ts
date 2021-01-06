import { Employees } from 'src/model/employee.entity';
import { EmployeesDto } from './dtos/employee.dto';
import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getEmployees(): Promise<string> {
    return this.appService.getEmployees();
  }

  @Post()
  createEmployess(@Body() employee: EmployeesDto): void {
    this.appService.createEmployee(employee);
  }
  @Put()
  updateEmployee(@Body() employee: EmployeesDto): void {
  this.appService.updateEmployee(employee);
  }
}
