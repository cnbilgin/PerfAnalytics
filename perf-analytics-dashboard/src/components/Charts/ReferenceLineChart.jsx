import React from "react";
import { Chart } from "react-google-charts";

import classes from "./Charts.module.css";

export default function ReferenceLineChart({ data }) {
	let preview = <div className={classes.skeleton}></div>;
	if (data) {
		if (data.dataLabels?.length > 0)
			preview = (
				<Chart
					width={"100%"}
					height={"500"}
					chartType="Line"
					loader={<div className={classes.skeleton}></div>}
					data={[
						[{ type: "date", label: "Date" }, ...data.dataLabels],
						...data.datas,
					]}
					options={{
						width: "100%",
						height: 700,
						hAxis: {
							title: "Date",
						},
						vAxis: {
							title: "Duration",
						},
						series: {
							1: { curveType: "function" },
						},
					}}
					rootProps={{ "data-testid": "4" }}
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
			<h3>Resources</h3>
			{preview}
		</div>
	);
}
