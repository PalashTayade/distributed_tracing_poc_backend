"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeHydrator = void 0;
const employee_entity_1 = require("../model/employee.entity");
class EmployeeHydrator {
    hydrate(employeeDto) {
        const entity = new employee_entity_1.Employees();
        entity.firstName = employeeDto.firstName;
        entity.lastName = employeeDto.lastName;
        entity.email = employeeDto.email;
        entity.isActive = employeeDto.isActive;
        return entity;
    }
}
exports.EmployeeHydrator = EmployeeHydrator;
//# sourceMappingURL=employee.hydrator.js.map