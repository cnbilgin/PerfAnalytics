const express = require("express");
const bodyParser = require("body-parser");
const request = require("supertest");

const analyticsRoute = require("./analytics");

const app = express();
app.use(bodyParser.json());
app.use("/analytics", analyticsRoute);

const mockAnalyticData = [
	{
		ttfb: 1,
		fcp: 2,
		dom_load: 3,
		window_load: 4,
		resources: [
			{
				name: "a.jpg",
				responseEnd: 300,
				responseStart: 200,
				type: "img",
			},
		],
	},
	{
		ttfb: 2,
		fcp: 3,
		dom_load: 4,
		window_load: 5,
		resources: [
			{
				name: "b.jpg",
				responseEnd: 200,
				responseStart: 100,
				type: "img",
			},
		],
	},
];

jest.mock("../services/analytics.service.js", () => ({
	create: (model) =>
		new Promise((resolve, reject) => {
			if (model.throwError) return reject({ err: true });
			resolve({ message: "analytic saved", data: model });
		}),
	get: (filter) =>
		new Promise((resolve, reject) => {
			if (filter.startDate === "throwError") return reject({ err: true });
			resolve(mockAnalyticData);
		}),
}));

describe("testing-server-routes", () => {
	it("GET /analytics - success", async () => {
		const { body } = await request(app).get("/analytics");

		expect(body).toEqual(mockAnalyticData);
	});

	it("GET /analytics - error", async () => {
		const { status } = await request(app)
			.get("/analytics")
			.query({ startDate: "throwError" });
		expect(status).toBe(500);
	});

	it("POST /analytics - success", async () => {
		const postData = mockAnalyticData[0];
		const { body } = await request(app).post("/analytics").send(postData);

		expect(body.message).toBe("analytic saved");
		expect(body.data.date).toBeDefined();
		expect(body.data).toEqual({ ...postData, date: body.data.date });

		expect(true).toEqual(true);
	});

	it("POST /analytics - error", async () => {
		const { status } = await request(app)
			.post("/analytics")
			.send({ throwError: true });
		expect(status).toBe(500);
	});
});
