const express = require("express");
const analyticService = require("../services/analytics.service");
const router = express.Router();

router.post("/", function (req, res) {
	let model = req.body;
	if (typeof model === "string") {
		model = JSON.parse(model);
	}

	model.date = new Date().toString();

	analyticService.create(model).then(r=> {
		res.json(r);
	}).catch(err => {
		res.status(500);
		res.json(err)
	})
});


router.get("/", function (req, res) {
	analyticService.get({
		startDate: req.query.startDate,
		endDate: req.query.endDate
	}).then((r) => res.json(r)).catch(err => {
		res.status(500).send(err);
	})
});

module.exports = router;
