import { Employees } from 'src/model/employee.entity';
import { EmployeesDto } from './dtos/employee.dto';
import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getEmployees(): Promise<string> {
    const employees =  await this.appService.getEmployees();
    console.log(employees)
    const result = JSON.stringify(employees);
    return result;
  }
  @Post()
  createEmployess(@Body() employee: EmployeesDto): Promise<Employees> {
    return this.appService.createEmployee(employee);
  }
  @Put()
  updateEmployee(@Body() employee: EmployeesDto): Promise<void> {
    return this.appService.updateEmployee(employee);
  }
}
