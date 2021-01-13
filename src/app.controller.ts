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

    Sentry.configureScope((scope) => {
      scope.setTag("trace_id", traceId);
    });

    const transaction = Sentry.startTransaction({
      op: "Controller.Service.Method.GetEmployees",
      name: "BE - Transaction : Controller.Service.Method.GetEmployees",
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
  ) {
    Sentry.configureScope((scope) => {
      scope.setTag("trace_id", traceId);
    });

    const transaction = Sentry.startTransaction({
      op: "Controller.Service.Method.CreateEmployees",
      name: "BE - Transaction : Controller.Service.Method.CreateEmployees",
      traceId: traceId,
    });
    try {
      const span1 = transaction.startChild({
        op: "Controller.Service.Method.CreateEmployees",
        description: `BE - Span: Controller.Service.Method.CreateEmployees`,
      });
      this.appService.createEmployee(employee);
      span1.finish();
    } catch (errors) {
      Sentry.captureException(errors);
      throw errors;
    } finally {
      transaction.finish();
    }
  }

  @Put()
  updateEmployee(
    @Headers("sentry-trace") traceId: string,
    @Body() employee: EmployeesDto
  ): void {
    Sentry.configureScope((scope) => {
      scope.setTag("trace_id", traceId);
    });

    const transaction = Sentry.startTransaction({
      op: "BE - Transaction : Controller.Service.Method.UpdateEmployee",
      name: "BE - Transaction : Controller.Service.Method.UpdateEmployee",
      traceId: traceId,
    });
    const span1 = transaction.startChild({
      op: "BE - Span : Controller.Service.Method.ValidateEmployee",
      description: `BE - Span : Controller.Service.Method.ValidateEmployee`,
    });
    try {
      let isValidRequest = this.appService.validateEmployee(employee);
      span1.finish();

      if (isValidRequest) {
        const span2 = transaction.startChild({
          op: "BE - Span : Controller.Service.Method.UpdateEmployee",
          description: `BE - Span : Controller.Service.Method.UpdateEmployee`,
        });
        this.appService.updateEmployee(employee);
        span2.finish();
      }
    } finally {
      transaction.finish();
    }
  }
}
