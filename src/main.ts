import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle("POC Distributed Tracing")
    .setDescription("POC Distributed Tracing API")
    .setVersion("1.0")
    .addTag("employee")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  Sentry.init({
    dsn:
      "https://2db4e1797cbe4bb1b883670fa724791b@o474940.ingest.sentry.io/5580963",

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
  });
  

  await app.listen(3000);
}

bootstrap();
