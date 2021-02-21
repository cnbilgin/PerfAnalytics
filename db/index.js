const mongoose = require("mongoose");

module.exports = () => {
	mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true });
	const db = mongoose.connection;

	db.on("open", () => {
		console.log("MongoDB: Connected");
	});
	db.on("error", (err) => {
		console.log("MongoDB: Error", err);
	});
};
