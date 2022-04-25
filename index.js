const TelegramApi = require('node-telegram-bot-api');



require('dotenv').config();
const token = process.env.BOT_TOKEN;

//was @polling_error in local PC https://github.com/yagop/node-telegram-bot-api/issues/562#issuecomment-382313307

const bot = new TelegramApi(token, {polling: true})

const commands_module = require('./js/commands')
const enums_module = require('./js/js_tool/Enums');




  var global_vars_allusers = [];

  var  scenario_module = require('./js/scenario/quiz') ( global_vars_allusers )
  var  onGroup_module = require('./js/mess/onFromGroupMess') ( global_vars_allusers )
  var  onPrivate_module = require('./js/mess/onPrivateMess') ( global_vars_allusers )




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

        console.log('bot.on(\'channel_post\')   START')


        const text = msg.text;
        const chatId = msg.chat.id;

        console.log('ppp_channel_post')

        console.log('date mess: '+ new Date(msg.date).toISOString())
        return
    })

    bot.on('message', async msg =>{

        console.log('bot.on(\'message\')   START')
        const text = msg.text;
        const chatId = msg.chat.id;

        console.log('ppp_message')

        if(msg.chat.type === 'private') {
            

            

              console.log(global_vars_allusers)

            console.log('bot.on(\'message\')   START    PRIVATE-chat type')

            if(global_vars_allusers[chatId]!= undefined){
                console.log('last_callback_pressed_button_INDEXPRIVATE: ', global_vars_allusers[chatId].last_callback_pressed_button)
                console.log('~~~~~~~~~~~~~~~~START~~~~~~~~~~~~~~~~~~~: global_vars_allusers' )
                console.log('global_vars_allusers_INDEXPRIVATE: ', global_vars_allusers)
                console.log('\n~~~~~~~~~~~~~~~~END~~~~~~~~~~~~~~~~~~~: global_vars_allusers\n' )
                console.log('global_vars_allusers.last_callback_pressed_button_INDEXPRIVATE: ', global_vars_allusers[chatId].last_callback_pressed_button)
            }else{
                console.log('\n\nglobal_vars_allusers[chatId] = undefined \n\n')
            }
            // PRIVATE mess to bot
            return onPrivate_module.onPrivateMess(
                bot,
                msg, 
                text, 
                chatId
                )

        }else {
            // GROUP mess in group where is bot presents
            console.log('bot.on(\'message\')   START    GROUP-chat type')

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
        console.log('bot.on(\'callback_query\')   START')

        const callback_data = msg.data;
        
        console.log(msg)

        const chatId = msg.message.chat.id;


        if(global_vars_allusers[chatId]!= undefined){
            console.log('last_callback_pressed_button_INDEXPRIVATE: ', global_vars_allusers[chatId].last_callback_pressed_button)
            console.log('~~~~~~~~~~~~~~~~START callback~~~~~~~~~~~~~~~~~~~: global_vars_allusers' )
            console.log('global_vars_allusers_INDEXPRIVATE: ', global_vars_allusers)
            console.log('\n~~~~~~~~~~~~~~~~END callback~~~~~~~~~~~~~~~~~~~: global_vars_allusers\n' )
            console.log('global_vars_allusers.last_callback_pressed_button_INDEXPRIVATE: ', global_vars_allusers[chatId].last_callback_pressed_button)
        }else{
            console.log('\n\nglobal_vars_allusers[chatId] = undefined \n\n')
        }


        console.log('from index.js callback_query state')
        scenario_module.main_switch(
            bot, 
            msg,
            callback_data, 
            chatId
        );

        console.log('bot.on(\'callback_query\')   END')

        
    })



