const Analytic = require("../db/analytic");

const create = (model) => {
	return new Promise((resolve, reject) => {
		new Analytic(model)
			.save()
			.then((analytic) => {
				resolve({
					message: "analytic saved",
					data: analytic,
				});
			})
			.catch((err) => {
				reject({
					message: "analytic not saved",
					error: err,
				});
			});
	});
};


//TODO: calculate avarage analytics on same second
const get = (filter) => {
	const getFilter = () => {
		const result = {
			date: {},
		};
		if (!filter.startDate && !filter.endDate) {
			const date = new Date();
			date.setMinutes(date.getMinutes() - 30);
			result.date.$gte = date;
			result.date.$lte = new Date();
		} else {
			if (filter.startDate)
				result.date.$gte = new Date(filter.startDate);

			if (filter.endDate) result.date.$lte = new Date(filter.endDate);
		}
		return result;
	};

	return new Promise((resolve, reject) => {
		Analytic.find(getFilter())
			.select("dom_load window_load ttfb fcp date resources")
			.sort({ date: -1 })
			.then((r) => {
				resolve(r);
			})
			.catch((err) => {
				reject({ err: err.message });
			});
	});
};

module.exports = { create, get };
