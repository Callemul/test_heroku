const fs = require('fs');

module.exports = function( global_vars ) {
    return {
    downloadPhoto: function(
        bot, 
        msg) {
        //https://stackoverflow.com/questions/35991698/telegram-bot-receive-photo-url
        console.log('function downloadPhoto START')

        var file_id  = (msg.photo[msg.photo.length-1].file_id);
        const chatId = msg.chat.id;


        var downloadDir = global_vars.data_user_quiz.download_dir;


        if (!fs.existsSync(downloadDir)){
            fs.mkdirSync(downloadDir, { recursive: true });
        }


        let something = ''
        var https = require('https')
        
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
                console.log(`msg.text ="/${downloadDir}/"+newName`)
                bot.sendMessage(chatId, "Фото завантажено")
                //createAndUploadFileToGoogleSharedFolder()
            })
        });

    },

    generatePathForFile: function(){

    },


}
}