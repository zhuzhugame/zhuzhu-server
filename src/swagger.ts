import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function loadSwagger(app: any) {
  const options = new DocumentBuilder()
    .setTitle('API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);
}
