const fs = require('fs');
const wa = require('@open-wa/wa-automate');

wa.create().then(client => start(client));

function start(client) {
  
  client.onMessage(async message => {


    if (String(message.body).slice(0, 3) === '\`\`\`' && message.isGroupMsg === true) {
      
      const filesList = fs.readdirSync("./");
      for (const file in filesList) {
        if (filesList[file] === 'carbon.png') {
            fs.unlink('carbon.png', function (err) {
                if (err) throw err;
                console.log('Deleted')
            })
        }
      }
      await client
      .sendText(message.from, `Um segundo, dev. 🔥\nCriarei a imagem. 🥶`)
      
      // Taking only the messages that have the 3 messages with ~~~ at the beginning that were sent in the group

      // client.reply(
      //   // sending first reply
      //   message.from,
      //   'Um segundo, dev! 🔥\nÉ pra já, chefia. Criarei a imagem. 🥶',
      //   message.id.toString()
      // );


      
      fs.writeFile("code.txt", String(message.body).substring(3), function(err) {
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
          './carbon.png',
          'image-name',
          'messageToCarbon by github.com/CleoMenezes'
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

