jQuery('document').ready(function($){

    var menuBtn = $('.menu-icon'),
        menu = $('.navigation ul'),
        dropBtn = $('.dropbtn'),
        dropdownContent = $('.dropdown-content');

    menuBtn.click(function() {

        if (menu.hasClass('show') ) {
            menu.removeClass('show');
        }
        else {
            menu.addClass('show');
        }
    });

    dropBtn.click(function() {

        if (dropdownContent.hasClass('show') ) {
            dropdownContent.removeClass('show');
        }
        else {
            dropdownContent.addClass('show');
        }
    });

});