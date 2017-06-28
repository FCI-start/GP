/**
 * Created by Ahmed Shaban on 19/06/2017.
 */
(function () {

    var pop_up_div = document.getElementById('pop_up_add_table');
    var cover_div = document.getElementById('pop_up_add_table_cover');

    var pop_up_link = document.getElementById('pop_up_link');
    pop_up_link.addEventListener('click',showPopUp,false);
    cover_div.addEventListener('click',hidePopUp,false);


    function showPopUp()
    {
        cover_div.style.display="block";
        pop_up_div.style.display="block";
    }

    function hidePopUp()
    {
        pop_up_div.style.display="none";
        cover_div.style.display="none";
    }


    window.DatabasePopupFunction = window.DatabasePopupFunction || {};
    window.DatabasePopupFunction.showPopUp = showPopUp;

})();