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

//TODO: calculate avarage analytics on same second
router.get("/", function (req, res, next) {
   const getFilter = () => {
      const filter = {
         date: {}
      }
      if(req.query.startDate)
         filter.date.$gte = new Date(req.query.startDate);
      else {
         const date = new Date();
         date.setMinutes(date.getMinutes() - 30)
         filter.date.$gte = date;
      }

      filter.date.$lte = (req.query.endDate ? new Date(req.query.endDate) : new Date);
      return filter;
   }
   
	// Analytic.find(getFilter()).select("dom_load window_load ttfb fcp date")
	Analytic.find(getFilter()).select("dom_load window_load ttfb fcp date resources")
		.sort({ date: -1 })
		.then((r) => {
			res.json(r);
		})
		.catch((err) => {
			res.status(500).send({err: err.message});
		});
});

module.exports = router;
