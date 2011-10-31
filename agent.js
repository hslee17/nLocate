#!/usr/bin/env node

require.paths.unshift(__dirname + '/../socket.io-client/lib/');

require('chomp');

var io = require('socket.io-client'); //.Socket('http://localhost:8080');;
var agent =  io.connect('http://localhost:3000/agent');

var util = require('util');

//connect as agent
agent.on('connect', function() {
  console.log('connected');
});

agent.on('locate', function(data) {

	var spawn = require('child_process').spawn,
      locate = spawn('locate', [data.result.data]);
	
		locate.stdout.on('data', function (data) {
			
			//console.log(toarray(data).toString());
		  agent.emit('result', data.toString().chomp());
		});

		locate.stderr.on('data', function (data) {
		  console.log('stderr: ' + data);
		});

		locate.on('exit', function (code) {
		  console.log('child process exited with code ' + code);
		});
});





