import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { MessagesService } from "src/messages/messages.service";

@WebSocketGateway(8001,{cors:'*'})
export class SocketGateway{
    constructor(private readonly messagesService: MessagesService) {}
@WebSocketServer()
server;
@SubscribeMessage('message')
async handleMessage(@MessageBody() message:any){
    // console.log(message);
    const currentDate = new Date(); // Get the current date
    const day = currentDate.getDate().toString().padStart(2, '0'); // Get the day and pad with leading zero if necessary
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Get the month (adding 1 because months are zero-based) and pad with leading zero if necessary
    const year = currentDate.getFullYear().toString(); // Get the year
    const hours = currentDate.getHours().toString().padStart(2, '0'); // Get the hours and pad with leading zero if necessary
    const minutes = currentDate.getMinutes().toString().padStart(2, '0'); // Get the minutes and pad with leading zero if necessary
    
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`; // Concatenate the date components in the desired format
    console.log(formattedDate);
   
    
    const body ={
        content:message.content,
        user:message.userId,
        createdAt:formattedDate
    }
    console.log(message);
    
    this.server.emit('message',message)
     await this.messagesService.create(body);
}

}