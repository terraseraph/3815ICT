var http = require('http');
var path = require('path');
var async = require('async');
var socketio = require('socket.io');
var express = require('express');
const bodyParser = require('body-parser')
var app = express();
var server = http.createServer(app);
var io = socketio.listen(server);


const routes = require('./controllers/routes')



app.use(express.static(path.resolve(__dirname, 'views')));
app.use(express.static(__dirname+'/node_modules'));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.json());
app.use(express.urlencoded());

var messages = [];
var sockets = [];



app.get('/test', routes.test_route)

app.get('/get_data', routes.get_data)

app.post('/login', routes.send_login)


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Server", addr.address + ":" + addr.port);
});


