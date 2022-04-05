const TelegramApi = require('node-telegram-bot-api');
const token = "5260114527:AAEvX52Xcui-EfuE3Uf7M9F5-TzeyutFf8Y";
const bot = new TelegramApi(token, {polling: true})

const fs = require('fs');
const { version } = require('os');
const readline = require('readline');




const months = ['Січень', 'Лютий', 'Березень', 
                'Квітень', 'Травень', 'Червень',
                'Липень', 'Серпень', 'Вересень',
                'Жовтень', 'Листопад', 'Грудень']

const birth_options_months = {
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [{text: '1', callback_data: 'Січень'},
            {text: '2', callback_data: 'Лютий'},
            {text: '3', callback_data: 'Березень'}],

            [{text: '4', callback_data: 'Квітень'},
            {text: '5', callback_data: 'Травень'},
            {text: '6', callback_data: 'Червень'}],

            [{text: '7', callback_data: 'Липень'},
            {text: '8', callback_data: 'Серпень'},
            {text: '9', callback_data: 'Вересень'}],

            [{text: '10', callback_data: 'Жовтень'},
            {text: '11', callback_data: 'Листопад'},
            {text: '12', callback_data: 'Грудень'}],
        ]
    })
} 

const birth_options_days = {
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [{text: '1', callback_data: '1'},
            {text: '2', callback_data: '2'},
            {text: '3', callback_data: '3'},
            {text: '4', callback_data: '4'},
            {text: '5', callback_data: '5'},
            {text: '6', callback_data: '6'}],

            [{text: '7', callback_data: '7'},
            {text: '8', callback_data: '8'},
            {text: '9', callback_data: '9'},
            {text: '10', callback_data: '10'},
            {text: '11', callback_data: '11'},
            {text: '12', callback_data: '12'}],

            [{text: '13', callback_data: '13'},
            {text: '14', callback_data: '14'},
            {text: '15', callback_data: '15'},
            {text: '16', callback_data: '16'},
            {text: '17', callback_data: '17'},
            {text: '18', callback_data: '18'}],

            [{text: '19', callback_data: '19'},
            {text: '20', callback_data: '20'},
            {text: '21', callback_data: '21'},
            {text: '22', callback_data: '22'},
            {text: '23', callback_data: '23'},
            {text: '24', callback_data: '24'}],

            [{text: '25', callback_data: '25'},
            {text: '26', callback_data: '26'},
            {text: '27', callback_data: '27'},
            {text: '28', callback_data: '28'},
            {text: '29', callback_data: '29'},
            {text: '30', callback_data: '30'}],

            [{text: '31', callback_data: '31'}],
        ]
    })
} 

