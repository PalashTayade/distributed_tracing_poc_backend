"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const fs_1 = require("fs");
const uuid_1 = require("uuid");
const json_2_csv_1 = require("json-2-csv");
let AppService = class AppService {
    getEmployees() {
        return this.getFromFile();
    }
    createEmployee(employeeDto) {
        this.saveToFile(employeeDto);
    }
    updateEmployee(employeeDto) {
        this.updateFile(employeeDto);
    }
    getFromFile() {
        let employeesData = this.csvJSON(fs_1.readFileSync("employee-database.csv", "utf8"));
        let activeEmployee = employeesData.filter(function (obj) {
            return obj.isActive !== 'false';
        });
        return JSON.stringify(activeEmployee);
    }
    async saveToFile(employeeDto) {
        let employeesData = this.csvJSON(fs_1.readFileSync("employee-database.csv", "utf8"));
        employeeDto.id = uuid_1.v4();
        employeeDto.isActive = true;
        employeesData.push(employeeDto);
        json_2_csv_1.json2csv(employeesData, function (err, csv) {
            if (err)
                console.log(err);
            fs_1.writeFile("employee-database.csv", csv, function (err) {
                if (err)
                    throw err;
            });
        });
    }
    async updateFile(employeeDto) {
        let employeesData = this.csvJSON(fs_1.readFileSync("employee-database.csv", "utf8"));
        let objIndex = employeesData.findIndex((obj) => obj.email === employeeDto.email);
        employeesData[objIndex].firstName = employeeDto.firstName;
        employeesData[objIndex].lastName = employeeDto.lastName;
        employeesData[objIndex].isActive = employeeDto.isActive;
        json_2_csv_1.json2csv(employeesData, function (err, csv) {
            if (err)
                console.log(err);
            fs_1.writeFile("employee-database.csv", csv, function (err) {
                if (err)
                    throw err;
            });
        });
    }
    csvJSON(csv) {
        var lines = csv.split("\n");
        var result = [];
        var headers = lines[0].split(",");
        for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(",");
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
        return result;
    }
};
AppService = __decorate([
    common_1.Injectable()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map