
module.exports = {

    /**
     * Create an OAuth2 client with the given credentials, and then execute the given callback function.
     */
     setCommands: function(bot) {
        bot.setMyCommands([
            {command: '/start', description: 'Запустити бота'},
            {command: '/finish', description: 'Завершити роботу з ботом'},
                //{command: '/send_to_developer', description: 'Написати розробнрику'},
        ]);


    },

 
};

