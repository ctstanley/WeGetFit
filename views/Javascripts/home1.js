// for menu after Jumbotron
$(function() {
    //Handles menu drop down
    $('.dropdown-menu').find('form').click(function(e) {
        e.stopPropagation();
    });
    checkLocalStorage();
});
var checkLocalStorage = function() {
    var $loginModal = $loginModal || $('#myModal');
    if (localStorage.isMember === undefined) {
        var modaloptions = {
                backdrop: "static",
                show: true
            }
        window.setTimeout(function() {
            $loginModal.modal(modaloptions);
        }, 1000);
    } else {
        successfulLogin();
    };
};