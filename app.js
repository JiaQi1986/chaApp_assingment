var express = require('express');
var app = require('express')();

var server = require('http').createServer(app);
var io = require('socket.io')(server);

var count = 0;



io.on('connection', function(socket){
  //socket.emit('request', /* */); // emit an event to the socket
  //io.emit('broadcast', /* */); // emit an event to all connected sockets

  // setInterval(function(){
  //   io.emit('msg', 'hello world'+(new Date()))
  // },1000);

  socket.on('login', function(data){
    socket.username = data;
    console.log(data + ' connected');
    count++;
    io.emit('count', count);
  });

  socket.on('send', function(data){
    // console.log('From server'+data);
    io.emit('msg',{user: socket.username, msg: data});
  }); // listen to the event
    socket.on('disconnect', function(){
      count--;
      io.emit('count', count);
    });
});


app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World')
});

app.get('*', function (req, res) {
  res.sendFile(__dirname+'/views/index.html')
});
//console.log(__dirname+'/views/index.html')

server.listen(3000);
