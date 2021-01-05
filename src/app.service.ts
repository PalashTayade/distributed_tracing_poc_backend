import { Employees } from './model/employee.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EmployeeHydrator } from './hydrators/employee.hydrator';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeesDto } from './dtos/employee.dto';

@Injectable()
export class AppService {
  constructor(
   // private readonly hydrator: EmployeeHydrator,

  //  @InjectRepository(Employees)
  //  private readonly repository: Repository<Employees>,
  ) {}

  async getEmployees(): Promise<Employees[]> {
    /* const query = this.repository
      .createQueryBuilder('employees')
      .where('isactive = true');
    const result = await query.getMany();
    return result; */
    return null;
  }

  async createEmployee(employeeDto: EmployeesDto): Promise<Employees> {
    const dbEntity = await this.saveToDb(employeeDto);
    return dbEntity;
  }

  async updateEmployee(employeeDto: EmployeesDto): Promise<void> {
    // const query = this.repository
    //   .createQueryBuilder('employees')
    //   .update(Employees)
    //   .set({
    //     firstName: employeeDto.firstName,
    //     lastName: employeeDto.lastName,
    //     isActive: employeeDto.isActive,
    //   })
    //   .where('email = :email', {
    //     email: employeeDto.email,
    //   })
    //   .execute();
  }

  async saveToDb(employeeDto: EmployeesDto) {
  //   const entityToDb = this.hydrator.hydrate(employeeDto);
  //   try {
  //     const data = await this.repository.save(entityToDb);
  //     console.log(`Successfully saved record to db`);
  //     return data;
  //   } catch (err) {
  //     console.log(`Failed to save record to db`);
  //     console.error(err);
  //     throw err;
  //   }
  return null;
   }
}
