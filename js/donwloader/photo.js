module.exports = {
    downloadPhoto: function(msg) {
        //https://stackoverflow.com/questions/35991698/telegram-bot-receive-photo-url
        console.log('function downloadPhoto START')

        var file_id  = (msg.photo[msg.photo.length-1].file_id);




        var downloadDir = './images';
        let something = ''
        var https = require('https')
        var fs = require('fs');
        bot.getFileLink(file_id).then( async (fileUri) => {
            var base64Img = require('base64-img');

            let time = process.hrtime();
            let extension = fileUri.split('.').pop();
            let newName = `${time[0]}${time[1]}.${extension}`;
            let file = fs.createWriteStream(`${downloadDir}/${newName}`);
            let request = await https.get(fileUri, (response) => {
                response.pipe(file);

                });
            file.on('finish', () =>{
                console.log('msg.text ="/images/"+newName')

                //createAndUploadFileToGoogleSharedFolder()
            })
        });

    },


}