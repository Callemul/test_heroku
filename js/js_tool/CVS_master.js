const fs = require('fs');

var json2csv = require('json2csv');

module.exports = function( global_vars ) {
    return {
    save_data_toCSV: function( msg ) {
        //https://stackoverflow.com/questions/35991698/telegram-bot-receive-photo-url
        console.log('function save_data_toCSV START')


        var fields = ['car', 'price', 'color'];
        var row = {
            "№":"",
            "Конференція": global_vars.data_user_quiz["1. conference"],
            "Місто":  global_vars.data_user_quiz["2. town"],
            "Дата":  global_vars.data_user_quiz["3. date"],
            "Опис":  global_vars.data_user_quiz["4. description"],
            "Телефон":  global_vars.data_user_quiz["5. phone"],
            "Очевидці":  global_vars.data_user_quiz["6. bystander"],
            "Папка з фото":  global_vars.data_user_quiz["download_dir"],
            "chatId":  global_vars.data_user_quiz["chatId"],
          }

        //if exist main_CSV_file
        const path = './../../_excel_file/Дані з бота.csv';
        var csvStr = json2csv({ data: row, fields: fields, del: ';' });

        try {
            if (!fs.existsSync(path)) {
                // https://stackoverflow.com/a/45232685/10175189


                fs.writeFile(path, '\ufeff' + csvStr, { encoding: 'utf-8' },function(err) {
                    if (err) {
                        console.log('!! err create CSV file !!', err);
                    }
                    
                    console.log('file saved');
                });

            }else{

                fs.appendFile(path, csvStr, (err) => {
                    return console.log('!! error append file', err);
                });

            }
        } catch(err) {
            
        }



        //append row to a file

    },


}
}