import React, { useEffect, useState } from "react";
import { analyticsService as service } from "../../services/analytics.service";

import { Card, Col, Row } from "react-bootstrap";
import LineChart from "../Charts/LineChart";
import ReferenceLineChart from "../Charts/ReferenceLineChart";
import FilterContainer from "../FilterContainer/FilterContainer";

export default function DashboardChart() {
	const [data, setData] = useState(null);
	const loadData = (date = null) => {
		service.getAll(date).then((r) => setData(r));
	};

	const getDataFor = (key) => {
		if (data == null) return null;
		return data
			.map((p) => [new Date(p.date), p[key]])
			.filter((p) => p[1] !== null);
	};

	const getDataForResources = () => {
		if (data == null) return null;

		let chartData = [];
		let resourceNames = [];
		data.forEach((item) => {
			item.resources.forEach((resource) => {
				if (resourceNames.indexOf(resource.name) === -1)
					resourceNames.push(resource.name);
			});
		});

		resourceNames.sort();

		data.forEach((item) => {
			let dateData = [new Date(item.date)];
			resourceNames.forEach((name) => {
				const value = item.resources.find((p) => p.name === name);
				dateData.push(
					value != null ? value.responseEnd - value.responseStart : null
				);
			});
			chartData.push(dateData);
		});

		resourceNames = resourceNames.map((link) =>
			link.substring(link.lastIndexOf("/") + 1)
		);
		const result = { dataLabels: resourceNames, datas: chartData };
		console.log(result);
		return result;
	};

	const resourceDatas = getDataForResources();

	const handleFilter = (data) => {
		loadData(data);
	};

	useEffect(() => {
		loadData(data);
	}, []);

	return (
		<>
			<FilterContainer onFilter={handleFilter} />
			<Row>
				<Col className="mb-4" lg={6}>
					<Card>
						<Card.Body>
							<LineChart data={getDataFor("ttfb")} name="TTFB" />
						</Card.Body>
					</Card>
				</Col>
				<Col className="mb-4" lg={6}>
					<Card>
						<Card.Body>
							<LineChart data={getDataFor("fcp")} name="FCP" />
						</Card.Body>
					</Card>
				</Col>
				<Col className="mb-4" lg={6}>
					<Card>
						<Card.Body>
							<LineChart data={getDataFor("dom_load")} name="DOM LOAD" />
						</Card.Body>
					</Card>
				</Col>
				<Col className="mb-4" lg={6}>
					<Card>
						<Card.Body>
							<LineChart
								data={getDataFor("window_load")}
								name="WINDOW LOAD"
							/>
						</Card.Body>
					</Card>
				</Col>
			</Row>
			<Card>
				<Card.Body>
					<ReferenceLineChart data={resourceDatas} />
				</Card.Body>
			</Card>
		</>
	);
}
