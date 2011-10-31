//prep socket.io

var socket = io.connect('http://localhost:3000/user');

socket.on('result', function(data) {
  $('div#terminal').append('<pre>'+ data +'</pre>');
})

$(document).ready(function() {
  $('input#locate').click(function() { 
	
	//send user request to server
	  var out = $('input#filename').val();
    socket.emit('locate', { data: out });	
  });

  $('input#clearterm').click(function () {
	  $('pre').remove();
  });
});
