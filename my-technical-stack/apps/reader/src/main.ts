import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { ReaderModule } from './reader.module';

async function bootstrap() {
  const app = await NestFactory.create(ReaderModule);

  app.enableVersioning({
    defaultVersion: "1.0",
    type: VersioningType.URI,
  });

  const document = new DocumentBuilder()
    .setTitle("Inventory Reader")
    .setDescription("The Inventory API description")
    .setVersion("1.0")
    .build();

  const readerDescriptorDocument = SwaggerModule.createDocument(app, document);
  SwaggerModule.setup("api/inventory", app, readerDescriptorDocument);

  await app.listen(4000);
}
bootstrap();
