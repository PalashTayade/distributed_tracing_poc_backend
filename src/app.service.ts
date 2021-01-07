import { Injectable } from "@nestjs/common";
import { EmployeesDto } from "./dtos/employee.dto";
import { writeFile, readFile, readFileSync } from "fs";
import { v4 as uuid } from "uuid";
import { json2csv } from "json-2-csv";
import * as Sentry from "@sentry/node";
import { exception } from "console";


@Injectable()
export class AppService {
  getEmployees(): string {
    let result = ""
    const transaction = Sentry.startTransaction({
      op: "test",
      name: "My third Test Transaction",
    });
  
    setTimeout(() => {
      try {
        result = this.getFromFile();
      } catch (e) {
        Sentry.captureException(e);
      } finally {
        transaction.finish();
      }
    }, 99);

    return result;
  }

  createEmployee(employeeDto: EmployeesDto): void {
    this.saveToFile(employeeDto);
  }
  updateEmployee(employeeDto: EmployeesDto): void {
    this.updateFile(employeeDto);
  }

  getFromFile(): string {
    let employeesData = this.csvJSON(
      readFileSync("employee-database.csv", "utf8")
    );

    let activeEmployee = employeesData.filter(function (obj) {
      return obj.isActive !== 'false' ;
    });
    return JSON.stringify(activeEmployee);
  }

  async saveToFile(employeeDto: EmployeesDto) {
    //read file
    let employeesData = this.csvJSON(
      readFileSync("employee-database.csv", "utf8")
    );

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

  async updateFile(employeeDto: EmployeesDto) {
    //read file
    let employeesData = this.csvJSON(
      readFileSync("employee-database.csv", "utf8")
    );
    let objIndex = employeesData.findIndex(
      (obj) => obj.email === employeeDto.email
    );

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
