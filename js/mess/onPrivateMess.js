

module.exports = function( global_vars_allusers ) {

   return{ onPrivateMess: function(
        bot, 
        msg, 
        text, 
        chatId
        ){
            
            console.log('from private')
            console.log('*************start_log_mess*****************')
            console.log(msg)
            console.log('*************end_mess*****************')

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
                
                const chatId = msg.chat.id;


                // //clear vars for new game
                // global_vars_allusers[chatId].last_callback_pressed_button='';
                // global_vars_allusers[chatId].last_inputed_text_from_user='';
                
                // //clear vars for new game
                // global_vars_allusers[chatId].data_user_quiz = {
                //     "1. conference": "",
                //     "2. town": "",
                //     "3. date": "",
                //     "4. description": "",
                //     "5. phone": "",
                //     "6. bystander": "",
                //     "7. load files": "",
                //     "chatId": "",
                //     "download_dir": ""
                // }
                // global_vars_allusers[chatId] = ''; //clear old data


                /**
                 1 - get userId
                 2 - add user (userId) to store (database)
                 3 - before adding - check if exists (but not do this, because two diffrent churches like juornalist)
                 */
                 var global_vars_template = {
                    last_callback_pressed_button: '',
                    last_inputed_text_from_user: '',
                    data_user_quiz : {
                        "0. denomination": "",
                        "1. conference": "",
                        "2. town": "",
                        "3. date": "",
                        "4. description": "",
                        "5. phone": "",
                        "6. bystander": "",
                        "7. load files": "",
                        "_. upload date-time": "",
                        "chatId": "",
                        "download_dir": ""
                    }
                  };

                 global_vars_allusers[chatId] = global_vars_template;


//                await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/f7c/cd4/f7ccd406-4a2d-363e-a098-0ff36e2d534b/4.webp')

                // bot.send
                var scenario_module = require('../scenario/quiz') ( global_vars_allusers )

                console.log('from onPrivateMess.js /start state')
                return scenario_module.main_switch(
                    bot,
                    msg,
                    'hello',
                    chatId
                    );

                
            }

            if(global_vars_allusers[chatId] == undefined){
                /**
                 this just exit, 
                 when bot reload - can be the bad 
                 */
                 return bot.sendMessage(chatId, "Скоріш за все почніть знову, /start, вибачте будь ласка")
            }

            //bot got a PHOTO!!!!!
            if( msg.hasOwnProperty('photo') ){
                console.log('got photo START')

                var downloadDir = global_vars_allusers[chatId].data_user_quiz.download_dir;
                var photoId = msg.photo[msg.photo.length-1].file_id;
                var path = bot.downloadFile(photoId, downloadDir).then(function (path) {
                    console.log(path);
                });
                console.log('got photo END')

                return;

                // const photo_module = require('../downloader/photo') ( global_vars )
                
                // //downloadPhoto(msg)
                // return photo_module.downloadPhoto(bot, msg);

            }

           //bot got a PHOTO-document!!!!!
           if( msg.hasOwnProperty('document') ){
               console.log('got photo-document START')

               var downloadDir = global_vars_allusers[chatId].data_user_quiz.download_dir;
               var photoId = msg.document.file_id;
               var path = bot.downloadFile(photoId, downloadDir).then(function (path) {
                   console.log(path);
               });
               console.log('got photo-document END')

               return;

               // const photo_module = require('../downloader/photo') ( global_vars )

               // //downloadPhoto(msg)
               // return photo_module.downloadPhoto(bot, msg);

           }

           //bot got a PHOTO!!!!!
           if( msg.hasOwnProperty('voice') ){
               console.log('got voice START')

               var downloadDir = global_vars_allusers[chatId].data_user_quiz.download_dir;
               var voiceId = msg.voice.file_id;
               var path = bot.downloadFile(voiceId, downloadDir).then(function (path) {
                   console.log(path);
               });
               console.log('got voice END')

               return;
           }

            //is got audio (MP3)
            if(msg.hasOwnProperty('audio')){
                console.log('got audio START')

                var downloadDir = global_vars_allusers[chatId].data_user_quiz.download_dir;
                var audioId = msg.audio.file_id;
                var path = bot.downloadFile(audioId, downloadDir).then(function (path) {
                    console.log(path);
                });
                console.log('got audio END')

                return;
            }

            //is got video (MP4)
            if(msg.hasOwnProperty('video')){
                console.log('got video START')
                var downloadDir = global_vars_allusers[chatId].data_user_quiz.download_dir;
                var videoId = msg.video.file_id;
                var path = bot.downloadFile(videoId, downloadDir).then(function (path) {
                    console.log(path);
                });
                console.log('got video END')
                return;
               
            }

            // var iftext_is_answer = store_answers_module.checkByCallback(
            //     callback_query_button_consts,
            //     last_callback_pressed_button
            // )

            // if(iftext_is_answer){
            //     return
            // }

           switch (global_vars_allusers[chatId].last_callback_pressed_button) {
               case '':
                   console.log('other text private, when last_callback_pressed_button - is empty')
                   return bot.sendMessage(chatId,
                       "💬 Розпочніть бота через кнопку")
                   break;
               case 'denom_setted':
               case '0_begin':

                   // break;

                   case '3_begin':

                   // break;

                   case '3_begin_day':

                   // break;

                   case '6_begin':


                       return bot.sendMessage(chatId,
                           "💬 Виберіть через кнопки, будь ласка, варіант відповіді")
                    break;


           }

            console.log('-----  OTHER TEXT from user   START  -----')
            console.log('last_callback_pressed_buttonWWW: ', global_vars_allusers[chatId].last_callback_pressed_button)
            if(global_vars_allusers[chatId].last_callback_pressed_button != ''
            
                /** тут не допускати входження бота коли користувач має лиш кнопки нажати, а все що пише - треба ігнорувати */


            ){
                
                //save last message (when quiz_mode turned on)
                global_vars_allusers[chatId].last_inputed_text_from_user = text;

                // const chatId = msg.chat.id;
                
                var scenario_module = require('../scenario/quiz') ( global_vars_allusers )
                
                console.log('from onPrivateMess.js else state')
                scenario_module.main_switch(
                    bot,
                    msg,
                    global_vars_allusers[chatId].last_callback_pressed_button+'_answered',
                    chatId
                    );

                // global_vars_allusers[chatId].last_callback_pressed_button = '';

                return;
            }

            //other

            return bot.sendMessage(chatId, "Я тебе не зрозумів. Запусти команду якусь, наприклад /start (для цього пропиши той текст в чаті мені, або натисни на неї, синій фон і слідуй інструкціям)")

    },

}
}