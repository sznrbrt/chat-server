var socketio = require('socket.io');
var userCount = 0;
var io;

module.exports.listen = function(app){
    io = socketio.listen(app)


    io.on('connection', function(socket){
      userCount++;
      io.emit('usercount', userCount);
      console.log('users#:', userCount);
      console.log('Client connected');

      socket.on('chat message', function(msg){
        io.emit('chat message', msg);
      });


      socket.on('disconnect', () => {
        userCount--;
        io.emit('usercount', userCount);
        console.log('Client disconnected')
        console.log('users#:', userCount);
      });
    });

    return io
}
