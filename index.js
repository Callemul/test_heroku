const TelegramApi = require('node-telegram-bot-api');
const token = "5260114527:AAEvX52Xcui-EfuE3Uf7M9F5-TzeyutFf8Y";
const bot = new TelegramApi(token, {polling: true})

const fs = require('fs');
const { version } = require('os');
const readline = require('readline');

const commands_module = require('./js/commands')
const photo_module = require('./js/donwloader/photo')
const onGroup_module = require('./js/mess/onFromGroupMess')
const onPrivate_module = require('./js/mess/onPrivateMess')



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

    const callback_query_button_consts = {
        "0_begin": "0_begin",
        "1_1_begin": "1_1_begin",
        "2_begin": "2_begin",
        "3_begin": "3_begin",
        "4_begin": "4_begin",
        "5_begin": "5_begin",
        "6_begin_no": "6_begin_no",
        "6_begin_yes": "6_begin_yes",
        "7_begin": "7_begin",
    };


    var current_step = '';
    var CURRENT_STEP_ENUM = {
        "1. conference": "1. conference",
        "2. town": "2. town",
        "3. date": "3. date",
        "4. description": "4. description",
        "5. phone": "5. phone",
        "6. bystander": "6. bystander",
        "7. load files": "7. load files",
        "chatId": "",
    };
    
    var quiz_data_per_user = {
        "1. conference": "",
        "2. town": "",
        "3. date": "",
        "4. description": "",
        "5. phone": "",
        "6. bystander": "",
        "7. load files": "",
        "chatId": "",
    };

    var last_inputed_text_from_user = {
        "text": "",
        "msg_object" : ""
    };

    var last_callback_pressed_button = '';


    const begin_button_0 = setCallBackButtonConst('Почати заповнювати анкету', '0_begin');
    const begin_button_1 = setCallBackButtonConst('Підтвердити введення конференції', '1_1_begin');
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
    const begin_button_7 = setCallBackButtonConst('Підтвердити завершення передач фото/відео', '7_begin');

    //commands
    commands_module.setCommands(bot);        

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
            
            // PRIVATE mess to bot
            return onPrivate_module.onPrivateMess(
                bot, msg, text, chatId, 
                last_inputed_text_from_user,
                last_callback_pressed_button,
                begin_button_0)

        }else {
            // GROUP mess in group where is bot presents
            return onGroup_module.onFromGroupMessages(bot, msg, text, chatId)    

            
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




    //answers from clicked buttons
    bot.on('callback_query', msg => {

        const data = msg.data;
        const chatId = msg.message.chat.id;
        console.log(msg)

        switch(data){

            case callback_query_button_consts['0_begin']:
                console.log('0_begin: роспочато анкетування')
                
                last_callback_pressed_button = data;

                bot.sendMessage(chatId, "➡️1. Введіть конференцію (наприклад, Подільська):");
                console.log('last_inputed_text_from_user: ', last_inputed_text_from_user)
                console.log('last_callback_pressed_button: ', last_callback_pressed_button)
                break;
            
            case callback_query_button_consts['1_1_begin']:
                console.log('1 1 _begin: роспочато анкетування')

                last_callback_pressed_button = data;

                
                bot.sendMessage(chatId, "➡️2. Оберіть місто", begin_button_2)
                console.log('last_inputed_text_from_user: ', last_inputed_text_from_user)
                console.log('last_callback_pressed_button: ', last_callback_pressed_button)
                break;
            
            case callback_query_button_consts['2_begin']:
                console.log('2_begin:')

                last_callback_pressed_button = data;

                
                bot.sendMessage(chatId, `➡️3. Зазначте дату події
                
Вводьте, будь ласка, в такому форматі:

Наприклад, 27.02.2022
                                `, begin_button_3)
                console.log('last_inputed_text_from_user: ', last_inputed_text_from_user)
                console.log('last_callback_pressed_button: ', last_callback_pressed_button)
                break;
        
            case callback_query_button_consts['3_begin']:
                console.log('3_begin:')

                last_callback_pressed_button = data;

                
                //тут може бути багато повідомлень. Масив повідомлень
                bot.sendMessage(chatId, `➡️4. Опишіть коротко подію`, begin_button_4)
                console.log('last_inputed_text_from_user: ', last_inputed_text_from_user)
                console.log('last_callback_pressed_button: ', last_callback_pressed_button)
                break;

            case callback_query_button_consts['4_begin']:
                console.log('4_begin:')

                last_callback_pressed_button = data;

                
                //тут може бути багато повідомлень. Масив повідомлень
                bot.sendMessage(chatId, `➡️5. Вкажіть контактний телефон`, begin_button_5)
                console.log('last_inputed_text_from_user: ', last_inputed_text_from_user)
                console.log('last_callback_pressed_button: ', last_callback_pressed_button)
                break;    


            case callback_query_button_consts['5_begin']:
                console.log('5_begin:')

                last_callback_pressed_button = data;

                
                //тут може бути багато повідомлень. Масив повідомлень
                bot.sendMessage(chatId, `➡️6. Чи є свідки?`, begin_button_6)
                console.log('last_inputed_text_from_user: ', last_inputed_text_from_user)
                console.log('last_callback_pressed_button: ', last_callback_pressed_button)
                break;  


            case callback_query_button_consts['6_begin_no']:
            case callback_query_button_consts['6_begin_yes']:
                console.log(data)

                last_callback_pressed_button = data; //6_begin_no OR 6_begin_yes

                
                //тут може бути багато повідомлень. Масив повідомлень
                bot.sendMessage(chatId, `➡️7. Тепер можите передати мені фото, відео
                
                Дочекайтесь, будь ласка, поки всі фото, відео не будуть передані повністю, перед натисненням кнопки підтвердження.
                `, begin_button_7)
                console.log('last_inputed_text_from_user: ', last_inputed_text_from_user)
                console.log('last_callback_pressed_button: ', last_callback_pressed_button)
                break;  

            case callback_query_button_consts['7_begin']:
                console.log('7_begin:')

                last_callback_pressed_button = data;

                
                //тут може бути багато повідомлень. Масив повідомлень
                bot.sendMessage(chatId, `➡️8. Дані передано, дякуємо`)
                console.log('last_inputed_text_from_user: ', last_inputed_text_from_user)
                console.log('last_callback_pressed_button: ', last_callback_pressed_button)
                break;  

            default:

                if(months.includes(data)){
                    bot.sendMessage(chatId, `Виберіть день`, birth_options_days); 
            bot.sendMessage(chatId, `Виберіть день`, birth_options_days); 
                    bot.sendMessage(chatId, `Виберіть день`, birth_options_days); 
            bot.sendMessage(chatId, `Виберіть день`, birth_options_days); 
                    bot.sendMessage(chatId, `Виберіть день`, birth_options_days); 
            bot.sendMessage(chatId, `Виберіть день`, birth_options_days); 
                    bot.sendMessage(chatId, `Виберіть день`, birth_options_days); 
            bot.sendMessage(chatId, `Виберіть день`, birth_options_days); 
                    bot.sendMessage(chatId, `Виберіть день`, birth_options_days); 
                }else{
                    console.log('нажата невідома кнопка', data)
                }

            }
            


        
    })
}


start()