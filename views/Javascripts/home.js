// for menu after Jumbotron
$(function() {
    //Handles menu drop down
    $('.dropdown-menu').find('form').click(function(e) {
        e.stopPropagation();
    });
    Events.all();
    View.init();
});

var successfulLogin = function () {
    $('#myModal').slideUp().fadeOut(300);
    $('div.modal-backdrop').fadeOut(500);
    localStorage.setItem('isMember', true);
    Events.all();
    View.init();
};

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

function View() {};
// post event form submit event listener
View.init = function() {
    $("#event-form").on("submit", function(e) {
        e.preventDefault();
        var eventParams = $(this).serialize();
        Events.create(eventParams);
        $("#event-form")[0].reset();
        $("#place-input").focus();
    });
}

View.render = function(items, parentId, templateId) {
    var template = _.template($("#" + templateId).html());
    $("#" + parentId).html(template({
        collection: items
    }));
};

function Events() {};

// parse and render
Events.all = function() {
    $.get("/events", function(res) {
        var events = JSON.parse(res);
        View.render(events, "render-group", "events-template");
    });
}

Events.create = function(eventParams) {
    $.post("/events", eventParams).done(function(res) {
        Events.all();
    });
}

Events.delete = function(event) {
    var eventId = $(event).data().id;
    $.ajax({
        url: '/events/' + eventId,
        type: 'DELETE',
        success: function(res) {
            Events.all();
        }
    });
}

