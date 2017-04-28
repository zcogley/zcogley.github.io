

// ----------MODEL---------
var model = {

  events: [],
  completes: [],

};

// ----------VIEW----------
function render() {
  $('#instructions').empty();
  $('#events').empty();

  // render todo items
  model.events.forEach(function(event) {
    // creates each ToDo item element
    var eventElement = $('<li></li>')

    var buttonElement = $('<button></button>')
      .text(event.event)
      .attr('class', 'btn btn-primary')
      .click(function() {
        var index = model.events.indexOf(event);
        var done = model.events.splice(index, 1);
        model.completes.push(done[0]);
        render();
      });

    eventElement.append(buttonElement);

    // code for old way with checkboxes
    //   .text(event.event + ' ');
    // // creates a corresponding checkbox for removing event
    // var radioElement = $('<input>').attr({
    //   type: 'checkbox'
    // });
    //   radioElement.click(function() {
    //     // function removes event on checkbox click
    //
    //     // gets the index of the event to add to completes
    //     var index = model.events.indexOf(event);
    //
    //     // done array temporarily holds event removed
    //     var done = model.events.splice(index, 1);
    //
    //     // adds done event to completes array
    //     model.completes.push(done[0]);
    //
    //     render();
    //   });
    //
    // eventElement.append(radioElement);


    $('#events').append(eventElement);
  });

  // clears the eventbox
  $('#eventbox').val('');

  // gives focus to the eventbox
  $('#eventbox').focus();

  // clears the complete area
  $('#completes').empty();

  // renders complete items
  model.completes.forEach(function(complete) {
    // creates each complete item element
    var completeElement = $('<li></li>')
    var btnElement = $('<button></button>')
      .text(complete.event)
      .attr('class', 'btn btn-danger')
      .click(function() {
        var idx = model.completes.indexOf(complete);
        var did = model.completes.splice(idx, 1);
        model.events.push(did[0]);
        render();

      })
    completeElement.append(btnElement);


    // // creates a corresponding checkbox for deleting event
    // var radElement = $('<input>').attr({
    //   type: 'checkbox'
    // });
    //
    // completeElement.append(radElement);

    $('#completes').append(completeElement);

  });

  var clearButton = $('<button></button>')
    .text('ToDone')
    .attr('class', 'btn')
    .click(function() {
      model.completes = [];
      render();
    });
  $('#clearall').empty();
  $('#clearall').append(clearButton);

}

// adds a new event
function addNewEvent(event){
  model.events.push({event});
}


// ---------DOM EVENT HANDLERS---------
$(document).ready(() => {
  // when the textbox content changes, updates the .currentEvent
  // property of the model
  $('#eventbox').on('input', () => {
    model.currentEvent = $('#eventbox').val();
  });

  // when the form is submitted
  $('#add-event-form').submit((evt) => {
    // don't refresh the page
    evt.preventDefault();

    // add a new event from whatever typed
    addNewEvent(model.currentEvent);

    // renders page
    render();
  });

  // Makes Events and Completes Sortable
  var el = document.getElementById('events', 'completes');
  var sortable = Sortable.create(el);
  var ell = document.getElementById('completes');
  var sortable = Sortable.create(ell);
})
