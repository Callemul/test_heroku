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



