import { EmployeesDto } from "../dtos/employee.dto";
import { Employees } from "../model/employee.entity";


export class EmployeeHydrator {
    hydrate( employeeDto: EmployeesDto): Employees {
        const entity = new Employees();
        entity.firstName = employeeDto.firstName;
        entity.lastName = employeeDto.lastName;
        entity.email = employeeDto.email;
        entity.isActive = employeeDto.isActive;
        return entity;
      }
}