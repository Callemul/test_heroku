

module.exports = function( global_vars ) {

   return{ onPrivateMess: function(
        bot, 
        msg, 
        text, 
        chatId
        ){
            
            console.log('from private')
            console.log('******************************')
            console.log(msg)
            console.log('******************************')

            if (text === '/start') {
                console.log('/start')
                console.log('/start')
                console.log('/start')
                console.log('/start')
                console.log('/start')
                console.log('/start')
                console.log('/start')
                console.log('/start')
                console.log('/start')
                
                console.log('date mess: '+ new Date(msg.date).toISOString())
                
                //clear vars for new game
                global_vars.last_callback_pressed_button='';
                global_vars.last_inputed_text_from_user='';
                
                //clear vars for new game
                global_vars.data_user_quiz = {
                    "1. conference": "",
                    "2. town": "",
                    "3. date": "",
                    "4. description": "",
                    "5. phone": "",
                    "6. bystander": "",
                    "7. load files": "",
                    "chatId": "",
                    "download_dir": ""
                }

//                await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/f7c/cd4/f7ccd406-4a2d-363e-a098-0ff36e2d534b/4.webp')
                console.log('data_user_quiz: ', global_vars.data_user_quiz)

                // bot.send
                const chatId = msg.chat.id;
                var scenario_module = require('../scenario/quiz') ( global_vars )

                console.log('from onPrivateMess.js /start state')
                return scenario_module.main_switch(
                    bot,
                    msg,
                    'hello',
                    chatId
                    );

                
            }

            //bot got a PHOTO!!!!!
            if(msg.hasOwnProperty('photo')){
                var downloadDir = global_vars.data_user_quiz.download_dir;
                var photoId = msg.photo[msg.photo.length-1].file_id;
                var path = bot.downloadFile(photoId, downloadDir).then(function (path) {
                    console.log(path);
                });
                return;

                // const photo_module = require('../downloader/photo') ( global_vars )
                
                // //downloadPhoto(msg)
                // return photo_module.downloadPhoto(bot, msg);

            }

            //is got audio (MP3)
            if(msg.hasOwnProperty('audio')){
                
            }

            //is got video (MP4)
            if(msg.hasOwnProperty('video')){
                var downloadDir = global_vars.data_user_quiz.download_dir;
                var videoId = msg.video.file_id;
                var path = bot.downloadFile(videoId, downloadDir).then(function (path) {
                    console.log(path);
                });
                return;
               
            }

            // var iftext_is_answer = store_answers_module.checkByCallback(
            //     callback_query_button_consts,
            //     last_callback_pressed_button
            // )

            // if(iftext_is_answer){
            //     return
            // }

            console.log('last_callback_pressed_buttonWWW: ', global_vars.last_callback_pressed_button)
            if(global_vars.last_callback_pressed_button != ''){
                //save last message (when quiz_mode turned on)
                global_vars.last_inputed_text_from_user = text;

                const chatId = msg.chat.id;
                
                var scenario_module = require('../scenario/quiz') ( global_vars )
                
                console.log('from onPrivateMess.js else state')
                scenario_module.main_switch(
                    bot,
                    msg,
                    global_vars.last_callback_pressed_button+'_answered',
                    chatId
                    );

                // global_vars.last_callback_pressed_button = '';

                return;
            }

            //other
            return bot.sendMessage(chatId, "Я тебе не зрозумів. Запусти команду якусь, наприклад /start (для цього пропиши той текст в чаті мені, або натисни на неї, синій фон і слідуй інструкціям)")

    },

}
}