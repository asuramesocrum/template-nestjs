import {Controller} from "@nestjs/common";
import {GrpcMethod} from "@nestjs/microservices";

@Controller()
export class AppController {

    @GrpcMethod()
    findOne(data: HeroById, metadata: Metadata, call: ServerUnaryCall<any, any>): Hero {
        const items = [
            { id: 1, name: 'John' },
            { id: 2, name: 'Doe' },
        ];
        return items.find(({ id }) => id === data.id);
    }
}