const store_answers_module = require('../callback_tool/callback_save_answers')

module.exports = {

    onPrivateMess: function(
        bot, msg, text, chatId, 
        last_inputed_text_from_user,
        last_callback_pressed_button,
        begin_button_0){
            
            console.log('from private')
            console.log('******************************')
            console.log(msg)
            console.log('******************************')

            if (text === '/start') {
                
                console.log('date mess: '+ new Date(msg.date).toISOString())
                
//                await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/f7c/cd4/f7ccd406-4a2d-363e-a098-0ff36e2d534b/4.webp')

                // bot.send

                return bot.sendMessage(chatId,
                    `Привіт!
                
                Я український бот для добавляння в базу фото молитовних будинків АСД, які були пошкоджені підчас війни

                Перед завантаженням фото/відео, заповніть, будь ласка, анкету. 
                
                Якщо виникнуть питання, можете звертатись до розробника @Ivanov_Sasha`, begin_button_0)
            }

            //bot got a PHOTO!!!!!
            if(msg.hasOwnProperty('photo')){
                
                //downloadPhoto(msg)
                return photo_module.downloadPhoto(msg);

            }

            //is got audio (MP3)
            if(msg.hasOwnProperty('audio')){
                
            }

            //is got video (MP4)
            if(msg.hasOwnProperty('video')){

            }

            // var iftext_is_answer = store_answers_module.checkByCallback(
            //     callback_query_button_consts,
            //     last_callback_pressed_button
            // )

            // if(iftext_is_answer){
            //     return
            // }

            
            if(last_callback_pressed_button != ''){
                //save last message (when quiz_mode turned on)
                last_inputed_text_from_user.text = text;
                last_inputed_text_from_user.msg = msg;
                return;
            }

            //other
            return bot.sendMessage(chatId, "Я тебе не зрозумів. Запусти команду якусь, наприклад /start (для цього пропиши той текст в чаті мені, або натисни на неї, синій фон і слідуй інструкціям)")

    },

}