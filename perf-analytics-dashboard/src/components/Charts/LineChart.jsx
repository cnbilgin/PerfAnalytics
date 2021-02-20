import React from "react";
import { Chart } from "react-google-charts";

import classes from "./Charts.module.css";

export default function LineChart({ data, name }) {
	let preview = <div className={classes.skeleton}></div>;
	if (data) {
		if (data.length > 0)
			preview = (
				<Chart
					width="100%"
					height="300px"
					chartType="LineChart"
					data={[["date", "duration"], ...data]}
					loader={<div className={classes.skeleton}></div>}
					options={{
						hAxis: {
							title: "Date",
						},
						vAxis: {
							title: "Duration",
						},
						legend: { position: "none" },
						chartArea: { width: "80%", height: "70%" },
					}}
					// rootProps={{ "data-testid": "1" }}
				/>
			);
		else
			preview = (
				<div className={classes.warning}>
					There is not enough data for graph
				</div>
			);
	}

	return (
		<div>
			<h3>{name}</h3>
			{preview}
		</div>
	);
}
