module.exports = function (global_vars)  {
    return {
    onFromGroupMessages: function(
        bot, 
        msg, 
        text, 
        chatId,
        global_vars
        ){

        //G R O U P ! ! !
            console.log('command from group')
            console.log('------------------------------')
            console.log(msg)
            console.log('------------------------------')
            console.log('date mess: '+ new Date(msg.date))
            console.log('date messISO: '+ new Date(msg.date).toISOString())
            if (text === '/start') {
                    return bot.sendMessage(chatId,
                        `Вибачте, я створений лише для приватних мені повідомлень (не для групових).

                        Якщо є потреба, напишіть розробнику, будь ласка, може таке добавимо`)

            }
            
    },
}
}