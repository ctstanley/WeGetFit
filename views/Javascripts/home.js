// for menu after Jumbotron
$(document).ready(function(){
    //Handles menu drop down
    $('.dropdown-menu').find('form').click(function (e) {
        e.stopPropagation();
    });
    $('body').css({
    				'background-image' : 'url(https://placekitten.com/1350/3000)'
    })


});