const start = () => {

    const begin_button_0 = setCallBackButtonConst('Почати заповнювати анкету', '0_begin');
    const begin_button_1 = setCallBackButtonConst('Тестова конференція', '1_1_begin');
    const begin_button_2 = setCallBackButtonConst('Підтвердити введення міста', '2_begin');
    const begin_button_3 = setCallBackButtonConst('Підтвердити введення дати події', '3_begin');
    const begin_button_4 = setCallBackButtonConst('Підтвердити введення опису події', '4_begin');
    const begin_button_5 = setCallBackButtonConst('Підтвердити введення телефону', '5_begin');
    const begin_button_6 = {
        reply_markup: JSON.stringify({
            inline_keyboard:[
                [{text: 'Ні', callback_data: '6_begin_no'},
                {text: 'Так', callback_data: '6_begin_yes'},
                ],] })
            } 
                
                //setCallBackButtonConst('Ні','Так', '6_begin');
    const begin_button_7 = setCallBackButtonConst('Підтвердити завершення передач фото/відео', '7_begin');

    //commands
    bot.setMyCommands([
        {command: '/start', description: 'Запустити бота'},
        {command: '/add_my_bday', description: 'Добавити свою дату народження'},
        //{command: '/send_to_developer', description: 'Написати розробнрику'},
    ]);

    // Matches "/echo [whatever]"
    bot.onText(/\/echo (.+)/, (msg, match) => {
        // 'msg' is the received Message from Telegram
        // 'match' is the result of executing the regexp above on the text content
        // of the message

        const chatId = msg.chat.id;
        const resp = match[1]; // the captured "whatever"

        console.log('m!s!g')
        // send back the matched "whatever" to the chat
        bot.sendMessage(chatId, resp);
    });

    bot.on('channel_post', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        console.log('ppp_channel_post')

        console.log('date mess: '+ new Date(msg.date).toISOString())
        return
    })

    bot.on('message', async msg =>{

        const text = msg.text;
        const chatId = msg.chat.id;

        console.log('ppp_message')

        if(msg.chat.type === 'private') {
            console.log('from private')
            console.log('******************************')
            console.log(msg)
            console.log('******************************')

            if (text === '/start') {
                
                console.log('date mess: '+ new Date(msg.date).toISOString())
                
//                await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/f7c/cd4/f7ccd406-4a2d-363e-a098-0ff36e2d534b/4.webp')

                bot.send

                return bot.sendMessage(chatId,
                    `Привіт!
                
                Я український бот для добавляння в базу фото молитовних будинків АСД, які були пошкоджені підчас війни

                Перед завантаженням фото/відео, заповніть, будь ласка, анкету. 
                
                Якщо виникнуть питання, можете звертатись до розробника @Ivanov_Sasha`, begin_button_0)
            }

            //bot got a PHOTO!!!!!
            if(msg.hasOwnProperty('photo')){
                
                downloadPhoto(msg)

            }

            //is got audio (MP3)
            if(msg.hasOwnProperty('audio')){
                
            }

            //is got video (MP3)
            if(msg.hasOwnProperty('audio')){

            }

            

            //other
            return bot.sendMessage(chatId, "Я тебе не зрозумів. Запусти команду якусь, наприклад /start (для цього пропиши той текст в чаті мені, або натисни на неї, синій фон і слідуй інструкціям)")



        }else {



            //G R O U P ! ! !
            {
            console.log('command from group')
            console.log('------------------------------')
            console.log(msg)
            console.log('------------------------------')
            console.log('date mess: '+ new Date(msg.date))
            console.log('date messISO: '+ new Date(msg.date).toISOString())
            if (text === '/start') {
                    return bot.sendMessage(chatId,
                        `Вибачте, я створений лише для приватних мені повідомлень (не для групових).

                        Якщо є потреба, напишіть розробнику, будь ласка, може це добавимо`)
//                if(res_create_db === false){
//                    //error
//                    console.log('GROUP: __ERROR__ after db.createIfNotExist()')
//                    return false
//                }
//
//                let data_db = db.get_db_Sync()
//
//                if(data_db === undefined){
//                    //error
//                    console.log('GROUP: __ERROR__ after db.get_db_Sync()')
//                    return
//                }
//
//                let group_id = msg.chat.id
//
//
//
//                if(data_db.groups === "") {
//                    console.log('db is newest')
//
//                    // data_db.groups[0] = group_id
//                    // data_db.groups[0].[`${group_id}`]
//
//                    // let group_name = msg.chat.title
//
//                    var jsonObj = {
//                        $group_id:
//                            {
//                                group_name: msg.chat.title,
//                                users:
//                                    {
//                                        user_id: msg.from.id,
//                                        user_first_name: msg.from.first_name,
//                                        user_last_name: msg.from.last_name,
//                                        user_birthday: ""
//                                    }
//                            }
//                    }
//
//
//                } else if ( data_db.filter(
//                    function(data_db){
//                        console.log()
//                        console.log('data.group_id = ' + data.group_id)
//                        console.log('data.group_id === group_id  => ' + data.group_id === group_id )
//
//
//                        return data_db[group_id].group_name === group_id
//                    }
//                )
//                ){
//                    let user = {
//                        user_id: msg.from.id,
//                        user_first_name: msg.from.first_name,
//                        user_last_name: msg.from.last_name,
//                        user_birthday: ""
//                    }
//                } else {
//                    //if not new db - then, just append
//
//                }
//
//                console.log('date mess: '+ new Date(msg.date).toISOString())
//
//                await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/f7c/cd4/f7ccd406-4a2d-363e-a098-0ff36e2d534b/4.webp')
//                return bot.sendMessage(chatId,
//                    `Привіт!🙂🥳
//
//                Для додавання мені дати народження, пиши в лічку @BirthdayUABot, там всі команди для цього`)
//            }

            }
    }
    }
    })


    /**
     * Telegram API Ivanov Tool
     * @param {*} text 
     * @param {*} callback_data 
     * @returns 
     */
    function setCallBackButtonConst(button_label_text, callback_data){
        return {
            reply_markup: JSON.stringify({
                inline_keyboard:[
                    [{text: button_label_text, callback_data: callback_data}],
                ]
            })
        } 
    }

    function downloadPhoto(msg){
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

                    createAndUploadFileToGoogleSharedFolder()
                })
            //

        });

    };

    


    //answers from clicked buttons
    bot.on('callback_query', msg => {

        const data = msg.data;
        const chatId = msg.message.chat.id;
        console.log(msg)

        if(data === '0_begin'){
            console.log('0_begin: роспочато анкетування')

            bot.sendMessage(chatId, "➡️1. Оберіть Конференцію:", begin_button_1)


        }else if(data === '1_1_begin'){
            console.log('1 1 _begin: роспочато анкетування')

            bot.sendMessage(chatId, "➡️2. Оберіть місто", begin_button_2)


        }else if(data === '2_begin'){
            console.log('2_begin:')

            bot.sendMessage(chatId, `➡️3. Зазначте дату події
            
            Вводьте, будь ласка, в такому форматі:

            Наприклад, 27.02.2022
            `, begin_button_3)


        }else if(data === '3_begin'){
            console.log('3_begin:')

            //тут може бути багато повідомлень. Масив повідомлень
            bot.sendMessage(chatId, `➡️4. Опишіть коротко подію`, begin_button_4)


        }else if(data === '4_begin'){
            console.log('4_begin:')

            //тут може бути багато повідомлень. Масив повідомлень
            bot.sendMessage(chatId, `➡️5. Вкажіть контактний телефон`, begin_button_5)


        }else if(data === '5_begin'){
            console.log('5_begin:')

            //тут може бути багато повідомлень. Масив повідомлень
            bot.sendMessage(chatId, `➡️6. Чи є свідки?`, begin_button_6)


        }else if(data === '6_begin_no' || data === '6_begin_yes' ){
            console.log('6_begin:')

            //тут може бути багато повідомлень. Масив повідомлень
            bot.sendMessage(chatId, `➡️7. Тепер можите передати мені фото, відео
            
            Дочекайтесь, будь ласка, поки всі фото, відео не будуть передані повністю, перед натисненням кнопки підтвердження.
            `, begin_button_7)


        }else if(data === '7_begin'){
            console.log('7_begin:')

            //тут може бути багато повідомлень. Масив повідомлень
            bot.sendMessage(chatId, `➡️8. Дані передано, дякуємо`)


        }else if(months.includes(data)){
            bot.sendMessage(chatId, `Виберіть день`, birth_options_days); 
        }else{
            console.log('нажата невідома кнопка', data)
        }


        
    })
}


start()