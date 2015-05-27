// for menu after Jumbotron
$(function(){
    //Handles menu drop down
    $('.dropdown-menu').find('form').click(function (e) {
        e.stopPropagation();
    });
    Events.all();
    View.init();
});

function View() {};
// post event form submit event listener
View.init = function() {
	$("#event-form").on("submit", function(e){
		e.preventDefault();
		var eventParams = $(this).serialize();
		Events.create(eventParams);
		$("#event-form")[0].reset();
		$("#place-input").focus();
	});
}

View.render = function(items, parentId, templateId) {
	var template = _.template($("#" + templateId).html());
	$("#" + parentId).html(template({collection: items}));
};

function Events() {};

// parse and render
Events.all = function() {
	$.get("/events", function(res){
		var events = JSON.parse(res);
		View.render(events, "render-group", "events-template");
	});
}

Events.create = function(eventParams) {
	$.post("/events", eventParams).done(function(res){
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

Events.update = function(e, form){
	e.preventDefault();
	var $form = $(form);
	var eventId = $form.data().eventid;
	var newPlace = $form.find("input[name='place']").val();
	var newTime = $form.find("input[name='time']").val();
	$.post("/update", {id: eventId, place: newPlace, time: newTime})
	.done(function(res){
		Events.all();
	});
};





