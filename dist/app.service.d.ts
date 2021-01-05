import { Employees } from './model/employee.entity';
import { EmployeesDto } from './dtos/employee.dto';
export declare class AppService {
    constructor();
    getEmployees(): Promise<Employees[]>;
    createEmployee(employeeDto: EmployeesDto): Promise<Employees>;
    updateEmployee(employeeDto: EmployeesDto): Promise<void>;
    saveToDb(employeeDto: EmployeesDto): Promise<any>;
}
