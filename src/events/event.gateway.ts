import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    GatewayMetadata,
    WebSocketServer,
    ConnectedSocket,
    OnGatewayConnection,
    OnGatewayDisconnect
} from '@nestjs/websockets';
import {Observable} from 'rxjs'
import {Socket,Server} from 'socket.io'

const config: GatewayMetadata = {
    cors :{
        origin : 'http://localhost:5176'
    },
    transports : ['websocket'],
}

@WebSocketGateway(config)
export class EventsGateway implements OnGatewayConnection,OnGatewayDisconnect {

    @WebSocketServer() 
    server : Server

    handleConnection(client: Socket, ...args: any[]) {
        // console.log(`Client : ${client.id} Connected`)
        
    }

    handleDisconnect(client: Socket) {
        // console.log(`Client : ${client.id} Disconnected`)
    }

    @SubscribeMessage('events-server')
    test(@MessageBody() data :{greet:string},@ConnectedSocket() client:Socket){
        this.server.emit('events-client',{data,id:client.id})
    }

    // @SubscribeMessage('join')
    // joinMain(@ConnectedSocket() client:Socket){
    //     console.log(`${client.id} join this room`)
    //     client.join("page")
    // }

    // @SubscribeMessage('leave')
    // leaveMain(@ConnectedSocket() client:Socket){
    //     console.log(`${client.id} leave this room`)
    //     client.leave('page')
    // }

}