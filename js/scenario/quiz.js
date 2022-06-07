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

const begin_button_0 = setCallBackButtonConst('Почати реєстрацію', 'X_begin');


const begin_button_X = {
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [{text: '1', callback_data: enums_module.DENOMINATION_CALLBACK_LIST["1. Римсько-католицька церква в Україні"]},
                {text: '2', callback_data: enums_module.DENOMINATION_CALLBACK_LIST["2. Українська греко-католицька церква"]},
                {text: '3', callback_data: enums_module.DENOMINATION_CALLBACK_LIST["3. Мукачівська греко-католицька єпархія"]},
                {text: '4', callback_data: enums_module.DENOMINATION_CALLBACK_LIST["4. Православна церква України"]}],

            [{text: '5', callback_data: enums_module.DENOMINATION_CALLBACK_LIST["5. Українська православна церква (Московський патріархат)"]},
                {text: '6', callback_data: enums_module.DENOMINATION_CALLBACK_LIST["6. Українська єпархія Вірменської апостольської церкви"]},
                {text: '7', callback_data: enums_module.DENOMINATION_CALLBACK_LIST["7. Церква євангельських християн-баптистів в Україні"]},
                {text: '8', callback_data: enums_module.DENOMINATION_CALLBACK_LIST["8. Церква християн віри євангельської-п'ятидесятників в Україні"]}],

            [{text: '9', callback_data: enums_module.DENOMINATION_CALLBACK_LIST["9. Українська Лютеранська Церква"]},
                {text: '10', callback_data: enums_module.DENOMINATION_CALLBACK_LIST["10. Українська Уніонна Конференція Церкви адвентистів сьомого дня"]},
                {text: '11', callback_data: enums_module.DENOMINATION_CALLBACK_LIST["11. Закарпатська реформатська Церква"]},
                {text: '12', callback_data: enums_module.DENOMINATION_CALLBACK_LIST["12. Центр харизматичних християнських Церков України (Повного Євангелія)"]},],

        ]
    })
}

