const enums_module = require('../js_tool/Enums')
const fs = require('fs');


function setCallBackButtonConst(button_label_text, callback_data){
    return {
        reply_markup: JSON.stringify({
            inline_keyboard:[
                [{text: button_label_text, callback_data: callback_data}],
            ]
        })
    } 
}

const begin_button_0 = setCallBackButtonConst('Почати реєстрацію', '0_begin');
const begin_button_1 = {
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [{text: 'Буковинська', callback_data: enums_module.conferences.Буковинська},
            {text: 'Південна', callback_data: enums_module.conferences.Південна},
            {text: 'Дніпровська', callback_data: enums_module.conferences.Дніпровська}],

            [{text: 'Західна', callback_data: enums_module.conferences.Західна},
            {text: 'Київська', callback_data: enums_module.conferences.Київська},
            {text: 'Подільська', callback_data: enums_module.conferences.Подільська}],

            [{text: 'Центральна', callback_data: enums_module.conferences.Центральна},
            {text: 'Східно-Дніпровська', callback_data: enums_module.conferences['Східно-Дніпровська']},],

        ]
    })
} 
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

const begin_button_rewrite = {
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [
                {text: 'Ввести заново', callback_data: 'rewrite'},
                {text: 'Наступне питання', callback_data: 'next'},
            ]
            ,] })
        } 

