import {  Injectable } from "@nestjs/common";
import { EmployeesDto } from "./dtos/employee.dto";
import { writeFile, readFile, readFileSync } from "fs";
import { v4 as uuid } from "uuid";
import { json2csv } from "json-2-csv";

@Injectable()
export class AppService {

  getEmployees(): string {
    return JSON.stringify(
      this.csvJSON(readFileSync("employee-database.csv", "utf8"))
    );
  }

  createEmployee(employeeDto: EmployeesDto): void {
    this.saveToFile(employeeDto);
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
