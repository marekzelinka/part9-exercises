import express from "express";

const app = express();
const PORT = process.env.PORT || 3001;

app.get("/ping", (_req, res) => {
	res.send("pong");
});

app.get("/hello", (_req, res) => {
	res.send("Hello Full Stack!");
});

app.listen(PORT, () => {
	console.log(`🚀 Server runnning on port ${PORT}`);
});
