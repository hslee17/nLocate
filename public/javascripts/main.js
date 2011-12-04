//prep socket.io

var socket = io.connect('http://itin.ly:3000/user');

socket.on('result', function(data) {
  $('div#terminal').append('<pre>'+ data +'</pre>');
});

function switchTab(tab) {
  var selected_tab = $('ul.tabs').find('.selected');
  selected_tab.removeClass('selected');
  tab.addClass('selected');
  //$("div#logs_container").children("div:not(.logs_hidden)").addClass('logs_hidden');
  //$("div#logs_container > div#"+stream.parent().attr('id')+"_logs").removeClass('logs_hidden');
}

$(document).ready(function() {
  $('input#locate').click(function() { 
	
	//send user request to server
     var out = $('input#filename').val();

     if(out != "") {
       socket.emit('locate', { data: out });	
     }
     else {
       alert("locate: no pattern to search for specified");
     }
  });

  $('input#clearterm').click(function () {
	  $('pre').remove();
  });

  // Tab switching
  $('ul.tabs > div#streams > li:last > a').click(function() {
    if ((!$(this).hasClass('selected')) ) {
      var stream = $(this);
      switchToStream(stream);
    }
  });

  // Handle tab clicks for all / alerts
  $('ul.tabs > li > a').click(function() {
    if((!$(this).hasClass('selected')) ) {
      var tab = $(this);
      if (tab.attr('id') != 'add_tab') {
        switchTab(tab);
      }
    }
  });
});
