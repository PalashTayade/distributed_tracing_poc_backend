import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { EmployeesDto } from "./dtos/employee.dto";
import { writeFile, readFile, readFileSync } from "fs";
import { v4 as uuid } from "uuid";
import { json2csv } from "json-2-csv";
import * as Sentry from "@sentry/node";

@Injectable()
export class AppService {
  getEmployees(): string {
    return this.getFromFile();
  }

  createEmployee(employeeDto: EmployeesDto): void {
     this.saveToFile(employeeDto);
  }
  updateEmployee(employeeDto: EmployeesDto): void {
    this.updateFile(employeeDto);
  }
  validateEmployee(employeeDto: EmployeesDto): boolean {
    try {
      if (employeeDto.id == "") {
        return false;
      }
    } catch (error) {
      Sentry.captureException(error);
    }
    return true;
  }

  getFromFile(): string {
    let employeesData = this.csvJSON(
      readFileSync("employee-database.csv", "utf8")
    );

    let activeEmployee = employeesData.filter(function (obj) {
      return obj.isActive !== "false";
    });
    return JSON.stringify(activeEmployee);
  }

  saveToFile(employeeDto: EmployeesDto) {
    //read file
    let employeesData = this.csvJSON(
      readFileSync("employee-database.csv", "utf8")
    );

    if (employeeDto.email === "") {
      throw new HttpException('Bad request - Email Id not provided', HttpStatus.BAD_REQUEST);
    }

    //assign a uuid before saving the employee
    employeeDto.id = uuid();
    employeeDto.isActive = true;
    employeesData.push(employeeDto);

    // append records to file
    json2csv(employeesData, function (err, csv) {
      if (err) console.log(err);
      writeFile("employee-database.csv", csv, function (err) {
        if (err) throw err;
      });
    });
  }

   updateFile(employeeDto: EmployeesDto) {
    //read file
    let employeesData = this.csvJSON(
      readFileSync("employee-database.csv", "utf8")
    );
    let objIndex = employeesData.findIndex(
      (obj) => obj.id === employeeDto.id
    );

    if (objIndex == -1) {
      throw new HttpException('Bad request - Employeee not found', HttpStatus.BAD_REQUEST);
    }
    employeesData[objIndex].firstName = employeeDto.firstName;
    employeesData[objIndex].lastName = employeeDto.lastName;
    employeesData[objIndex].isActive = employeeDto.isActive;

    // write records to file
    json2csv(employeesData, function (err, csv) {
      if (err) console.log(err);
      writeFile("employee-database.csv", csv, function (err) {
        if (err) throw err;
      });
    });
  }

  private csvJSON(csv: string) {
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
}
