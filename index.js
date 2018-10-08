const http = require('http');
const express = require('express');
const app = express();
const port = 8080;

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/login', (req, res) => {
  res.send('<h1>login</h1><a href="chat">chatへのリンク</a>');
});

app.post('/register', function(req, res,next){
  var name = req.body.name;
  var password = req.body.password;

  var MongoClient = require("mongodb").MongoClient;

  // 接続文字列
  var url = "mongodb://localhost:27017/sampledb";

  // MongoDB へ 接続
  MongoClient.connect(url, (error, db) => {
    var collection;

    // コレクションの取得
    collection = db.collection("products");

    // コレクションにドキュメントを挿入
    collection.insertOne({
        "name": name,
        "password": password
    }, (error, result) => {
        db.close();
    });
  });
});
app.post('/login', function(req, res,next){
  var name = req.body.name;
  var password = req.body.password;

  var MongoClient = require("mongodb").MongoClient;

  // 接続文字列
  var url = "mongodb://localhost:27017/sampledb";

  // MongoDB へ 接続
  MongoClient.connect(url, (error, db) => {
    var collection;

    // コレクションの取得
    collection = db.collection("products");

    // コレクション中で条件に合致するドキュメントを取得
    collection.find({name: name,pasword: pasword}).toArray((error, documents)=>{
        for (var document of documents) {
            console.log(document.name);
        }
    });

  });
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

client.connect(err => {
	if (err) {
		console.log(err);
	} else {
		console.log('DB connection established');
	}
	client.close(); // 今はDB疎通確認のみ。
});

console.log('Server running at http://127.0.0.1:8080/');
