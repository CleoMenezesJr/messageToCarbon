import Carbon from './tasks/Carbon'
import MakeFile from './tasks/MakeFile'

const wa = require('@open-wa/wa-automate');
var cron = require('node-cron');

import uuid4 from "uuid4";
import fs from 'fs'


class Bot {
    constructor() {
        this.client = undefined;
    }

    setup(client) {
        this.client = client;
        console.log('Bot inicializado com sucesso!');


        let waitingFile = "?"
        let usercellphone = ""

        cron.schedule('*/10 * * * * *', async () => {
            if (waitingFile != '?') {
                if (usercellphone) {
                    console.log('[CRON] Task HASH:' + waitingFile)
                    try {
                        await fs.promises.access(`${__dirname}/tasks/${waitingFile}.png`)
                        client.sendImage(usercellphone, `${__dirname}/tasks/${waitingFile}.png`)
                        await fs.promises.unlink(`${__dirname}/tasks/${waitingFile}.png`)
                        usercellphone = ""
                        waitingFile = "?"                 
                    } catch (err) {
                        //console.log(err)
                    }
                }
            }
        });


        client.onMessage(async message => {

            let Message = message.body;

            if (Message.substr(0, 3) === '\`\`\`') {
                Message = Message.substr(3, Message.length);

                waitingFile = uuid4();
                usercellphone = message.from;

                client.sendText(usercellphone, "Um momento vou gerar sua imagem 😬")

                //TASKS
                await MakeFile(Message);
                await Carbon.generateImage(Message, waitingFile)

            }

        })

    }

    start() {
        wa.create().then(client => this.setup(client));
    }
}

export default new Bot();