//https://stackoverflow.com/a/7906810/10175189
module.exports = function( global_vars_allusers )
        {

    /**
     * 
     * @param {*} bot - bot
     * @param {*} msg - a whole message object from telegram
     * @param {*} callback_data - callback_data (pressed button)
     * @param {*} chatId - cahtId
     * @param {*} last_callback_pressed_button - last_callback_pressed_button
     * @param {*} data_user_quiz - answer storedge object 
     * @param {*} inputed_text_from_user - inputed text message from user to bot (can be null)
     */
    return{ main_switch: function(
        bot,
        msg,
        callback_data,
        chatId       
        ){

            console.log('-------------begin TITLE -----------')
            console.log('main_switch begin')
            console.log('callback_data ', callback_data)
            
            if(global_vars_allusers[chatId]!= undefined){
                console.log('global_vars_allusers[chatId].last_callback_pressed_button ',
                    global_vars_allusers[chatId].last_callback_pressed_button)
            }
            console.log('-------------end TITLE -----------')
            
            const text = msg.text;
            // const chatId = msg.message.chat.id;

        switch(callback_data){

            case 'hello':
                console.log('case hello')

                
                 console.log(global_vars_allusers[chatId])
                

                bot.sendMessage(chatId,
                    `Я - український бот реєстрації руйнувань молитовних будинків АСД
                    
                Якщо виникнуть питання, можете звертатись до розробника @Ivanov_Sasha
                
                Щоб зареєструвати руйнування натисни "Почати реєстрацію"`, begin_button_0)
                console.log('end case from switch hello');
                break;

            case '0_begin':
                console.log('case 0_begin: START from switch')
                
                global_vars_allusers[chatId].last_callback_pressed_button = '0_begin';

                //show 8 buttons conferences
                bot.sendMessage(chatId, "➡️ 1. Виберіть конференцію:", begin_button_1);
                
                // console.log('last_inputed_text_from_user: ', last_inputed_text_from_user)
                console.log('last_callback_pressed_button: ', global_vars_allusers[chatId].last_callback_pressed_button)
                console.log('case 0_begin: END from switch')

                //next: wait pressed text (conferencename)
                break;
            

            case enums_module.conferences.Буковинська:
            case enums_module.conferences.Дніпровська:
            case enums_module.conferences.Західна:
            case enums_module.conferences.Київська:
            case enums_module.conferences.Подільська:
            case enums_module.conferences.Південна:
            case enums_module.conferences['Східно-Дніпровська']:
            case enums_module.conferences.Центральна:
                console.log('1_1_begin: clicked 1/8 buttons callback, clicked')

                //save answer
                global_vars_allusers[chatId].data_user_quiz['1. conference'] = callback_data;
                console.log('data_user_quiz: ', global_vars_allusers[chatId].data_user_quiz)

                //send new button
                global_vars_allusers[chatId].last_callback_pressed_button = '1_1_begin';
                bot.sendMessage(chatId, "➡️ 2. Введіть місто")
                // console.log('last_inputed_text_from_user: ', last_inputed_text_from_user)
                console.log('last_callback_pressed_button: ', global_vars_allusers[chatId].last_callback_pressed_button)
                console.log('end case from switch TOWNS');


                break;
            case '1_1_begin_answered':
                console.log('case 1_1_begin_answered: START from switch')
                
                global_vars_allusers[chatId].data_user_quiz['2. town'] = global_vars_allusers[chatId].last_inputed_text_from_user
                console.log('data_user_quiz: ', global_vars_allusers[chatId].data_user_quiz)

                //---------------------------------------------
                /*фіктивно створюю ніби нажата кнопка, типу "підтвердити введення тексту міста/телефону"
                 * Бо якщо ще робити кнопки підтвердження, 
                    то тоді лишнього коду вправляючого сценарій подій
                    (сценарій тоді буде в двох місцях, а це не правильно)
                 */
                global_vars_allusers[chatId].last_callback_pressed_button = '3_begin';

                console.log('3_begin:')


                const options_months = {
                    reply_markup: JSON.stringify({
                        inline_keyboard:[
                            [{text: 'Січень', callback_data: 'Січень'},
                            {text: 'Лютий', callback_data: 'Лютий'},
                            {text: 'Березень', callback_data: 'Березень'}],
                
                            [{text: 'Квітень', callback_data: 'Квітень'},
                            {text: 'Травень', callback_data: 'Травень'},
                            {text: 'Червень', callback_data: 'Червень'}],
                
                            [{text: 'Липень', callback_data: 'Липень'},
                            {text: 'Серпень', callback_data: 'Серпень'},
                            {text: 'Вересень', callback_data: 'Вересень'}],
                
                            [{text: 'Жовтень', callback_data: 'Жовтень'},
                            {text: 'Листопад', callback_data: 'Листопад'},
                            {text: 'Грудень', callback_data: 'Грудень'}],
                        ]
                    })
                } 

                bot.sendMessage(chatId, `➡️ 3.1. Зазначте дату події. Спочатку місяць`, options_months)
                // console.log('last_inputed_text_from_user: ', last_inputed_text_from_user)
                console.log('last_callback_pressed_button: ', global_vars_allusers[chatId].last_callback_pressed_button)
                console.log('end case from switch 1_1_begin_answered');
                break;
        
            case 'Січень':case 'Лютий':case 'Березень':
            case 'Квітень':case 'Травень':case 'Червень':
            case 'Липень':case 'Серпень':case 'Вересень':
            case 'Жовтень':case 'Листопад':case 'Грудень':
                console.log('case 3_1_month_answered: START from switch')
                    
                global_vars_allusers[chatId].data_user_quiz['3. date'] = callback_data;
                console.log('data_user_quiz: ', global_vars_allusers[chatId].data_user_quiz)

                    //---------------------------------------------
                    /*фіктивно створюю ніби нажата кнопка, типу "підтвердити введення тексту міста/телефону"
                     * Бо якщо ще робити кнопки підтвердження, 
                        то тоді лишнього коду вправляючого сценарій подій
                        (сценарій тоді буде в двох місцях, а це не правильно)
                     */
                    global_vars_allusers[chatId].last_callback_pressed_button = '3_begin_day';
    
                    console.log('3_begin:')
    
    
                    /**
                     * space don't delete, because the width at the Android - is weak
                     */
                    const options_days = {
                        reply_markup: JSON.stringify({
                            inline_keyboard:[
                                [{text: ' 1 ', callback_data: '1d'},
                                {text: '2', callback_data: '2d'},
                                {text: '3', callback_data: '3d'},
                                {text: '4', callback_data: '4d'},
                                {text: '5', callback_data: '5d'},
                                {text: '6', callback_data: '6d'}],
                    
                                [{text:'  7  ', callback_data: '7d'},
                                {text: '  8  ', callback_data: '8d'},
                                {text: '  9  ', callback_data: '9d'},
                                {text: '  10  ', callback_data: '10d'},
                                {text: '  11  ', callback_data: '11d'},
                                {text: '  12  ', callback_data: '12d'}],
                    
                                [{text:'   13   ', callback_data: '13d'},
                                {text: '   14   ', callback_data: '14d'},
                                {text: '   15   ', callback_data: '15d'},
                                {text: '   16   ', callback_data: '16d'},
                                {text: '   17   ', callback_data: '17d'},
                                {text: '   18   ', callback_data: '18d'}],
                    
                                [{text: '19', callback_data: '19d'},
                                {text: '20', callback_data: '20d'},
                                {text: '21', callback_data: '21d'},
                                {text: '22', callback_data: '22d'},
                                {text: '23', callback_data: '23d'},
                                {text: '24', callback_data: '24d'}],
                    
                                [{text: '25', callback_data: '25d'},
                                {text: '26', callback_data: '26d'},
                                {text: '27', callback_data: '27d'},
                                {text: '28', callback_data: '28d'},
                                {text: '29', callback_data: '29d'},
                                {text: '30', callback_data: '30d'}],
                    
                                [{text: '31', callback_data: '31d'}],
                            ]
                        })
                    } 
                    
    
                    bot.sendMessage(chatId, `➡️ 3.2. Тепер день`, options_days)
                    // console.log('last_inputed_text_from_user: ', last_inputed_text_from_user)
                    console.log('last_callback_pressed_button: ', global_vars_allusers[chatId].last_callback_pressed_button)
                    console.log('end case from switch 1_1_begin_answered');
                    break;



            case '1d':case '2d':case '3d':case '4d':case '5d':
            case '6d':case '7d':case '8d':case '9d':case '10d':
            case '11d':case '12d':case '13d':case '14d':case '15d':
            case '16d':case '17d':case '18d':case '19d':case '20d':
            case '21d':case '22d':case '23d':case '24d':case '25d':
            case '26d':case '27d':case '28d':case '29d':case '30d':
            case '31d':
            case '3_begin_answered':
                console.log('case 3_begin_answered: START from switch')
                global_vars_allusers[chatId].data_user_quiz['3. date'] = global_vars_allusers[chatId].data_user_quiz['3. date'] + ', ' + callback_data.slice(0, -1); //month + ' ' + days
                console.log('data_user_quiz: ', global_vars_allusers[chatId].data_user_quiz)
                //---------------------------------------------
              
                console.log('4_begin:');
                global_vars_allusers[chatId].last_callback_pressed_button = '4_begin';
                //тут може бути багато повідомлень. Масив повідомлень
                bot.sendMessage(chatId, `➡️ 4. Опишіть коротко подію. Одним повідомленням, без виправлень. Або напишіть нове (бо зараховано буде лиш останнє повідомлення)`)
                // console.log('last_inputed_text_from_user: ', last_inputed_text_from_user)
                console.log('last_callback_pressed_button: ', global_vars_allusers[chatId].last_callback_pressed_button)
                console.log('end case from switch 3_begin_answered');
                break;

            case '4_begin_answered':
                console.log('case 4_begin_answered: START from switch')
                global_vars_allusers[chatId].data_user_quiz['4. description'] = global_vars_allusers[chatId].last_inputed_text_from_user
                console.log('data_user_quiz: ', global_vars_allusers[chatId].data_user_quiz)
                //---------------------------------------------
              
                console.log('5_begin:');
                global_vars_allusers[chatId].last_callback_pressed_button = '5_begin';
                
                //тут може бути багато повідомлень. Масив повідомлень
                bot.sendMessage(chatId, `➡️ 5. Вкажіть контактний телефон`)
                // console.log('last_inputed_text_from_user: ', last_inputed_text_from_user)
                console.log('last_callback_pressed_button: ', global_vars_allusers[chatId].last_callback_pressed_button)
                console.log('end case from switch 4_begin_answered');
                break;    


            case '5_begin_answered':
                console.log('case 5_begin_answered: START from switch')
                global_vars_allusers[chatId].data_user_quiz['5. phone'] = global_vars_allusers[chatId].last_inputed_text_from_user
                console.log('data_user_quiz: ', global_vars_allusers[chatId].data_user_quiz)
                //---------------------------------------------
                console.log('6_begin:');
                global_vars_allusers[chatId].last_callback_pressed_button = '6_begin';
                
                
                //тут може бути багато повідомлень. Масив повідомлень
                bot.sendMessage(chatId, `➡️ 6. Чи є свідки?`, begin_button_6)
                // console.log('last_inputed_text_from_user: ', last_inputed_text_from_user)
                console.log('last_callback_pressed_button: ', global_vars_allusers[chatId].last_callback_pressed_button)
                console.log('end case from switch 5_begin_answered');
                break;  


            case '6_begin_no':
            case '6_begin_yes':
                console.log('case 6_begin_yes/no: START from switch')
                global_vars_allusers[chatId].data_user_quiz['6. bystander'] = callback_data;
                console.log('data_user_quiz: ', global_vars_allusers[chatId].data_user_quiz)
                //---------------------------------------------
                console.log('7_begin:');
                global_vars_allusers[chatId].last_callback_pressed_button = '7_begin';
                
                //one_time saving
                global_vars_allusers[chatId].data_user_quiz.chatId = chatId;

                //set download folder
                const main_dir = 'images_and_videos';
                var conference_dir = global_vars_allusers[chatId].data_user_quiz["1. conference"];
                var town_folder_old = global_vars_allusers[chatId].data_user_quiz["2. town"];
                var town_folder = town_folder_old.replace(/[/\\?%*:|"<>]/g, '-');
                var downloadDir = './' + main_dir + '/' + conference_dir + '/' + town_folder;
                global_vars_allusers[chatId].data_user_quiz.download_dir = downloadDir;
                
                //prepare (create) folder for downloading files
                if (!fs.existsSync(downloadDir)){
                    fs.mkdirSync(downloadDir, { recursive: true });
                }

                //save data to CSV
                const csv_master = require('../js_tool/CVS_master') ( global_vars_allusers );
                csv_master.save_data_toCSV(msg, chatId);
                
                bot.sendMessage(chatId, `➡️ 7. Тепер можете передати мені фото/відео
                
                Дочекайтесь, будь ласка, поки всі фото/відео, відео не будуть передані повністю, перед натисненням кнопки підтвердження.
                
                Якщо ви завершили передачу фото/відео, введіть мені слово: finish`)
                // console.log('last_inputed_text_from_user: ', last_inputed_text_from_user)
                console.log('last_callback_pressed_button: ', global_vars_allusers[chatId].last_callback_pressed_button)
                console.log('end case from switch 6_begin_yes/no-answered');
                break;  

            case '7_begin_answered':
                console.log('case 7_begin_answered: START from switch')
                if(
                    global_vars_allusers[chatId].last_inputed_text_from_user == 'finish'
                    || global_vars_allusers[chatId].last_inputed_text_from_user == 'Finish'
                    || global_vars_allusers[chatId].last_inputed_text_from_user == '🏁'
                    || global_vars_allusers[chatId].last_inputed_text_from_user == '/finish'
                    || global_vars_allusers[chatId].last_inputed_text_from_user == '/Finish'
                    || global_vars_allusers[chatId].last_inputed_text_from_user == '/🏁'
                 ){
                    global_vars_allusers[chatId].data_user_quiz['7. load files'] = 'yes';
                    console.log('data_user_quiz: ', global_vars_allusers[chatId].data_user_quiz)
                    global_vars_allusers[chatId].last_callback_pressed_button = '';
                    

                    


                    /**
                     * ТУТ МОЖНА ЗБЕРІГАТИ ВСІ ДАНІ,
                     * СОРТУВАТИ ФОТКИ, і т.д.
                     * 
                     */
                    
                    bot.sendMessage(chatId, `➡️ 8. Дані передано, дякуємо`)

                    
                }else{
                    global_vars_allusers[chatId].data_user_quiz['7. load files'] = 'no_user_not_type_finish_to_us';
                    console.log('data_user_quiz: ', global_vars_allusers[chatId].data_user_quiz)
                    bot.sendMessage(chatId, `Я вас не зрозумів`)

                }
                //---------------------------------------------
                break;  

            default:

                //step 1. conferences
                
            
                // }else{
                    console.log('нажата невідома кнопка', callback_data)
                // }

            }
            

    }
}
        }