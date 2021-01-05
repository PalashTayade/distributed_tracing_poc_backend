import { Employees } from 'src/model/employee.entity';
import { EmployeesDto } from './dtos/employee.dto';
import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getEmployees(): Promise<string>;
    createEmployess(employee: EmployeesDto): Promise<Employees>;
    updateEmployee(employee: EmployeesDto): Promise<void>;
}
