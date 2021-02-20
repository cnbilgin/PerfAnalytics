const express = require("express");
const Analytic = require("../db/analytic");
const router = express.Router();

router.post("/", function (req, res) {
	let model = req.body;
	if (typeof model === "string") {
		model = JSON.parse(model);
	}

	model.date = new Date().toString();

	new Analytic(model)
		.save()
		.then((analytic) => {
			res.json({
				message: "analytic saved",
				data: analytic,
			});
		})
		.catch((err) => {
			res.status(500);
			res.json({
				message: "analytic not saved",
				error: err,
			});
		});
});

router.get("/", function (req, res, next) {
   const getFilter = () => {
      // const filter = {
      //    date: {}
      // }
      // if(req.query.min)
      //    filter.date.$qte = new Date(req.query.min).toString();
      // else {
      //    const date = new Date();
      //    date.setMinutes(date.getMinutes() - 30)
      //    filter.date.$qte = date.toString();
      // }

      // filter.date.$lte = (req.query.max ? new Date(req.query.max) : new Date).toString();
      // return filter;

      return {};
   }
   
	Analytic.find(getFilter()).select("dom_load window_load ttfb fcp date")
		.sort({ date: -1 })
		.then((r) => {
			res.json(r);
		})
		.catch((err) => {
			res.status(500).send({err: err.message});
		});
});

module.exports = router;
