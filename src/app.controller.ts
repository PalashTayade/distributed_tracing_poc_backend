import { EmployeesDto } from "./dtos/employee.dto";
import { Body, Controller, Get, Headers, Post, Put } from "@nestjs/common";
import { AppService } from "./app.service";
import * as Sentry from "@sentry/node";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getEmployees(
    @Headers("sentry-trace") traceId: string
  ): Promise<string> {
    let result = "";
    const transaction = Sentry.startTransaction({
      op: "BE - Transaction : Get employees",
      name: "BE - Transaction : Inside GET controller",
      traceId: traceId,
    });

    const span1 = transaction.startChild({
      op: "BE - Span : Span 1",
      description: `span inside GET controller - span1`,
    });
    span1.finish();

    const span2 = transaction.startChild({
      op: "BE - Span : Span 2",
      description: `span inside GET controller - span2`,
    });
    span2.finish();
    result = this.appService.getEmployees();
    transaction.finish();
    return result;
  }

  @Post()
  createEmployess(
    @Headers("sentry-trace") traceId: string,
    @Body() employee: EmployeesDto
  ): void {
    const transaction = Sentry.startTransaction({
      op: "BE - Transaction : Create employees",
      name: "BE - Transaction : Inside POST controller",
      traceId: traceId,
    });

    try {
      const span1 = transaction.startChild({
        op: "BE - Span : Span 1",
        description: `span inside POST controller - creating employee`,
      });
      this.appService.createEmployee(employee);
      span1.finish();
    } finally {
      transaction.finish();
    }
  }
  
  @Put()
  updateEmployee(
    @Headers("sentry-trace") traceId: string,
    @Body() employee: EmployeesDto
  ): void {
    const transaction = Sentry.startTransaction({
      op: "BE - Transaction : Update employees",
      name: "BE - Transaction : Inside PUT controller",
      traceId: traceId,
    });

    const span1 = transaction.startChild({
      op: "BE - Span : Span 1",
      description: `span inside PUT controller - validating employee update request`,
    });
    try {
      let isValidRequest = this.appService.validateEmployee(employee);
      span1.finish();

      if (isValidRequest) {
        const span2 = transaction.startChild({
          op: "BE - Span : Span 1",
          description: `span inside PUT controller - updating employee`,
        });
        this.appService.updateEmployee(employee);
        span2.finish();
      }
    } finally {
      transaction.finish();
    }
  }
}
