module.exports = {

    checkByCallback: function(
            callback_query_button_consts,
            last_callback_pressed_button
    ){
        switch(last_callback_pressed_button){

            case callback_query_button_consts['0_begin']:
                console.log('0_begin: роспочато анкетування')
                
                break;
            
            case callback_query_button_consts['1_1_begin']:
                console.log('1 1 _begin: роспочато анкетування')

                break;
            
            case callback_query_button_consts['2_begin']:
                console.log('2_begin:')

                break;
        
            case callback_query_button_consts['3_begin']:
                console.log('3_begin:')

                break;

            case callback_query_button_consts['4_begin']:
                console.log('4_begin:')

                break;    


            case callback_query_button_consts['5_begin']:
                console.log('5_begin:')

                break;  


            case callback_query_button_consts['6_begin_no']:
            case callback_query_button_consts['6_begin_yes']:
                console.log(data)

                break;  

            case callback_query_button_consts['7_begin']:
                console.log('7_begin:')

                break;  

            default:

                

            }
    },

}