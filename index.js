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