const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

// const Messages = require("./lib/Messages");

let colorData = {
	color: "#343434",
	person: "server"
};

app.get("/", (req, res) => {
	res.end("Merhaba Socket.IO");
});

io.on("connection", (socket) => {
	socket.emit("init-color", colorData);
	console.log("new user");

	socket.on("change-color", (newColorData) => {
		colorData = newColorData;
		socket.broadcast.emit("new-color", newColorData);
	});
	/* Messages.list((data) => {
		console.log(data);
		socket.emit("message-list", data);
	});

	socket.on("new-message", (message) => {
		console.log(message);
		Messages.upsert({ message });

		socket.broadcast.emit("receive-message", message);
	}); */

	socket.on("disconnect", () => console.log("a user disconnected"));
});

http.listen(4000, () => {
	console.log("listening on *:4000");
});
