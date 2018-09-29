var fs = require("fs")
var http = require("http")

// httpサーバー構築
var server = http.createServer(function(req, res){
	res.writeHead(200, {"Content-Type":"text/html"})
	var out = fs.readFileSync("./index.html", "utf-8")
	res.end(out)
})

var io = require("socket.io").listen(server)

var userHash = {}

io.sockets.on("connection", function(socket){

	// 接続先ユーザーを保存し、他ユーザーへ入室を通知
	socket.on("connected", function(name){
		var msg = name + "が入室しました"
		userHash[socket.id] = name
		io.socket.emit("publish", {value: msg})
	})

	socket.on("publish", function(data){
		io.socket.emit("publish", {value: data.value})
	})

	//接続元ユーザーを削除、退室したことを他ユーザーへ通知
	socket.on("disconnect", function(){
		if(userHash[socket.id]){
			var msg = userHash[socket.id] + "が退出しました"
			delete userHash[socket.id]
			io.socket.emit("publish", {value: msg})
		}
	})
})