var fs = require('fs');
const venom = require('venom-bot');
let {PythonShell} = require('python-shell')

venom
  .create()
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    if (String(message.body).slice(0, 3) === '\`\`\`' && message.isGroupMsg === true) {
        var messageConvert = {
            msg: message.body
        }
        fs.writeFile("code.txt", String(message.body), function(err) {
            if (err) {
                console.log(err);
            }
        });
        
 
      PythonShell.run('main.py', null, function (err) {
        if (err) throw err; 
        console.log('finished');
        client
        .sendImage(
          message.from,
          '/home/cleomenezesjr/Documentos/CODE/botWhatsApp/carbon.png',
          'image-name',
          'Menezes messageToCarbon'
        )
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
      });

    }
  });
}
