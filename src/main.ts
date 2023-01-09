import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import compression from '@fastify/compress';
import fastifyHelmet from '@fastify/helmet';
import fastifyCsrf from '@fastify/csrf-protection';
import fastifyCookie from '@fastify/cookie';
import { PrismaService } from './prisma.service';

declare const module: any;

const bootstrap = async () => {

  const SERVER_PORT = process.env.SERVER_PORT || 3000
  const SERVER_ADDRESS = process.env.SERVER_ADDRESS || '0.0.0.0'

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.enableCors({
    origin: `*`,
    credentials: true,
    methods: '*',
  });
  await app.register(fastifyCookie, { secret: 'my-secret' });
  await app.register(fastifyCsrf, { cookieOpts: { signed: true } });
  await app.register(fastifyHelmet);
  await app.register(compression, {
    encodings: ['gzip', 'deflate'],
  });

  // Global prefix app
  // Default: /api
  await app.setGlobalPrefix('api');

  await app.listen(SERVER_PORT, SERVER_ADDRESS);
  console.debug(
    `Server starting on ${SERVER_ADDRESS}:${SERVER_PORT}/`,
  );

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
};

bootstrap();
