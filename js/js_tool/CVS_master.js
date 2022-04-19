const fs = require('fs-extra');
const { Parser } = require('json2csv');
module.exports = function( global_vars ) {
    return {
    save_data_toCSV: function( msg, chatId ) {
        //https://stackoverflow.com/questions/35991698/telegram-bot-receive-photo-url
        console.log('function save_data_toCSV START')


        var fields = ['car', 'price', 'color'];
        var row = {
            "№":"",
            "Конференція": global_vars[chatId].data_user_quiz["1. conference"],
            "Місто":  global_vars[chatId].data_user_quiz["2. town"],
            "Дата":  global_vars[chatId].data_user_quiz["3. date"],
            "Опис":  global_vars[chatId].data_user_quiz["4. description"],
            "Телефон":  global_vars[chatId].data_user_quiz["5. phone"],
            "Очевидці":  global_vars[chatId].data_user_quiz["6. bystander"]=='6_begin_yes'?'Так':'Ні',
            "Папка з фото":  global_vars[chatId].data_user_quiz["download_dir"],
            "chatId":  global_vars[chatId].data_user_quiz["chatId"],
          }

        //if exist main_CSV_file
        const path = './_excel_file/Дані з бота.csv';
        const json2csvParser = new Parser({ delimiter: ';', quote: '', });

        const csvData = json2csvParser.parse(row);
        
        console.log()
        // var csvStr = json2csv.parse( row, { fields: fields, del: ';' });

        try {
            if (!fs.existsSync(path)) {
                // https://stackoverflow.com/a/45232685/10175189
                
                //create if not exists
                // fs.ensureFileSync(path);

                fs.writeFile(path, '\ufeff' + csvData, { encoding: 'utf-8', flag: 'wx' });

            }else{
                var getRowWithoutHeaders = "\r\n"+csvData.split('\r\n')[1];
                fs.appendFile(path, getRowWithoutHeaders, (err) => {
                    // return console.log('!! error append file', err);
                });

            }
        } catch(err) {
            
        }



        //append row to a file

    },


}
}