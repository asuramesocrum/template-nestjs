import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {MicroserviceOptions, Transport} from "@nestjs/microservices";
import {join} from "node:path";

declare const module: any;

const bootstrap = async () => {

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.GRPC,
        options: {
            package: 'namePackage',
            protoPath: join(__dirname, '_proto/main.proto')
        }
    });

    await app.listen();
    console.debug(
        `Server starting on /`,
    );

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }
};

bootstrap();
