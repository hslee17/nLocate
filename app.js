#!/usr/bin/env node

/**
 * Module dependencies.
 */

require('chomp');
var express = require('express');


var app = module.exports = express.createServer();
var io  = require('socket.io').listen(app);

// Configuration
//socket.io log level
io.configure(function () {
	io.set('log level', 1);
});

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'secret' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'nLocate'
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

// agent logic


var agent = io
  .of('/agent')
  .on('connection', function(socket) {
    console.log('agent connected');

  //we got data back from the agent. TODO - display
  socket.on('result', function(data) {
	  console.log('got result. forwarding to user');
	  user.emit('result', data);
  })
});

var user = io
  .of('/user')
  .on('connection', function(socket) {
	console.log('user connected');
	
	socket.on('locate', function(data) {
	  agent.emit('locate', {result: data});
	})
})

/*agent.on('result', function(data) {
  //console.log(data.result.args);
  console.log('wtf');
  //console.log(data.args.toString());
})*/



  



