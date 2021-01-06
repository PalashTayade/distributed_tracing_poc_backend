import { EmployeesDto } from "./dtos/employee.dto";
export declare class AppService {
    getEmployees(): string;
    createEmployee(employeeDto: EmployeesDto): void;
    updateEmployee(employeeDto: EmployeesDto): void;
    getFromFile(): string;
    saveToFile(employeeDto: EmployeesDto): Promise<void>;
    updateFile(employeeDto: EmployeesDto): Promise<void>;
    private csvJSON;
}
