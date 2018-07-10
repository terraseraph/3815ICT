//Using
const http = require('http');
const path = require('path');
const async = require('async');
const socketio = require('socket.io');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

//Controllers
// const routes = require('./controllers/routes')


//Models


//Views


//Route configure
app.use(express.static(path.resolve(__dirname, 'views')));
app.use(express.static(__dirname+'/node_modules'));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.json());
app.use(express.urlencoded());

var messages = [];
var sockets = [];


//Routes
// app.get('/test', routes.test_route)

// app.get('/get_data', routes.get_data)

// app.post('/login', routes.send_login)


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server", addr.address + ":" + addr.port);
});


