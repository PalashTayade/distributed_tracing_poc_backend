
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import { trace } from "console";
import { Integrations as TracingIntegrations } from "@sentry/tracing";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('POC Distributed Tracing')
    .setDescription('POC Distributed Tracing API')
    .setVersion('1.0')
    .addTag('employee')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document); 

  app.enableCors();
  Sentry.init({
    dsn: "https://d03f716eb8a44365a9e43fea2e044776@o474940.ingest.sentry.io/5579569",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});
  await app.listen(3000);
}

bootstrap();

