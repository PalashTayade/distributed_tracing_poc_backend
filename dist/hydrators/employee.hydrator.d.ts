import { EmployeesDto } from "../dtos/employee.dto";
import { Employees } from "../model/employee.entity";
export declare class EmployeeHydrator {
    hydrate(employeeDto: EmployeesDto): Employees;
}
