import { Message } from "./message.model";

export class Chat{
    constructor(
        public chatName: string, 
        public id: string,
        public messages: Message[]
    ){}
}