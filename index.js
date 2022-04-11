const TelegramApi = require('node-telegram-bot-api');
const token = "5260114527:AAEvX52Xcui-EfuE3Uf7M9F5-TzeyutFf8Y";

//was @polling_error in local PC https://github.com/yagop/node-telegram-bot-api/issues/562#issuecomment-382313307

const bot = new TelegramApi(token, {polling: true})

const fs = require('fs');
const { version } = require('os');
const readline = require('readline');

const commands_module = require('./js/commands')
const enums_module = require('./js/js_tool/Enums')

var global_vars = {
    last_callback_pressed_button: '',
    last_inputed_text_from_user: '',
    data_user_quiz : {
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
  };

  var  scenario_module = require('./js/scenario/quiz') ( global_vars )
  var  onGroup_module = require('./js/mess/onFromGroupMess') ( global_vars )
  var  onPrivate_module = require('./js/mess/onPrivateMess') ( global_vars )


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
            
            console.log('last_callback_pressed_button_INDEXPRIVATE: ', global_vars.last_callback_pressed_button)
            console.log('global_vars_INDEXPRIVATE: ', global_vars)
            console.log('global_vars.last_callback_pressed_button_INDEXPRIVATE: ', global_vars.last_callback_pressed_button)

            // PRIVATE mess to bot
            return onPrivate_module.onPrivateMess(
                bot,
                msg, 
                text, 
                chatId
                )

        }else {
            // GROUP mess in group where is bot presents
            return onGroup_module.onFromGroupMessages(
                bot,
                msg, 
                text, 
                chatId
                )    

            
        }
    })

    bot.on("polling_error", console.log);

    /**
     * Telegram API Ivanov Tool
     * @param {*} text 
     * @param {*} callback_data 
     * @returns 
     */

    //answers from clicked buttons
    bot.on('callback_query', msg => {

        const callback_data = msg.data;
        
        console.log(msg)
        console.log('scenario_module.main_switch')
        
        const chatId = msg.message.chat.id;

        scenario_module.main_switch(
            bot, 
            msg,
            callback_data, 
            chatId
        );

        
    })



