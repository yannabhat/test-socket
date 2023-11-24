import {Module,ModuleMetadata} from '@nestjs/common';
import { EventsGateway } from './event.gateway';

const config : ModuleMetadata = {
    providers :[EventsGateway],
}

@Module(config)


export class EventsModule {}