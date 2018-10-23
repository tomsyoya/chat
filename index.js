const http = require('http');
const express = require('express');
const ejs  = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/rooms', (req, res) => {

  var data = {
          rooms: [
              {name: "<h1>リンゴ</h1>"},
              {name: "<h2>バナナ</h2>"},
              {name: "<h3>スイカ</h3>"}
          ]
      };
  res.render("./rooms.ejs", data);

});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/views/register.html');
});

app.use(bodyParser());
app.post('/register', function(req, res,next){

  var name = req.body.name;
  var password = req.body.password;

  // MongoDB へ 接続
  client.connect((error, client) => {

    const db = client.db('chat');

    // コレクションの取得
    var collection = db.collection("chat");

    // コレクションにドキュメントを挿入
    collection.insertOne({
        "name": name,
        "password": password
    }, (error, result) => {
        console.log("ユーザの登録完了");
        client.close();
    });
  });
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/login', function(req, res, next){
  var name = req.body.name;
  var password = req.body.password;

  // MongoDB へ 接続
  client.connect((error, client) => {

    const db = client.db('chat');

    // コレクションの取得
    var collection = db.collection("users");

    // ユーザを取得
    collection.find({name: name,password: password}).toArray((error, documents)=>{
	  if (!documents || documents.length === 0) {
		  res.redirect('/views/login?login_error')
	  }
      for (var document of documents) {
          var name = document.name;
          var userExists = name.length;

          // ユーザが存在するかしないかの分岐
          if (userExists) {
              //ユーザが存在する
              console.log("ユーザが存在する");
              res.sendFile(__dirname + '/views/index.html');
          } else {
             //ユーザが存在しない
             console.log("ユーザが存在しない");
             res.sendFile(__dirname + '/views/register.html');
          }
        }
    });

  });

});

app.post('/rooms', function(req, res, next){

  var data = {
          rooms: [
              {room: "<h1>リンゴ</h1>"},
              {room: "<h2>バナナ</h2>"},
              {room: "<h3>スイカ</h3>"}
          ]
      };
  res.render("./rooms.ejs", data);
  // MongoDB へ 接続
  //client.connect((error, client) => {

  //  const db = client.db('chat');

    // コレクションの取得
  //  var collection = db.collection("rooms");

  //  collection.find().toArray((error, rooms)=>{
  //	  if (!rooms || rooms.length === 0) {
  		//  res.redirect('/views/login?login_error')
  //	  }else{
  //      res.render("./rooms.ejs", data);
      //  res.render('/views/rooms',rooms);
  //    }
  //  });
  //});
});



const server = http.createServer(app).listen(port);

const io = require("socket.io").listen(server)

const userHash = {}

io.sockets.on("connection", (socket) => {

	// 接続先ユーザーを保存し、他ユーザーへ入室を通知
	socket.on("connected", (name) => {
		var msg = name + "が入室しました"
		userHash[socket.id] = name
		io.sockets.emit("publish", {value: msg})
	})

	socket.on("publish", (data) => {
		io.sockets.emit("publish", {value: data.value})
	})

	//接続元ユーザーを削除、退室したことを他ユーザーへ通知
	socket.on("disconnect", () => {
		if(userHash[socket.id]){
			var msg = userHash[socket.id] + "が退出しました"
			delete userHash[socket.id]
			io.sockets.emit("publish", {value: msg})
		}
	})
})

console.log('Server running at http://127.0.0.1:8080/');
