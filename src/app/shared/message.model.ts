export class Message{
    constructor(
        public messageId: string, 
        public sequence:number, 
        public chatId:string, 
        public chatName:string, 
        public userId:string,
        public username:string,
        public message:string
    ){}
}