const begin_button_Y = {
    reply_markup: JSON.stringify({
        inline_keyboard:[
            [{text: enums_module.REGIONS["1. Київська"], callback_data: enums_module.REGIONS["1. Київська"]},
                {text: enums_module.REGIONS["3. Кіровоградська"], callback_data: enums_module.REGIONS["3. Кіровоградська"]},
                {text: enums_module.REGIONS["6. Одеська"], callback_data: enums_module.REGIONS["6. Одеська"]},
            ],

            [{text: enums_module.REGIONS["12. Дніпропетровська"], callback_data: enums_module.REGIONS["12. Дніпропетровська"]},
                {text: enums_module.REGIONS["8. Сумська"], callback_data: enums_module.REGIONS["8. Сумська"]},
                {text: enums_module.REGIONS["2. Черкаська"], callback_data: enums_module.REGIONS["2. Черкаська"]},
            ],

            [{text: enums_module.REGIONS["4. Запорізька"], callback_data: enums_module.REGIONS["4. Запорізька"]},
                {text: enums_module.REGIONS["5. Миколаївська"], callback_data: enums_module.REGIONS["5. Миколаївська"]},
                {text: enums_module.REGIONS["7. Полтавська"], callback_data: enums_module.REGIONS["7. Полтавська"]},
            ],

            [{text: enums_module.REGIONS["9. Харківська"], callback_data: enums_module.REGIONS["9. Харківська"]},
                {text: enums_module.REGIONS["10. Херсонська"], callback_data: enums_module.REGIONS["10. Херсонська"]},
                {text: enums_module.REGIONS["11. Чернігівська"], callback_data: enums_module.REGIONS["11. Чернігівська"]},
            ],
        ]
    })
}

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
    return{
        main_switch: function(
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
            if(global_vars_allusers[chatId]== undefined){
                console.log('global_vars_allusers[chatId].last_callback_pressed_button ')
                bot.sendMessage(chatId, "Почніть бота з початку, будь ласка, => /start");
                return
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

            case 'X_begin':
                console.log('case X_begin: START from switch')
                
                global_vars_allusers[chatId].last_callback_pressed_button = '0_begin';

                //show 8 buttons conferences
                bot.sendMessage(chatId, `➡️ 1. Виберіть деномінацію:
                
⛪️️⛪️⛪️ Католицькі

1  | Римсько-католицька церква в Україні;

2  | Українська греко-католицька церква;

3  | Мукачівська греко-католицька єпархія.

⛪⛪️⛪️️ Православні

4  | Православна церква України;

5  | Українська православна церква (Московський патріархат);

6  | Українська єпархія Вірменської апостольської церкви.

⛪⛪️⛪️️ ️Протестантські

7  | Церква євангельських християн-баптистів в Україні;

8  | Церква християн віри євангельської-п'ятидесятників в Україні;

9  | Українська Лютеранська Церква

10 | Українська Уніонна Конференція Церкви адвентистів сьомого дня;

11 | Закарпатська реформатська Церква;

12 | Центр харизматичних християнських Церков України (Повного Євангелія).

`, begin_button_X);
                
                // console.log('last_inputed_text_from_user: ', last_inputed_text_from_user)
                console.log('last_callback_pressed_button: ', global_vars_allusers[chatId].last_callback_pressed_button)
                console.log('case X_begin: END from switch')

                //next: wait pressed text (conferencename)
                break;

            case enums_module.DENOMINATION_CALLBACK_LIST["1. Римсько-католицька церква в Україні"]:
            case enums_module.DENOMINATION_CALLBACK_LIST["2. Українська греко-католицька церква"]:
            case enums_module.DENOMINATION_CALLBACK_LIST["3. Мукачівська греко-католицька єпархія"]:
            case enums_module.DENOMINATION_CALLBACK_LIST["4. Православна церква України"]:
            case enums_module.DENOMINATION_CALLBACK_LIST["5. Українська православна церква (Московський патріархат)"]:
            case enums_module.DENOMINATION_CALLBACK_LIST["6. Українська єпархія Вірменської апостольської церкви"]:
            case enums_module.DENOMINATION_CALLBACK_LIST["7. Церква євангельських християн-баптистів в Україні"]:
            case enums_module.DENOMINATION_CALLBACK_LIST["8. Церква християн віри євангельської-п'ятидесятників в Україні"]:
            case enums_module.DENOMINATION_CALLBACK_LIST["9. Українська Лютеранська Церква"]:
            case enums_module.DENOMINATION_CALLBACK_LIST["10. Українська Уніонна Конференція Церкви адвентистів сьомого дня"]:
            case enums_module.DENOMINATION_CALLBACK_LIST["11. Закарпатська реформатська Церква"]:
            case enums_module.DENOMINATION_CALLBACK_LIST["12. Центр харизматичних християнських Церков України (Повного Євангелія)"]:
                console.log('case DENOMINATION_CALLBACK_LIST: START from switch')

                global_vars_allusers[chatId].last_callback_pressed_button = 'denom_setted';
                global_vars_allusers[chatId].data_user_quiz["0. denomination"] = callback_data;

                //show 8 buttons conferences
                const ifSDA = callback_data==enums_module.DENOMINATION_CALLBACK_LIST["10. Українська Уніонна Конференція Церкви адвентистів сьомого дня"];
                if(ifSDA) {
                    bot.sendMessage(chatId, "➡️ 1. Виберіть конференцію:", begin_button_1);
                }else{
                    bot.sendMessage(chatId, "➡️ 1. Виберіть область:", begin_button_Y);
                }

                // console.log('last_inputed_text_from_user: ', last_inputed_text_from_user)
                console.log('last_callback_pressed_button: ', global_vars_allusers[chatId].last_callback_pressed_button)
                console.log('case DENOMINATION_CALLBACK_LIST: END from switch')

                //next: wait pressed text (conferencename)
                break;

                /**SDA**/
            case enums_module.conferences.Буковинська:
            case enums_module.conferences.Дніпровська:
            case enums_module.conferences.Західна:
            case enums_module.conferences.Київська:
            case enums_module.conferences.Подільська:
            case enums_module.conferences.Південна:
            case enums_module.conferences['Східно-Дніпровська']:
            case enums_module.conferences.Центральна:
                /**ohther regions*/
            case enums_module.REGIONS["1. Київська"]:
            case enums_module.REGIONS["2. Черкаська"]:
            case enums_module.REGIONS["3. Кіровоградська"]:
            case enums_module.REGIONS["4. Запорізька"]:
            case enums_module.REGIONS["5. Миколаївська"]:
            case enums_module.REGIONS["6. Одеська"]:
            case enums_module.REGIONS["7. Полтавська"]:
            case enums_module.REGIONS["8. Сумська"]:
            case enums_module.REGIONS["9. Харківська"]:
            case enums_module.REGIONS["10. Херсонська"]:
            case enums_module.REGIONS["11. Чернігівська"]:
            case enums_module.REGIONS["12. Дніпропетровська"]:

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
                                [{text: ' 1 ', callback_data: '1day'},
                                {text: '2', callback_data: '2day'},
                                {text: '3', callback_data: '3day'},
                                {text: '4', callback_data: '4day'},
                                {text: '5', callback_data: '5day'},
                                {text: '6', callback_data: '6day'}],
                    
                                [{text:'  7  ', callback_data: '7day'},
                                {text: '  8  ', callback_data: '8day'},
                                {text: '  9  ', callback_data: '9day'},
                                {text: '  10  ', callback_data: '10day'},
                                {text: '  11  ', callback_data: '11day'},
                                {text: '  12  ', callback_data: '12day'}],
                    
                                [{text:'   13   ', callback_data: '13day'},
                                {text: '   14   ', callback_data: '14day'},
                                {text: '   15   ', callback_data: '15day'},
                                {text: '   16   ', callback_data: '16day'},
                                {text: '   17   ', callback_data: '17day'},
                                {text: '   18   ', callback_data: '18day'}],
                    
                                [{text: '19', callback_data: '19day'},
                                {text: '20', callback_data: '20day'},
                                {text: '21', callback_data: '21day'},
                                {text: '22', callback_data: '22day'},
                                {text: '23', callback_data: '23day'},
                                {text: '24', callback_data: '24day'}],
                    
                                [{text: '25', callback_data: '25day'},
                                {text: '26', callback_data: '26day'},
                                {text: '27', callback_data: '27day'},
                                {text: '28', callback_data: '28day'},
                                {text: '29', callback_data: '29day'},
                                {text: '30', callback_data: '30day'}],
                    
                                [{text: '31', callback_data: '31day'}],
                            ]
                        })
                    } 
                    
    
                    bot.sendMessage(chatId, `➡️ 3.2. Тепер день`, options_days)
                    // console.log('last_inputed_text_from_user: ', last_inputed_text_from_user)
                    console.log('last_callback_pressed_button: ', global_vars_allusers[chatId].last_callback_pressed_button)
                    console.log('end case from switch 1_1_begin_answered');
                    break;



            case '1day':case '2day':case '3day':case '4day':case '5day':
            case '6day':case '7day':case '8day':case '9day':case '10day':
            case '11day':case '12day':case '13day':case '14day':case '15day':
            case '16day':case '17day':case '18day':case '19day':case '20day':
            case '21day':case '22day':case '23day':case '24day':case '25day':
            case '26day':case '27day':case '28day':case '29day':case '30day':
            case '31day':
            case '3_begin_answered':
                console.log('case 3_begin_answered: START from switch')
                global_vars_allusers[chatId].data_user_quiz['3. date'] = global_vars_allusers[chatId].data_user_quiz['3. date'] + ', ' + callback_data.slice(0, -1); //month + ' ' + days
                console.log('data_user_quiz: ', global_vars_allusers[chatId].data_user_quiz)
                //---------------------------------------------
              
                console.log('4_begin:');
                global_vars_allusers[chatId].last_callback_pressed_button = '4_begin';
                //тут може бути багато повідомлень. Масив повідомлень
                bot.sendMessage(chatId, `➡️ 4. Опишіть коротко подію. Одним повідомленням, без виправлень`)//. Або напишіть нове (бо зараховано буде лиш останнє повідомлення)
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
                const main_dir = '_images_and_videos';
                var denomination_dir = global_vars_allusers[chatId].data_user_quiz["0. denomination"];
                var conference_dir = global_vars_allusers[chatId].data_user_quiz["1. conference"];
                var town_folder_old = global_vars_allusers[chatId].data_user_quiz["2. town"];
                var town_folder = town_folder_old.replace(/[/\\?%*:|"<>]/g, '-');
                var downloadDir = './' + main_dir + '/' + denomination_dir + '/'+ conference_dir + '/' + town_folder;
                global_vars_allusers[chatId].data_user_quiz.download_dir = downloadDir;

                var date_Now = new Date().toISOString();
                global_vars_allusers[chatId].data_user_quiz["_. upload date-time"] = date_Now.replace('T'," ");

                //prepare (create) folder for downloading files
                if (!fs.existsSync(downloadDir)){
                    fs.mkdirSync(downloadDir, { recursive: true });
                }

                //save data to CSV
                const csv_master = require('../downloader/CVS_master') ( global_vars_allusers );
                csv_master.save_data_toCSV(msg, chatId);

                bot



                bot.sendMessage(chatId, `➡️ 7. Тепер можете передати мені фото/відео
                
                Дочекайтесь, будь ласка, поки всі фото/відео, відео не будуть передані повністю, перед натисненням кнопки підтвердження.
                
                Якщо ви завершили передачу фото/відео, запустіть команду /finish (в меню)`)
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