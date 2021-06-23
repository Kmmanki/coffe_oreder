var express = require("express")
var app = express();
app.use(express.static('public'))
var http = require("http").createServer(app);
var io = require('socket.io')(http);



var port = 3000;
http.listen(port, () => {
  console.log("listening on *:" + port);
});

coffe_menu = new Map();
history_menu = new Map();




io.on('connection', function (socket) {
  console.log(socket.id, 'Connected');
  socket.emit('order_response', coffe_menu);
  io.sockets.emit('history_menu', history_menu);

  //  socket.emit('coffe_menu', `${socket.id} 연결 되었습니다.`);
  
  socket.on('order_coffe', function (data) {
    // console.log(Object.keys(data));
    keys = Object.keys(data)[0]
    menu = data[keys]
    
    coffe_menu[keys] = menu
    console.log(coffe_menu)
    io.sockets.emit('order_response', coffe_menu);
  });

  socket.on('del_order', function (name) {
    delete coffe_menu[name]
    console.log("=====")

    console.log(coffe_menu)
    io.sockets.emit('order_response', coffe_menu);
  });

  socket.on('end_order', function (msg) {
    
    keys = Object.keys(coffe_menu)
    console.log(keys.length)
    for(i =0 ; i < keys.length; i++){
      history_menu[keys[i]] = coffe_menu[keys[i]]
    }
    coffe_menu = new Map()


    console.log("주문종료")
    io.sockets.emit('order_response', coffe_menu);
    io.sockets.emit('history_menu', history_menu);

  });

  socket.on('del_history_order', function (name) {
    delete history_menu[name]

    io.sockets.emit('history_menu', history_menu);

  });
});
